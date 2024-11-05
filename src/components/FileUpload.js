import React, { useState } from "react";
import "../App.css"; // Ensure your external stylesheet is imported

const FileUpload = ({ onFileChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    onFileChange(file); // Call the parent’s function to update the file in `RmaForm`
  };

  return (
    <div className="file-upload-form">
      <label htmlFor="fileInput" className="form-label">
        Attach Completed PDF Here:
      </label>
      <input
        type="file"
        id="fileInput"
        onChange={handleFileChange}
        className="file-input"
      />

      {selectedFile && (
        <p className="selected-file">
          Selected file: {selectedFile.name}
        </p>
      )}
    </div>
  );
};

export default FileUpload;
