const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

export async function askDocumentQuestion(filename, question) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filename, question }),
    });

    const payload = await response.json();

    if (!response.ok || !payload.success) {
      throw new Error(payload.message || "Chat request failed.");
    }

    return payload;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Server unavailable. Please start the backend and try again.");
    }

    throw error;
  }
}
