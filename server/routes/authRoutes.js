import express from "express";
import {
  validateLogin,
  validateSignup,
} from "../middleware/validationMiddleware.js";
import { signupController } from "../controller/signUpController.js";
import { loginController } from "../controller/loginController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
const router = express.Router();

//auth routes
router.post("/signup", validateSignup, signupController);
router.post("/login", validateLogin, loginController);
router.get("/user", authenticateToken, (req, res) => {
  const user = req.user;

  res.json({ name: user.name, id: user._id });
});
export default router;
