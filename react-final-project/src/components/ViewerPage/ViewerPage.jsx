import React from "react";
import "./viewer-page.css";
import LogCard from "../LogCard/LogCard";
import NoCardsPage from "../NoCardsPage/NoCardsPage";

const ViewerPage = ({ cards, deleteCard, updateCard }) => {
  /* Receives the card that is pulled from app.jsx */
  /* conditional rendering below */

  {
    if (cards.length === 0) {
      /* if no cards (logs) have been added, the NoCardsPage page appears */
      return <NoCardsPage />;
    }

    return (
      <main>
        <div id="viewer-page-div">
          {[...cards].reverse().map((card) => (
            <LogCard
              key={card.id}
              id={card.id} /* Need id separately — React consumes key */
              subject={card.subject}
              duration={card.duration}
              materials={card.materials}
              notes={card.notes}
              deleteCard={deleteCard}
              updateCard={updateCard}
            />
          ))}
        </div>
      </main>
    );
  }
};

export default ViewerPage;
