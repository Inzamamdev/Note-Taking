import express from "express";
import dotenv from "dotenv";
import router from "./routes/authRoutes.js";
import connectDb from "./database.js";
dotenv.config();

const app = express();

app.use(express.json());

connectDb()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB:", err));

app.use("/api/auth", router);

app.get("/", (req, res) => {
  res.send("Welcome to the backend API!");
});

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something went wrong!");
// });

const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
