import React from "react";
import "./homepage.css";
import background from "./homepage-image.jpg";
import { Link } from "react-router";

const HomePage = () => {
  return (
    <main>
      <div id="homepage-div" style={{ backgroundImage: `url(${background})` }}>
        <section id="homepage-text-container">
          <h2>Welcome to Homeschool Day Tracker!</h2>
          <div>
            <h3>
              We exist to help Teachers track school day learning activities in
              a clean, easy to use log.
            </h3>

            <p>Easily keep track of:</p>
            <ul>
              <li>Subjects covered</li>
              <li>Duration of the activity</li>
              <li>Materials used for instruction</li>
              <li>Add freeform notes to each activity</li>
              <li>More to come in future updates!</li>
            </ul>
          </div>
          <br />
          <h3>
            To get started,
            <Link to="/log" className="button-div">
              Log Activity
            </Link>
          </h3>
        </section>
      </div>
    </main>
  );
};

export default HomePage;
