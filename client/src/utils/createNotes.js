export const createNotes = async (transcribedText, userId) => {
  try {
    console.log("createNotes");
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/notes/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transcribedText,
          userId,
        }),
      }
    );

    const data = await response.json();
  } catch (error) {
    console.error("Error saving note:", error);
  }
};
