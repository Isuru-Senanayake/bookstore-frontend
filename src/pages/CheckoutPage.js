import React, { useState } from 'react';
import axios from 'axios';

function CheckoutPage() {
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/orders', { shippingAddress, paymentMethod }, { withCredentials: true });
      setMessage('Order placed successfully!');
    } catch (error) {
      setMessage('Order failed. Try again.');
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Shipping Address"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          required
        />
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option>Cash on Delivery</option>
          <option>Credit Card</option>
        </select>
        <button type="submit">Place Order</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default CheckoutPage;
