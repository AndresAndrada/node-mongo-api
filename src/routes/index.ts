import { Router } from "express";
import routerUser from "./user/userRouter";
const router: Router = Router();

router.use("/users", routerUser)


export default router;