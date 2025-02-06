import express from "express";
import multer from "multer";
const router = express.Router();
import {
  getAllNotes,
  createNote,
  deleteNote,
  renameNote,
  editNote,
  uploadNoteImage,
} from "../controller/notesController.js";

const storage = multer.memoryStorage(); // Store file in memory as a Buffer
const upload = multer({ storage });
router.get("/getall/:userId", getAllNotes);
router.post("/create", createNote);
router.delete("/delete/:id", deleteNote);
router.put("/rename/:id", renameNote);
router.put("/edit/:id", editNote);
router.post("/upload-image/:noteId", upload.single("image"), uploadNoteImage);
export default router;
