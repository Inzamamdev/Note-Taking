export const uploadImage = async (imageFile, noteId) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/notes/upload-image/${noteId}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
