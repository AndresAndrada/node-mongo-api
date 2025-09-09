"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./src/routes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const dbConfig_1 = require("./src/config/dbConfig");
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_json_1 = __importDefault(require("./swagger/swagger.json"));
dotenv_1.default.config();
const { PORT } = process.env;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.use("/api", routes_1.default);
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use((err, _req, res, _next) => {
    const status = (err === null || err === void 0 ? void 0 : err.status) || 500;
    const message = (err === null || err === void 0 ? void 0 : err.message) || err;
    console.error(err);
    res.status(status).send(message);
});
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, dbConfig_1.dbConfig)();
        console.log(`Server running on port http://localhost:${PORT}`);
    }
    catch (error) {
        console.error("🚀 ~ error:", error);
    }
}));
//# sourceMappingURL=index.js.map