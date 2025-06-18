import React, { useEffect, useState } from "react";
import axios from "axios";

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]); // Ensure it's an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You are not logged in.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data);
      } catch (err) {
        setError("Failed to fetch orders");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading order history...</p>;
  if (error) return <p>{error}</p>;
  if (!orders.length) return <p>No orders found.</p>;

  return (
    <div>
      <h2>Order History</h2>
      {orders.map((order) => (
        <div key={order.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Total:</strong> Rs. {order.total}</p>
          <ul>
            {order.items.map((item, i) => (
              <li key={i}>
                {item.title} - Rs. {item.price} × {item.qty} = Rs. {item.price * item.qty}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default OrderHistoryPage;
