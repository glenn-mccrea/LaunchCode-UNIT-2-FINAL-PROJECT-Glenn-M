import { Route, Routes, Navigate } from "react-router";
import "./app.css";
import AboutPage from "./components/AboutPage/AboutPage";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import LogPage from "./components/LogPage/LogPage";
import ViewerPage from "./components/ViewerPage/ViewerPage";
import { useState } from "react";

function App() {
  const [cards, setCards] = useState(
    []
  ); /* array that holds the cards. starts empty */

  const addCard = (cardData) => {
    setCards([
      ...cards,
      cardData,
    ]); /* Function to place new object into the cards array at the end. */
  };

  const deleteCard = (cardId) => {
    setCards(
      cards.filter((obj) => obj.id !== cardId)
    ); /* Keeping all the cards except for the one we don't want. */
  };

  return (
    <div id="app-main-container-div">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/log" element={<LogPage addCard={addCard} />} />
        {/* Passing down 'addCard' as a prop. */}
        <Route
          path="/viewer"
          element={<ViewerPage cards={cards} deleteCard={deleteCard} />}
        />
        {/* Passing down cards as a prop. */}
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
