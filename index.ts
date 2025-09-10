import express, { NextFunction, Request, Response } from 'express';
import router from './src/routes';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { dbConfig } from './src/config/dbConfig';
import dotenv from 'dotenv';
import specs from './swagger/swagger.json';
import fileUpload from 'express-fileupload';

dotenv.config();

const { PORT } = process.env;

const app = express();

// Middleware
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/app/tmp',
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Endpoint de prueba para archivos
app.post('/test-upload', (req: Request, res: Response) => {
  console.log('🚀 ~ Test Upload ~ req.files:', req.files);
  console.log('🚀 ~ Test Upload ~ req.body:', req.body);
  console.log('🚀 ~ Test Upload ~ req.headers:', req.headers);
  res.json({ files: req.files, body: req.body });
});

// Rutas
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api', router);

// Manejo de errores
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
    console.error('🚀 ~ error:', error);
  }
});