const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

function normalizeSummary(payload) {
  return {
    ...payload,
    summary: payload.summary || "The document does not contain enough information to generate a reliable summary.",
    key_points: Array.isArray(payload.key_points) ? payload.key_points : [],
    keywords: Array.isArray(payload.keywords) ? payload.keywords : [],
  };
}

export async function generateSummary(filename) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/summary`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filename }),
    });

    const payload = await response.json();

    if (!response.ok || !payload.success) {
      throw new Error(payload.message || "Summary generation failed.");
    }

    return normalizeSummary(payload);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Server unavailable. Please start the backend and try again.");
    }

    throw error;
  }
}
