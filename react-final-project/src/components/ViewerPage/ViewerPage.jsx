import React from "react";
import "./viewer-page.css";
import LogCard from "../LogCard/LogCard";
import LoadingPage from "../LoadingPage/LoadingPage";

const ViewerPage = ({ cards, deleteCard }) => {
  /* Receives the card that is pulled from app.jsx */
  /* conditional rendering below */

  {
    if (cards.length === 0) {
      /* if no cards (logs) have been added, the loading page appears */
      return <LoadingPage />;
    }

    return (
      <main>
        <div id="viewer-page-div">
          {/* Below: map loops through the array as many times as there are contents. Everytime it does run, it pulls out the data and places it onto a LogCard. */}
          {cards
            .map((card) => (
              <LogCard
                key={card.id}
                id={
                  card.id
                } /*{Need this for my delete function because react "consumes" the key} */
                subject={card.subject}
                duration={card.duration}
                materials={card.materials}
                notes={card.notes}
                deleteCard={deleteCard} /*Pass down the function*/
              />
            ))
            .reverse()}
        </div>
      </main>
    );
  }
};
export default ViewerPage;
