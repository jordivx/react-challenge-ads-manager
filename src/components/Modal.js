import React from "react";
import "./Modal.css";

export const Modal = ({onClose, show, title, children}) => {
    if (!show) {
      return null;
    }
    return (
      <div className="modal" id="modal">
        <h2>{title}</h2>
        <div className="content">{children}</div>
        <div className="actions">
          <button className="cancel-button" onClick={() => onClose(false)}>
            Cancel
          </button>
          <button className="toggle-button" onClick={() => onClose(true)}>
            Confirm
          </button>
        </div>
      </div>
    );
}