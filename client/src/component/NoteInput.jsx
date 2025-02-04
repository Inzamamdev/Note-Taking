import React from "react";
import { HiMiniPencil } from "react-icons/hi2";
import { BsImageFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import NoteCard from "./NoteCard";
import RecordControls from "./RecordControls";
import { startRecording, stopRecording } from "../utils/noteUtils";
import { createNotes } from "../utils/createNotes";
export default function NoteInput({ userId }) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState("");
  const [speechError, setSpeechError] = useState("");

  const handleRecording = () => {
    if (!isRecording) {
      startRecording(setIsRecording, setTranscribedText, setSpeechError);
    } else {
      stopRecording(setIsRecording);
    }
    console.log("recording");
  };
  useEffect(() => {
    if (transcribedText && !isRecording) {
      console.log("Saving note:", transcribedText);
      createNotes(transcribedText, userId);
    }
  }, [transcribedText, isRecording, userId]);
  console.log(userId);

  return (
    <>
      <div className="mb-96">
        <NoteCard />
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
