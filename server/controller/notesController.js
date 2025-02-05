import Note from "../models/Note.js";
import { generateHeading } from "../utils/generateHeading.js";
export const getAllNotes = async (req, res) => {
  console.log(req.params);
  const { userId } = req.params;
  try {
    const notes = await Note.find({ userId });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createNote = async (req, res) => {
  const { transcribedText, userId } = req.body;
  console.log(req.body);
  const heading = await generateHeading(transcribedText);
  const newNote = new Note({
    heading,
    transcribedText,
    userId,
  });

  try {
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json({ message: "Note deleted successfully", note: deletedNote });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting note", error: error.message });
  }
};

export const renameNote = async (req, res) => {
  try {
    const { heading } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { heading },
      { new: true }
    );
    res.json({ message: "Rename Note Successfully", note: updatedNote });
  } catch (error) {
    res.status(500).json({ error: "Error updating note" });
  }
};
