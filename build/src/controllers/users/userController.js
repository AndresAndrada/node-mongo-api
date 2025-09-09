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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.updateUserControllers = exports.postUserControllers = exports.getUserByIdController = exports.getAllUserController = void 0;
const userServices_1 = require("../../services/userServices");
const getAllUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search } = req.query;
        const users = yield (0, userServices_1.getAllUsers)(typeof search === 'string' ? search : undefined);
        res.json(users);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUserController = getAllUserController;
const getUserByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: 'ID es requerido' });
            return;
        }
        const user = yield (0, userServices_1.getUserById)(id);
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        res.json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserByIdController = getUserByIdController;
const postUserControllers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const newUser = yield (0, userServices_1.createUser)(userData);
        res.status(201).json(newUser);
    }
    catch (error) {
        next(error);
    }
});
exports.postUserControllers = postUserControllers;
const updateUserControllers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: 'ID es requerido' });
            return;
        }
        const userData = req.body;
        const newUser = yield (0, userServices_1.updateUser)(id, userData);
        res.status(200).json(newUser);
    }
    catch (error) {
        next(error);
    }
});
exports.updateUserControllers = updateUserControllers;
const deleteUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: 'ID es requerido' });
            return;
        }
        const deletedUser = yield (0, userServices_1.deleteUser)(id);
        res.status(200).json(deletedUser);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUserController = deleteUserController;
//# sourceMappingURL=userController.js.map