import React from "react";

import { GoDotFill } from "react-icons/go";
export default function RecordControls({ isRecording }) {
  return (
    <button
      className={`flex items-center px-2 bg-red-400 text-white py-2 rounded-4xl cursor-pointer`}
    >
      <GoDotFill className={`mr-1 ${isRecording ? "animate-pulse" : ""}`} />
      <p className="px-1">
        {isRecording ? "stop recording" : "start recording"}
      </p>
    </button>
  );
}
