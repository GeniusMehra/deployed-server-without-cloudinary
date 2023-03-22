import { Router } from "express";
import { getMyProfile, login, logout, Register } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";


const router=Router();

router.route("/new").get(Register)

router.route("/login").post(login)

router.route("/me").get(isAuthenticated,getMyProfile)

router.route("/logout").get(logout)


export default router