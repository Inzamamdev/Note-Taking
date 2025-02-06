import React from "react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { uploadImage } from "../utils/uploadImage";
export default function ImageUpload({ noteId }) {
  const [image, setImage] = useState(null);

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleImageChange = async (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    if (selectedImage) {
      try {
        const responseData = await uploadImage(selectedImage, noteId);
        console.log("Image uploaded successfully:", responseData);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div>
      <div className="w-full h-40 overflow-scroll mt-10">
        <button
          onClick={handleButtonClick}
          className="text-gray-400 border-1 border-gray-200 flex flex-col items-center p-5 text-xs rounded-xl cursor-pointer"
        >
          <FaPlus />
          <p>Image</p>
        </button>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
}
