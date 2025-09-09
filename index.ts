import express, { NextFunction, Request, Response } from "express";
import router from "./src/routes";
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import { dbConfig } from "./src/config/dbConfig";
import dotenv from 'dotenv';
import specs from "./swagger/swagger.json";

dotenv.config();

const {PORT} = process.env;

const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api", router);
app.use(morgan('dev'));
app.use(cors());
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); 
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use((err: Record<string, number>, _req: Request, res: Response, _next: NextFunction) => {
  const status: number = err?.status || 500;
  const message = err?.message || err;
  console.error(err);
  res.status(status).send(message);
});

app.listen(PORT, async () => {
  try {
    await dbConfig();
    console.log(`Server running on port http://localhost:${PORT}`);
  } catch (error) {
    console.error("🚀 ~ error:", error)
        
  }
})