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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Users_1 = require("../modules/Users");
const getAllUsers = (search) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = {};
        if (search) {
            const searchRegex = new RegExp(search, 'i');
            query.$or = [
                { name: { $regex: searchRegex } },
                { userName: { $regex: searchRegex } },
                { email: { $regex: searchRegex } },
            ];
        }
        const users = yield Users_1.User.find(query).limit(100).exec();
        return users;
    }
    catch (error) {
        throw new Error(`Error al mostrar usuarios: ${error instanceof Error ? error.message : 'Desconocido'}`);
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            throw new Error('ID inválido');
        }
        const user = yield Users_1.User.findById(id);
        return user;
    }
    catch (error) {
        throw new Error(`Error al obtener usuario: ${error instanceof Error ? error.message : 'Desconocido'}`);
    }
});
exports.getUserById = getUserById;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (user.email && user.email === '') {
            throw new Error('El email no puede estar vacío');
        }
        if (user.email) {
            const existingUser = yield Users_1.User.findOne({ email: user.email }).exec();
            if (existingUser) {
                throw new Error('El email ya está registrado');
            }
        }
        yield Users_1.User.create(Object.assign({}, user));
        return { message: 'Usuario creado correctamente' };
    }
    catch (error) {
        throw new Error(`Error al crear usuario: ${error instanceof Error ? error.message : 'Desconocido'}`);
    }
});
exports.createUser = createUser;
const updateUser = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(id))
            throw new Error('ID inválido');
        if (userData.email && userData.email === '')
            throw new Error('El email no puede estar vacío');
        if (userData.email) {
            const existingUser = yield Users_1.User.findOne({ email: userData.email }).exec();
            if (existingUser)
                throw new Error('El email ya está registrado');
        }
        const result = yield Users_1.User.updateOne({ _id: id }, { $set: userData }).exec();
        if (result.matchedCount === 0)
            throw new Error('Usuario no encontrado');
        return { message: 'Usuario modificado correctamente' };
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            throw new Error(`Error de validación: ${error === null || error === void 0 ? void 0 : error.message}`);
        }
        if (error instanceof Error && 'code' in error && error.code === 11000) {
            throw new Error('El email ya está registrado');
        }
        throw new Error(`Error al actualizar usuario: ${error instanceof Error ? error.message : 'Desconocido'}`);
    }
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            throw new Error('ID inválido');
        }
        const user = yield Users_1.User.findByIdAndDelete(id).exec();
        return user;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al eliminar usuario: ${error.message}`);
        }
        throw new Error('Error al eliminar usuario: Desconocido');
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=userServices.js.map