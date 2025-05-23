import Note from "../models/Note.js";
import { generateHeading } from "../utils/generateHeading.js";
import cloudinary from "../config/cloudinaryConfig.js";
export const getAllNotes = async (req, res) => {
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

export const editNote = async (req, res) => {
  try {
    const { transcribedText } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { transcribedText },
      { new: true }
    );
    res.json({ message: "Edit Note Successfully", note: updatedNote });
  } catch (error) {
    res.status(500).json({ error: "Error updating note" });
  }
};

export const uploadNoteImage = async (req, res) => {
  try {
    const { noteId } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // Find the note
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "notes_images" },
          (error, cloudinaryResult) => {
            if (error) reject(error);
            else resolve(cloudinaryResult);
          }
        )
        .end(req.file.buffer);
    });

    note.images.push(result.secure_url);

    await note.save();

    res.status(200).json({
      message: "Image uploaded and saved successfully",
      image: result.secure_url,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getNoteImages = async (req, res) => {
  const { noteId } = req.params;

  try {
    const notes = await Note.findById(noteId);

    res.status(200).json(notes.images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { noteId, imageUrl } = req.body;

    if (!noteId || !imageUrl) {
      return res.status(400).json({ error: "Missing noteId or imageUrl" });
    }

    const publicId = imageUrl.split("/").pop().split(".")[0];

    await cloudinary.uploader.destroy(publicId);

    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { $pull: { images: imageUrl } }, // Remove image URL from MongoDB
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json({
      message: "Image deleted successfully",
      images: updatedNote.images,
    });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const setFavourite = async (req, res) => {
  try {
    const note = await Note.findById(req.params.noteId);
    if (!note) return res.status(404).json({ message: "Note not found" });

    note.isFavourite = !note.isFavourite; // Toggle favorite status
    await note.save();

    res.json({ message: "Added to favourite", favourite: note.isFavourite });
  } catch (error) {
    console.error("Error updating favorite:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
