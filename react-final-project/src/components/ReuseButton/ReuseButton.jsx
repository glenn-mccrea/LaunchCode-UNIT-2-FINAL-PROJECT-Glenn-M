import React from "react";
import "./reuse-button.css";

const ReuseButton = ({ text, idName, onClick }) => {
  return (
    <>
      <button className="reuse-button" id={idName} onClick={onClick}>
        {text}
      </button>
    </>
  );
};

export default ReuseButton;
