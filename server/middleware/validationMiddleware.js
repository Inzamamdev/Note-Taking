import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const validateSignup = (req, res, next) => {
  try {
    signupSchema.parse(req.body); // This will throw an error if validation fails
    next();
  } catch (error) {
    res.status(400).json({ errors: error.errors });
  }
};
