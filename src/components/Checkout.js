import React from "react";
import { useNavigate } from "react-router-dom";

const Checkout = ({ cart, getTotal, setCart }) => {
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    // Get existing orders from localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

    // Create new order
    const newOrder = {
      id: Date.now(),
      items: cart,
      total: getTotal(),
    };

    // Save new order to localStorage
    localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));

    // Clear the cart
    setCart([]);
    localStorage.removeItem("cart");

    // Navigate to order history
    navigate("/history");
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
