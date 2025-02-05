import express from "express";
const router = express.Router();
import {
  getAllNotes,
  createNote,
  deleteNote,
  renameNote,
} from "../controller/notesController.js";
router.get("/getall/:userId", getAllNotes);
router.post("/create", createNote);
router.delete("/delete/:id", deleteNote);
router.put("/rename/:id", renameNote);
export default router;
