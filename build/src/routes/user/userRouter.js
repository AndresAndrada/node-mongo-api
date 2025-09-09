"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../../controllers/users/userController");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const routerUser = (0, express_1.Router)();
routerUser.get('/', (0, authMiddleware_1.authMiddleware)(), userController_1.getAllUserController);
routerUser.get('/:id', (0, authMiddleware_1.authMiddleware)("admin"), userController_1.getUserByIdController);
routerUser.post('/', (0, authMiddleware_1.authMiddleware)(), userController_1.postUserControllers);
routerUser.delete('/:id', userController_1.deleteUserController);
routerUser.put('/:id', userController_1.updateUserControllers);
exports.default = routerUser;
//# sourceMappingURL=userRouter.js.map