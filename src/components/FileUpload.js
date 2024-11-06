// FileUpload.js
import React, { useState } from "react";

const FileUpload = ({ onFileChange, selectedFile }) => {
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError(""); // Reset error message
    if (e.target.files && e.target.files[0]) {
      const uploadedFile = e.target.files[0];

      // Define allowed MIME types
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/png",
        "image/jpeg",
      ];

      // Validate file type safely
      const fileType = uploadedFile.type ? uploadedFile.type.toLowerCase() : "";
      if (!allowedTypes.includes(fileType)) {
        setError("Unsupported file type. Please upload a PDF, Word document, or an image.");
        return;
      }

      // Validate file size
      const ALLOWED_FILE_SIZE = 5 * 1024 * 1024; // 5MB
      if (uploadedFile.size > ALLOWED_FILE_SIZE) {
        setError("File size exceeds 5MB limit. Please upload a smaller file.");
        return;
      }

      // Proceed with file change
      onFileChange(uploadedFile);
    }
  };

  return (
    <div className="file-upload">
      <label htmlFor="uploadedFile">Attach Completed Document Here:</label>
      <input
        type="file"
        id="uploadedFile"
        name="uploadedFile" // This name matches the backend expectation
        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
        onChange={handleChange}
        aria-describedby="fileHelp"
      />
      {selectedFile && <p>Selected File: {selectedFile.name}</p>}
      {error && <p className="error" role="alert">{error}</p>}
    </div>
  );
};

export default FileUpload;
