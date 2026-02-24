import "./about-page.css";
import React from "react";
import background from "./about-page-background.jpg";
import image from "./about-page-img-element.jpg";
import ReuseButton from "../ReuseButton/ReuseButton";

const AboutPage = () => {
  return (
    <main>
      <div id="aboutpage-div" style={{ backgroundImage: `url(${background})` }}>
        <section id="aboutpage-text-container">
          <h2>
            Homeschool Day Tracker was created to serve teachers like you...
          </h2>
          <h3>
            In 2025 the idea for HSDT was born out of a desire to have a simple
            web app that would help Teachers track school day learning and
            activities in a clean, easy to use way.
          </h3>
          <img
            src={image}
            alt="A Student watching a school lesson on a computer."
          />

          <h3 style={{ paddingTop: "50px" }}>
            We are excited to be expanding HSDT!
          </h3>
          <table>
            <thead>
              <tr>
                <th>Features to come:</th>
                <th>Timeframe:</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Filtering results by subject</td>
                <td>Spring 2026</td>
              </tr>
              <tr>
                <td>Editing previous entries</td>
                <td>Spring 2026</td>
              </tr>
            </tbody>
          </table>
          <div style={{ paddingTop: "50px" }}>
            Comments or suggestions?
            <a
              href="mailto:youremail@example.com?subject=HSDT Feedback"
              style={{ textDecoration: "none" }}
            >
              <ReuseButton idName={"contact-button"} text={"Contact Us"} />
            </a>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutPage;
