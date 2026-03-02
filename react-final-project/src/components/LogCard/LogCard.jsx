import React, { useState } from "react";
import "./logcard.css";
import ReuseButton from "../ReuseButton/ReuseButton";

const LogCard = ({
  id,
  subject,
  duration,
  materials,
  notes,
  deleteCard,
  updateCard,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  // fill edit fields with crrent value
  const [editDuration, setEditDuration] = useState(duration);
  const [editMaterials, setEditMaterials] = useState(materials);
  const [editNotes, setEditNotes] = useState(notes);
  const [editSubjectId, setEditSubjectId] = useState(subject.id);

  const handleSave = () => {
    // make the updated object to send to spring
    const updatedData = {
      duration: editDuration,
      materials: editMaterials,
      notes: editNotes,
      subject: { id: parseInt(editSubjectId) },
    };

    updateCard(id, updatedData); // calls PUT in App.jsx
    setIsEditing(false); // flip back to normal view
  };

  // EDIT MODE — shown when isEditing is true
  if (isEditing) {
    return (
      <div className="main-card-div">
        <div className="card-grid-container">
          <div id="subject-container-div">
            <p>Subject:</p>
            <select
              value={editSubjectId}
              onChange={(e) => setEditSubjectId(e.target.value)}
            >
              <option value="3">English/Language Arts</option>
              <option value="4">Mathematics</option>
              <option value="5">Science</option>
              <option value="6">Social Studies/History</option>
              <option value="7">Foreign Language</option>
              <option value="8">Art</option>
              <option value="9">Music</option>
              <option value="10">Computer Science</option>
            </select>
          </div>

          <div id="activity-duration-container-div">
            <p>Activity duration:</p>
            <select
              value={editDuration}
              onChange={(e) => setEditDuration(e.target.value)}
            >
              <option value="15">15 Minutes</option>
              <option value="20">20 Minutes</option>
              <option value="30">30 Minutes</option>
              <option value="45">45 Minutes</option>
              <option value="50">50 Minutes</option>
              <option value="60">60 Minutes</option>
              <option value="90">90 Minutes</option>
            </select>
          </div>

          <div id="materials-container-div">
            <p>Materials used:</p>
            <input
              type="text"
              value={editMaterials}
              onChange={(e) => setEditMaterials(e.target.value)}
            />
          </div>

          <div id="notes-container-div">
            <p>Notes:</p>
            <textarea
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
            />
          </div>
        </div>

        {/* Save confirms the edit, Cancel discards it */}
        <ReuseButton
          idName={"save-button"}
          text={"Save Changes"}
          onClick={handleSave}
        />
        <ReuseButton
          idName={"cancel-button"}
          text={"Cancel"}
          onClick={() => setIsEditing(false)} // discard changes, go back
        />
      </div>
    );
  }

  // NORMAL VIEW show when isEditing false
  return (
    <div className="main-card-div">
      <div className="card-grid-container">
        <div id="subject-container-div">
          <p>Subject:</p>
          <p id="subject-list-item">{subject.name}</p>
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
        idName={"edit-button"}
        text={"Edit Activity"}
        onClick={() => setIsEditing(true)}
      />
      <ReuseButton
        idName={"delete-button"}
        text={"Delete Activity"}
        onClick={() => deleteCard(id)}
      />
    </div>
  );
};

export default LogCard;
