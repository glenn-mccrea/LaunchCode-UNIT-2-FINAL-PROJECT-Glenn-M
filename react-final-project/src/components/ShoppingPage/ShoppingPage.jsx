import React, { useState } from "react";
import "./shopping-page.css";

const ShoppingPage = ({ items, addItem, deleteItem }) => {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    setError(null);

    const newItem = {
      item: item,
      quantity: parseInt(quantity), // string to number for database
    };

    try {
      const response = await fetch("http://localhost:8080/api/shopping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      if (!response.ok)
        throw new Error("Failed to save item. Please try again.");

      const savedItem = await response.json();
      addItem(savedItem); // pass up to App.jsx state

      // reset form
      setItem("");
      setQuantity("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div id="shopping-page-div">
        <h2>Annual Shopping List</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="item-input">Item: </label>
          <input
            required
            type="text"
            id="item-input"
            placeholder="Enter item"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />

          <label htmlFor="quantity-input">Quantity: </label>
          <input
            required
            type="number"
            id="quantity-input"
            placeholder="Enter quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <button type="submit" className="button-div" disabled={loading}>
            {loading ? "Adding..." : "Add Item"}
          </button>
        </form>

        {/* this is the table*/}
        {items.length === 0 ? (
          // if no items exist yet
          <p>No items exist!</p>
        ) : (
          <table id="shopping-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.id}>
                  <td>{i.item}</td>
                  <td>{i.quantity}</td>
                  <td>
                    <button
                      className="button-div"
                      onClick={() => deleteItem(i.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
};

export default ShoppingPage;
