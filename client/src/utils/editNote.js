export const editNote = async (noteId, editedText) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/notes/edit/${noteId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transcribedText: editedText }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete note");
    }
  } catch (error) {
    console.error("Error renaming note:", error);
  }
};
