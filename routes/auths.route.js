import {Router} from 'express';
import {signUP} from "../controllers/auth.controller.js";
import {signIN} from "../controllers/auth.controller.js";
import {signOUT} from "../controllers/auth.controller.js";

const authsRouter = Router();
//path:/api/v1/auth/sign-up (POST)
authsRouter.post('/sign-up', signUP);
authsRouter.post('/sign-in', signIN);
authsRouter.post('/sign-out', signOUT);

export default authsRouter;
