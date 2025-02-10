import React from "react";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { uploadImage } from "../utils/uploadImage";
import { MdDelete } from "react-icons/md";
export default function ImageUpload({ noteId, note, setNotes }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/notes/getall/images/${noteId}`
        );
        const data = await response.json();

        setImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [noteId]);

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleImageChange = async (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      try {
        const responseData = await uploadImage(selectedImage, noteId);
        setImages((prevImages) => [...prevImages, responseData.image]);
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === noteId
              ? { ...note, images: [...note.images, responseData.image] }
              : note
          )
        );
        console.log("Image uploaded successfully:", responseData.message);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleDelete = async (imageUrl) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/notes/image`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ noteId, imageUrl }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete image");
      }

      setImages((prevImages) => prevImages.filter((img) => img !== imageUrl));
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === noteId
            ? { ...note, images: note.images.filter((img) => img !== imageUrl) }
            : note
        )
      );
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="">
      <div className="w-full h-40 overflow-scroll mt-10 ">
        <div className="flex items-center flex-wrap gap-4">
          {images?.map((image, index) => (
            <div key={index} className="  rounded-xl relative ">
              <MdDelete
                className="absolute z-20 cursor-pointer ml-1 mt-1"
                fontSize={10}
                onClick={() => handleDelete(image)}
              />
              <img
                loading="lazy"
                src={image}
                alt=""
                className="h-17 w-17 object-cover rounded-xl border-1 border-gray-200"
              />
            </div>
          ))}
          <button
            onClick={handleButtonClick}
            className="text-gray-400 border-1 border-gray-200 flex flex-col items-center p-5 text-xs rounded-xl cursor-pointer"
          >
            <FaPlus />
            <p>Image</p>
          </button>
          <input
            type="file"
            accept="image/*"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
      </div>
    </div>
  );
}
