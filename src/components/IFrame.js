import React, { useState } from "react";
import "../App.css"; // Ensure your external stylesheet is imported

const IFrame = ({ url, title = "Embedded Content", width = "80%", height = "80%" }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle popup visibility
  const togglePopup = (event) => {
    event.preventDefault(); // Prevent default link behavior
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Link to open popup */}
      <a href="/rma" onClick={togglePopup} className="popup-link">
        {title}
      </a>

      {/* Popup with overlay */}
      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-container" style={{ width, height }}>
            {/* Close button */}
            <button className="close-button" onClick={togglePopup}>
              &times;
            </button>

            {/* iFrame */}
            <iframe
              src={url}
              title={title}
              width="100%"
              height="100%"
              className="popup-iframe"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default IFrame;
