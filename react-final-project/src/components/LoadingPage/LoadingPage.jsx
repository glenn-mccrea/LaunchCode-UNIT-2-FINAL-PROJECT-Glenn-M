import React from "react";
import "./loading-page.css";

const LoadingPage = () => {
  return (
    <main>
      <div id="loading-page-main-div">
        <div id="loading-statement">
          <p>
            <em>loading...</em>
          </p>
          <p className="loader"></p>
        </div>
      </div>
    </main>
  );
};

export default LoadingPage;