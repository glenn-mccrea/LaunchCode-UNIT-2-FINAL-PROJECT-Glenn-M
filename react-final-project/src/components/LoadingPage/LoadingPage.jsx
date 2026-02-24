import React, { useEffect, useState } from "react";
import "./loading-page.css";
import { Link } from "react-router";

const LoadingPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer); /* This is a cleanup function. */
  }, []);

  return (
    <main>
      <div id="loading-page-main-div">
        {isLoading ? (
          <div id="loading-statement">
            <p>
              <em>loading...</em>
            </p>

            <p className="loader"></p>
          </div>
        ) : (
          <div id="no-logs-statement">
            <p>Sorry, no log items to see here.</p>
            <br />
            <p>
              To get started,
              <Link to="/log" className="button-div">
                Log Activity
              </Link>
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default LoadingPage;
