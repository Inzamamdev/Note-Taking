export const deleteNote = async (noteId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/notes/delete/${noteId}`,
      { method: "DELETE" }
    );
    if (!response.ok) {
      throw new Error("Failed to delete note");
    }
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};
