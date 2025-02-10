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
  getNoteImages,
  deleteImage,
  setFavourite,
} from "../controller/notesController.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });
router.get("/getall/:userId", getAllNotes);
router.get("/getall/images/:noteId", getNoteImages);
router.post("/create", createNote);
router.delete("/delete/:id", deleteNote);
router.delete("/image", deleteImage);
router.put("/rename/:id", renameNote);
router.put("/edit/:id", editNote);
router.put("/favourite/:noteId", setFavourite);

router.post("/upload-image/:noteId", upload.single("image"), uploadNoteImage);

export default router;
