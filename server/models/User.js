import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); // This will automatically add `createdAt` and `updatedAt` fields

// Create the User model
const User = mongoose.model("User", userSchema);

export default User;
