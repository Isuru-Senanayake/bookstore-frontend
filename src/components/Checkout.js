import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = ({ cart, getTotal, setCart }) => {
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You must be logged in to place an order.");
        return;
      }

      // Create order payload
      const newOrder = {
        cart: cart,
        total: getTotal(),
      };

      // Send order to backend
      await axios.post("http://localhost:5000/api/orders", newOrder, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Clear cart after successful order
      setCart([]);
      localStorage.removeItem("cart");

      // Redirect to order history
      navigate("/history");
    } catch (error) {
      console.error("Order placement failed:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul>
          {cart.map((item, i) => (
            <li key={i}>
              {item.title} - Rs. {item.price} × {item.qty} = Rs. {item.price * item.qty}
            </li>
          ))}
        </ul>
      )}
      <h3>Total: Rs. {getTotal()}</h3>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default Checkout;
