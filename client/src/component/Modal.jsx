import React, { useState } from "react";
import { BsArrowsAngleExpand } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { HiMiniPencil } from "react-icons/hi2";
import { RiFileCopy2Line } from "react-icons/ri";
import { editNote } from "../utils/editNote";
import ImageUpload from "./ImageUpload";
import TabMenu from "./TabMenu";
export default function Modal({
  note,
  formattedDate,
  setShowModal,
  setNotes,
  notes,
}) {
  const [isFullScreen, setFullScreen] = useState(false);
  const [isReadMore, setReadMore] = useState(false);
  const [editedText, setEditedText] = useState(note.transcribedText);
  const [copySuccess, setCopySuccess] = useState(false);

  console.log(note);
  const handleSave = async (noteId, editedText) => {
    try {
      await editNote(noteId, editedText);
      setNotes(
        notes.map((note) =>
          note._id === noteId ? { ...note, transcribedText: editedText } : note
        )
      );
    } catch (error) {
      console.error("Error updating note:", error);
    }

    setReadMore(false);
  };

  const handleCopy = () => {
    console.log("clicked");
    if (note.transcribedText) {
      navigator.clipboard.writeText(note.transcribedText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 trasition-all duration-300 z-50">
      {isReadMore ? (
        <div className={`${"h-[35rem] w-full mx-64"}  `}>
          <div className="bg-white p-6 rounded-lg shadow-lg h-full ">
            <div className="flex justify-between mb-4">
              <RxCross2
                className="cursor-pointer"
                onClick={() => setReadMore(false)}
              />
              <button
                onClick={() => handleSave(note._id, editedText)}
                className="cursor-pointer"
              >
                Save
              </button>
            </div>
            <h2 className="flex items-center font-semibold">
              Transcript
              <RiFileCopy2Line className="ml-3" onClick={handleCopy} />
            </h2>
            <textarea
              name=""
              id=""
              className="w-full"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            ></textarea>
          </div>
        </div>
      ) : (
        <div
          className={`${
            isFullScreen ? "h-full w-full" : "h-[35rem] w-full mx-64"
          }  `}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg h-full ">
            <div className="flex items-center justify-between mb-5">
              <span className="bg-gray-100 p-2 rounded-4xl">
                <BsArrowsAngleExpand
                  onClick={() => setFullScreen(!isFullScreen)}
                  className="cursor-pointer "
                  fontSize={15}
                />
              </span>

              <div className="flex items-center">
                <span className="bg-gray-100 p-2 rounded-4xl">
                  <FaStar className="cursor-pointer text-gray-300" />
                </span>

                <button className="bg-gray-200 mx-3 py-1 px-3 rounded-4xl text-sm font-semibold">
                  Share
                </button>
                <span className="bg-gray-100 p-2 rounded-4xl">
                  <RxCross2
                    className=" cursor-pointer"
                    onClick={() => setShowModal(false)}
                  />
                </span>
              </div>
            </div>

            <h2 className="text-lg font-bold flex items-center">
              {note.heading}
              <span>
                <HiMiniPencil
                  className="ml-2 text-gray-300 cursor-pointer"
                  fontSize={15}
                />
              </span>
            </h2>
            <p className="mb-5 text-sm text-gray-400">{formattedDate}</p>
            <TabMenu />
            <div className="border-1 border-gray-200 rounded-2xl">
              <div className="flex items-center justify-between ml-3 pt-2">
                <h2 className="font-semibold">Transcript</h2>
                <span
                  className="flex items-center text-sm text-gray-400 border-1 border-gray-200 py-1 px-2 rounded-4xl cursor-pointer mr-1"
                  onClick={handleCopy}
                >
                  <RiFileCopy2Line className="mr-1" />
                  <p className="text-xs">Copy</p>
                </span>
              </div>
              <p className="mt-1 ml-3 mb-2">{note.transcribedText}</p>
              <button
                className="ml-3 underline text-[#d6d6d6] text-sm font-bold mb-3 cursor-pointer"
                onClick={() => setReadMore(!isReadMore)}
              >
                Read More
              </button>
            </div>

            <ImageUpload noteId={note._id} />
          </div>
        </div>
      )}
      {copySuccess && (
        <p className="absolute top-1 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-600 text-sm px-3 py-1 rounded-md">
          Copied!
        </p>
      )}
    </div>
  );
}
