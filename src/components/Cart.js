import { useEffect, useState } from "react";
import { getCart, updateCart } from "../api";

const userId = "user1"; // Replace with actual user ID

useEffect(() => {
  getCart(userId)
    .then((res) => setCart(res.data?.items || []))
    .catch((err) => console.log("Error loading cart", err));
}, []);

const handleUpdateCart = () => {
  updateCart(userId, { userId, items: cart })
    .then(() => alert("Cart saved"))
    .catch((err) => console.log("Error saving cart", err));
};
