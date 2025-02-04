import express from "express";
const router = express.Router();
import { getAllNotes, createNote } from "../controller/notesController.js";
router.get("/getall", getAllNotes);
router.post("/create", createNote);

export default router;
