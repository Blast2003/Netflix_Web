import express from 'express';
import { authCheck, login, Logout, Signup } from '../controllers/auth_controller.js';
import { protectRoute } from '../MiddleWare/protectRouter.js'; 

const auth_router = express.Router();

auth_router.post("/signup", Signup)
auth_router.post("/login", login)
auth_router.post("/logout", Logout)

auth_router.get("/authCheck", protectRoute, authCheck)


export default auth_router;