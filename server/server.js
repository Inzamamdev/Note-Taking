import express from "express";
import dotenv from "dotenv";
import router from "./routes/authRoutes.js";
import notesRouter from "./routes/noteRoutes.js";
import connectDb from "./database.js";
import cors from "cors";

dotenv.config();

const app = express();

const corsOptions = {
  origin: /^https:\/\/.*\.csb\.app$/, // Allow requests only from localhost:5173
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow cookies if needed
};

app.use(express.json());
app.use(cors(corsOptions));

connectDb()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB:", err));

app.use("/api/auth", router);
app.use("/api/notes", notesRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the backend API!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
