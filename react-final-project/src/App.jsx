import { Route, Routes, Navigate } from "react-router";
import "./app.css";
import AboutPage from "./components/AboutPage/AboutPage";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import LogPage from "./components/LogPage/LogPage";
import ViewerPage from "./components/ViewerPage/ViewerPage";
import ReuseSpacer from "./components/ReuseSpacer/ReuseSpacer";
import ShoppingPage from "./components/ShoppingPage/ShoppingPage";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shoppingItems, setShoppingItems] = useState([]);
  const [cards, setCards] = useState(
    [],
  ); /* array that holds the cards. starts empty */

  useEffect(() => {
    fetch(`${API_URL}/api/logs`)
      .then((res) => {
        if (!res.ok) throw new Error("Could not reach the server.");
        return res.json();
      })
      .then((data) => {
        setCards(data); // ← fills cards from database
        setLoading(false); // ← hides loading page
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const addCard = (cardData) => {
    setCards([
      ...cards,
      cardData,
    ]); /* Function to place new object into the cards array at the end. */
  };

  const deleteCard = async (cardId) => {
    try {
      const response = await fetch(`${API_URL}/api/logs/${cardId}`, {
        method: "DELETE", // tell Spring to delete, not just read
      });

      if (!response.ok) throw new Error("Delete failed.");

      // remove from screen AFTER database confirms gone
      setCards(cards.filter((obj) => obj.id !== cardId));
    } catch (err) {
      alert("Could not delete log. Please try again.");
    }
  };

  const updateCard = async (id, updatedData) => {
    try {
      const response = await fetch(`${API_URL}/api/logs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }, // ← tell Spring we're sending JSON
        body: JSON.stringify(updatedData), // ← convert JS object to JSON string
      });

      if (!response.ok) throw new Error("Update failed.");

      const updatedCard = await response.json();

      // Find the old card by id and replace it with the updated version
      setCards(cards.map((card) => (card.id === id ? updatedCard : card)));
    } catch (err) {
      alert("Could not update log. Please try again.");
    }
  };

  // Fetch shopping items on startup
  useEffect(() => {
    fetch(`${API_URL}/api/shopping`)
      .then((res) => res.json())
      .then((data) => setShoppingItems(data))
      .catch((err) => console.error("Shopping fetch failed:", err));
  }, []);

  // Add and delete
  const addShoppingItem = (itemData) => {
    setShoppingItems([...shoppingItems, itemData]);
  };

  const deleteShoppingItem = async (itemId) => {
    try {
      const response = await fetch(`${API_URL}/api/shopping/${itemId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Delete failed.");
      setShoppingItems(shoppingItems.filter((obj) => obj.id !== itemId));
    } catch (err) {
      alert("Could not delete that item. Please try again.");
    }
  };

  if (loading) return <LoadingPage />;
  if (error)
    return <p style={{ color: "white", padding: "2rem" }}>Error: {error}</p>;

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
          element={
            <ViewerPage
              cards={cards}
              deleteCard={deleteCard}
              updateCard={updateCard}
            />
          }
        />
        {/* Passing down cards as a prop. */}
        <Route path="/loading" element={<LoadingPage />} />
        <Route
          path="/shopping"
          element={
            <ShoppingPage
              items={shoppingItems}
              addItem={addShoppingItem}
              deleteItem={deleteShoppingItem}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
      <ReuseSpacer />
    </div>
  );
}

export default App;
