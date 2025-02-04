import Note from "../models/Note.js";
import { generateHeading } from "../utils/generateHeading.js";
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
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
