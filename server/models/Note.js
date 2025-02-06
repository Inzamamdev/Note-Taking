import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  heading: { type: String, required: true },
  transcribedText: {
    type: String,
    required: [true, "Transcribed text cannot be empty"],
    trim: true, // Optional: Removes leading and trailing spaces
  },
  images: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

const Note = mongoose.model("Note", noteSchema);

export default Note;
