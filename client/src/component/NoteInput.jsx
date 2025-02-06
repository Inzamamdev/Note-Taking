import React from "react";
import { HiMiniPencil } from "react-icons/hi2";
import { BsImageFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import NoteCard from "./NoteCard";
import RecordControls from "./RecordControls";
import { startRecording, stopRecording } from "../utils/noteUtils";
import { createNotes } from "../utils/createNotes";
import { fetchNotes } from "../utils/getAllNotes";
import { deleteNote } from "../utils/deleteNote";
import { renameNote } from "../utils/renameNote";
export default function NoteInput({ userId }) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState("");
  const [speechError, setSpeechError] = useState("");
  const [notes, setNotes] = useState([]);
  const handleRecording = () => {
    if (!isRecording) {
      startRecording(setIsRecording, setTranscribedText, setSpeechError);
    } else {
      stopRecording(setIsRecording);
    }
    console.log("recording");
  };
  useEffect(() => {
    fetchUserNotes();
  }, [transcribedText, userId]);

  const fetchUserNotes = async () => {
    const fetchedNotes = await fetchNotes(userId);
    setNotes(fetchedNotes);
  };

  useEffect(() => {
    if (transcribedText && !isRecording) {
      createNotes(transcribedText, userId).then(() => fetchUserNotes());
    }
  }, [transcribedText, isRecording]);

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId);
      setNotes(notes.filter((note) => note._id !== noteId)); // Remove from UI
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleRenameNote = async (noteId, newHeading) => {
    try {
      await renameNote(noteId, newHeading);
      setNotes(
        notes.map((note) =>
          note._id === noteId ? { ...note, heading: newHeading } : note
        )
      );
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <>
      <div className="mb-40 flex gap-2 mt-5">
        {notes?.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            onDelete={handleDeleteNote}
            onRename={handleRenameNote}
            setNotes={setNotes}
            notes={notes}
          />
        ))}
      </div>
      <div className="w-full max-w-3xl mx-auto">
        <div className="flex items-center p-2 rounded-4xl shadow-md border">
          <button className="p-2">
            <span role="img" aria-label="write">
              <HiMiniPencil />
            </span>
          </button>
          <button className="p-2">
            <span role="img" aria-label="image">
              <BsImageFill />
            </span>
          </button>
          <input
            type="text"
            placeholder=""
            className="flex-1 p-2 mx-3 border-none outline-none"
          />
          <div onClick={handleRecording}>
            <RecordControls isRecording={isRecording} />
          </div>
        </div>
        {speechError && (
          <p className="text-red-500 text-sm mt-2">{speechError}</p>
        )}
      </div>
    </>
  );
}
