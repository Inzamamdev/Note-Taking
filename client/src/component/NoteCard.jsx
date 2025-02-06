import React from "react";
import { useState } from "react";
import { BsImageFill } from "react-icons/bs";
import { RiFileCopy2Line } from "react-icons/ri";
import { SlOptions } from "react-icons/sl";
import { FaPlus } from "react-icons/fa6";
import { CgTrash } from "react-icons/cg";
import Modal from "./Modal";
export default function NoteCard({
  note,
  onDelete,
  onRename,
  setNotes,
  notes,
}) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newHeading, setNewHeading] = useState(note.heading);
  const [showModal, setShowModal] = useState(false);

  const formattedDate = new Date(note.createdAt).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const handleCopy = () => {
    if (note.transcribedText) {
      navigator.clipboard.writeText(note.transcribedText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleRename = () => {
    if (newHeading.trim() && newHeading !== note.heading) {
      onRename(note._id, newHeading);
    }
    setIsRenaming(false);
  };
  console.log(note.images);
  return (
    <>
      <div className="cursor-pointer ">
        <div
          className=" h-96 w-64  px-5 border-1 border-gray-200 rounded-3xl"
          onClick={() => setShowModal(true)}
        >
          <div className="flex flex-col justify-between gap-36">
            <div>
              <p className="pt-5 text-xs text-gray-400">{formattedDate}</p>
              {isRenaming ? (
                <input
                  type="text"
                  className="w-full h-7 font-bold border p-1 rounded-md mb-5 line-clamp-2"
                  value={newHeading}
                  onChange={(e) => setNewHeading(e.target.value)}
                  onBlur={handleRename}
                  onKeyDown={(e) => e.key === "Enter" && handleRename()}
                  autoFocus
                />
              ) : (
                <h2 className="font-bold h-12 ">{note.heading}</h2>
              )}
              <p className="text-black text-xs font-light h-24">
                {note.transcribedText}
              </p>
              {note.images.length > 0 && (
                <div className=" flex items-center bg-gray-200 text-xs max-w-13 justify-between">
                  <BsImageFill />
                  <p>{note.images.length}Image</p>
                </div>
              )}
            </div>
            <div className="flex justify-end text-gray-300">
              {copySuccess && (
                <p className="absolute top-1 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-600 text-sm px-3 py-1 rounded-md">
                  Copied!
                </p>
              )}
              <RiFileCopy2Line
                className=" cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy();
                }}
              />
              <FaPlus
                className="mx-2 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsRenaming(true);
                }}
              />
              <div className="relative">
                <div>
                  <SlOptions
                    className="cursor-pointer "
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowOptions(!showOptions);
                    }}
                  />
                  {showOptions && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-md p-2">
                      <button
                        className="flex items-center w-full px-2 py-1 text-red-600 hover:bg-gray-100 rounded-md cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(note._id);
                        }}
                      >
                        <CgTrash className="mr-2" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          note={note}
          formattedDate={formattedDate}
          setShowModal={setShowModal}
          setNotes={setNotes}
          notes={notes}
        />
      )}
    </>
  );
}
