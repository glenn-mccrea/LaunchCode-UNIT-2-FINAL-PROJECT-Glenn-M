import React from "react";
import "./logcard.css";
import ReuseButton from "../ReuseButton/ReuseButton";

const LogCard = ({ id, subject, duration, materials, notes, deleteCard }) => {
  return (
    <div className="main-card-div">
      <div className="card-grid-container">
        <div id="subject-container-div">
          <p>Subject:</p>
          <p id="subject-list-item">{subject}</p>
        </div>
        <div id="activity-duration-container-div">
          <p>Activity duration:</p>
          <p id="activity-duration-list-item">{duration}</p>
        </div>
        <div id="materials-container-div">
          <p>Materials used:</p>
          <p id="materials-list-item">{materials}</p>
        </div>
        <div id="notes-container-div">
          <p>Notes:</p>
          <p id="notes-list-item">{notes}</p>
        </div>
      </div>
      <ReuseButton
        idName={"delete-button"}
        text={"Delete Activity"}
        onClick={() => deleteCard(id)}
      />
    </div>
  );
};

export default LogCard;
