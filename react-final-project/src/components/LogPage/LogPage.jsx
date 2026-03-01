import React, { useState } from "react";
import "./log-page.css";
import { useNavigate } from "react-router";

const LogPage = ({ addCard }) => {
  const [subject, setSubject] =
    useState(""); /* define the useState for all items */
  const [duration, setDuration] = useState("15");
  const [materials, setMaterials] = useState("");
  const [notes, setNotes] = useState("");

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // false because form isn't submitting yet
  const [error, setError] = useState(null);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    setError(null);

    const newCard = {
      duration: duration,
      materials: materials,
      notes: notes,
      subject: { id: parseInt(subject) }, // ← parseInt converts "4" string to 4 number
    };

    try {
      const response = await fetch("http://localhost:8080/api/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // tell Spring JSON
        body: JSON.stringify(newCard), // convert JS object to JSON string
      });

      if (!response.ok)
        throw new Error("Failed to save log. Please try again.");

      const savedCard = await response.json(); // returns the saved object with real id

      addCard(savedCard); // pass card up to App.jsx

      // reset form values
      setSubject("");
      setDuration("15");
      setMaterials("");
      setNotes("");

      navigate("/viewer");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); //  re-enable button for submitwhen done
    }
  };

  return (
    <main>
      <div id="logpage-div">
        <div id="form-container">
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="school-subject">Subject: </label>
            <br />
            <select
              required
              id="school-subject"
              name="school-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="">Choose a subject</option>
              <option value="3">English/Language Arts</option>{" "}
              <option value="4">Mathematics</option>
              <option value="5">Science</option>
              <option value="6">Social Studies/History</option>{" "}
              <option value="7">Foreign Language</option>
              <option value="8">Art</option>
              <option value="9">Music</option>
              <option value="10">Computer Science</option>
            </select>
            <br />
            <br />
            <label htmlFor="activity-duration">Duration: </label>
            <br />
            <select
              name="activity-duration"
              id="activity-duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="15">15 Minutes</option>
              <option value="20">20 Minutes</option>
              <option value="30">30 Minutes</option>
              <option value="45">45 Minutes</option>
              <option value="50">50 Minutes</option>
              <option value="60">60 Minutes</option>
              <option value="90">90 Minutes</option>
            </select>
            <br />
            <br />
            <label htmlFor="materials-input">Materials Used: </label>
            <br />
            <input
              required /*Used for form validation */
              type="text"
              id="materials-input"
              name="materials"
              placeholder="Enter materials used"
              value={materials}
              onChange={(e) => setMaterials(e.target.value)}
            />
            <br />
            <br />
            <label htmlFor="notes-input">Notes: </label>
            <br />
            <textarea
              id="notes-input"
              name="notes"
              style={{ height: "100px" }}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <p>
              <button type="submit" className="button-div" disabled={loading}>
                {loading ? "Saving..." : "Submit Log"}
                loading.
              </button>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LogPage;
