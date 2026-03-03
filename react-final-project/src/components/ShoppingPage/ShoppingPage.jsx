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
  };
};
