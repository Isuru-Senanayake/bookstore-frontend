import React, { useEffect, useState } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div>
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No previous orders.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} style={{ marginBottom: "20px", borderBottom: "1px solid #ccc" }}>
            <h4>Order ID: {order.id}</h4>
            <ul>
              {order.items.map((item, i) => (
                <li key={i}>
                  {item.title} - Rs. {item.price} × {item.qty} = Rs. {item.price * item.qty}
                </li>
              ))}
            </ul>
            <strong>Total: Rs. {order.total}</strong>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
