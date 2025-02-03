import { signupSchema } from "../validation/signUpSchema.js";
import { loginSchema } from "../validation/loginSchema.js";

export const validateSignup = (req, res, next) => {
  try {
    signupSchema.parse(req.body); // This will throw an error if validation fails
    next();
  } catch (error) {
    res.status(400).json({ errors: error.errors });
  }
};

export const validateLogin = (req, res, next) => {
  const parsedBody = loginSchema.safeParse(req.body);
  if (!parsedBody.success) {
    return res.status(400).json({ errors: parsedBody.error.errors });
  }

  next();
};
