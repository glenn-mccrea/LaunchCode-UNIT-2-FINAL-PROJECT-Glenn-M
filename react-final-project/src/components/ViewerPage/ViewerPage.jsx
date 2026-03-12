import React from "react";
import "./viewer-page.css";
import LogCard from "../LogCard/LogCard";
import NoCardsPage from "../NoCardsPage/NoCardsPage";
import ReuseSpacer from "../ReuseSpacer/ReuseSpacer";

const ViewerPage = ({ cards, deleteCard, updateCard }) => {
  /* Receives the card that is pulled from app.jsx */
  /* conditional rendering below */

  {
    if (cards.length === 0) {
      /* if no cards (logs) have been added, the NoCardsPage page appears */
      return <NoCardsPage />;
    }

    // Add up all duration values across every card
    const totalMinutes = cards.reduce(
      (sum, card) => sum + parseInt(card.duration),
      0,
    );

    return (
      <main>
        <div id="viewer-page-div">
          <ReuseSpacer />
          {/* Total learning time summary box — only shows if cards exist */}
          <div id="total-time-box">
            <p>
              Total Learning Time: <strong>{totalMinutes} minutes</strong>
            </p>
          </div>

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
