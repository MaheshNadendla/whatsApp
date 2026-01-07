import express from "express";
import { checkAuth, login, logout, sendVerificationOtp, signup, updateProfile, verifyEmail } from "../controllers/auth.controller.js";

import {googleAuth} from '../controllers/auth.controller.js'

import {protectRoute} from "../middlewares/auth.middleware.js"

const router = express.Router();

router.post("/google", googleAuth);

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update-profile",protectRoute,updateProfile)

router.get("/check",protectRoute,checkAuth)

router.post("/send-verify-otp",protectRoute, sendVerificationOtp);

router.post("/verify-email",protectRoute, verifyEmail);

export default router;
