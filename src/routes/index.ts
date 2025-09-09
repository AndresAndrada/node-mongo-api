import { Router } from "express";
import routerUser from "./user/userRouter";
import routerMockUser from "./user/mockUserRouter";

const router: Router = Router();

router.use("/users", routerUser);
router.use("/users-mockUser", routerMockUser);


export default router;