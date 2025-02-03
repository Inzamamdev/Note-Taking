import express from "express";
import { validateSignup } from "../middleware/validationMiddleware.js";
import { signupController } from "../controller/authController.js";

const router = express.Router();

// Signup route
router.post("/signup", validateSignup, signupController);

export default router;
