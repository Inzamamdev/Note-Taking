export const fetchNotes = async (userId) => {
  try {
    if (!userId) {
      return;
    }
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/notes/getall/${userId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch notes");
    }

    const data = await response.json();

    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    return [];
  }
};
