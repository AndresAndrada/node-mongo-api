import { Router } from 'express';
import { getUserByIdController, getAllUserController, postUserControllers, deleteUserController, updateUserControllers } from '../../controllers/users/userController';
import { authMiddleware } from '../../middlewares/authMiddleware';

const routerUser: Router = Router();

routerUser.get('/', authMiddleware(), getAllUserController);
routerUser.get('/:id', authMiddleware("admin"), getUserByIdController);
routerUser.post('/', authMiddleware(), postUserControllers);
routerUser.delete('/:id', deleteUserController);
routerUser.put('/:id', updateUserControllers);

export default routerUser;