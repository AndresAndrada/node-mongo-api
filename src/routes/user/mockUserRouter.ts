import { Router } from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { deleteMockUserController, getAllMockUserController, getMockUserByIdController, postMockUserControllers, updatMockUserControllers } from '../../controllers/users/mockUserController';

const routerMockUser: Router = Router();

routerMockUser.get('/', getAllMockUserController);
routerMockUser.get('/:id', authMiddleware("admin"), getMockUserByIdController);
routerMockUser.post('/', authMiddleware("admin"), postMockUserControllers);
routerMockUser.delete('/:id', authMiddleware("admin"), deleteMockUserController);
routerMockUser.put('/:id', authMiddleware("admin"), updatMockUserControllers);

export default routerMockUser;