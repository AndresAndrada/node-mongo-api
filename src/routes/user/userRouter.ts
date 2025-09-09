import { Router } from 'express';
import { getUserByIdController, getAllUserController, postUserControllers, deleteUserController, updateUserControllers } from '../../controllers/users/userController';
import { authMiddleware } from '../../middlewares/authMiddleware';

const routerUser: Router = Router();

routerUser.get('/', authMiddleware("user"), getAllUserController);
routerUser.get('/:id', authMiddleware("admin"), getUserByIdController);
routerUser.post('/', authMiddleware("admin"), postUserControllers);
routerUser.delete('/:id', authMiddleware("admin"), deleteUserController);
routerUser.put('/:id', authMiddleware("admin"), updateUserControllers);

export default routerUser;