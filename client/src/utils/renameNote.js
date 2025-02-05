export const renameNote = async (noteId, newHeading) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/notes/rename/${noteId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ heading: newHeading }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete note");
    }
  } catch (error) {
    console.error("Error renaming note:", error);
  }
};
