import React from "react";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { uploadImage } from "../utils/uploadImage";
export default function ImageUpload({ noteId }) {
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
    setImages(selectedImage);

    if (selectedImage) {
      try {
        const responseData = await uploadImage(selectedImage, noteId);
        console.log("Image uploaded successfully:", responseData);
        // setImages(responseData);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  console.log(images);
  console.log(noteId);
  return (
    <div className="">
      <div className="w-full h-40 overflow-scroll mt-10 ">
        <div className="flex items-center">
          {images?.map((image, index) => (
            <div key={index} className=" border-1 border-gray-200 rounded-xl">
              <img
                src={image}
                alt=""
                className="h-15 w-15 object-cover rounded-xl"
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
