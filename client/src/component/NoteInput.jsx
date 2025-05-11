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
export default function NoteInput({ userId, search, isSort, isFavourite }) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState("");
  const [speechError, setSpeechError] = useState("");
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [input, setInput] = useState("");
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

  useEffect(() => {
    let updatedNotes = [...notes];

    if (search) {
      updatedNotes = updatedNotes.filter(
        (note) =>
          note.heading.toLowerCase().includes(search.toLowerCase()) ||
          note.transcribedText.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (isSort) {
      updatedNotes.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }

    if (isFavourite) {
      updatedNotes = updatedNotes.filter((note) => note.isFavourite);
    }

    setFilteredNotes(updatedNotes);
  }, [search, isSort, isFavourite]);

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

  const handleSubmit = () => {
    createNotes(input, userId).then(() => fetchUserNotes());
    setInput("");
  };

  return (
    <>
      <div className="h-[550px] flex flex-col  justify-between overflow-y-auto">
        {" "}
        <div className=" flex flex-wrap gap-2 mt-5">
          {(filteredNotes.length > 0 ? filteredNotes : notes)?.map((note) => (
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
      </div>
      <div className=" w-full max-w-3xl mx-auto ">
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
            placeholder="Enter Note"
            className="flex-1 p-2 mx-3 border-none outline-none"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
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
