import React from "react";
import "../styles/ImageModal.css";

const ImageModal = ({ image, onClose }) => {
  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={image} alt="Full View" className="modal-image" />
        <button className="close-modal" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
