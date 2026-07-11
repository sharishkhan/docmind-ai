const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

export function uploadPdf(file, onProgress) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);

    const request = new XMLHttpRequest();
    request.open("POST", `${API_BASE_URL}/api/upload`);

    request.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress?.(Math.round((event.loaded / event.total) * 100));
      }
    };

    request.onload = () => {
      let payload = null;

      try {
        payload = JSON.parse(request.responseText);
      } catch {
        reject(new Error("Upload failed. Please try again."));
        return;
      }

      if (request.status >= 200 && request.status < 300 && payload.success) {
        resolve(payload);
        return;
      }

      reject(new Error(payload.message || "Upload failed. Please try again."));
    };

    request.onerror = () => {
      reject(new Error("Server unavailable. Please start the backend and try again."));
    };

    request.send(formData);
  });
}
