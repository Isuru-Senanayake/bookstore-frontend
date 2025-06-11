import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Checkout from "./components/Checkout";
import CartPage from "./pages/CartPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import BookList from "./pages/BookList";

function App() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("harry potter");
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/books?q=${search}`);
      const booksWithPrice = res.data.map(book => ({
        ...book,
        price: Math.floor(Math.random() * 1000) + 500
      }));
      setBooks(booksWithPrice);
    } catch (error) {
      console.error("Error fetching books", error);
      setBooks([]);
    }
  };

  const addToCart = (book) => {
    const exists = cart.find(item => item.title === book.title);
    if (exists) {
      setCart(cart.map(item =>
        item.title === book.title ? { ...item, qty: item.qty + 1 } : item
      ));
    } else {
      setCart([...cart, { ...book, qty: 1 }]);
    }
  };

  const increaseQty = (title) => {
    setCart(cart.map(item =>
      item.title === title ? { ...item, qty: item.qty + 1 } : item
    ));
  };

  const decreaseQty = (title) => {
    setCart(cart.map(item =>
      item.title === title ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 } : item
    ));
  };

  const removeFromCart = (title) => {
    setCart(cart.filter(item => item.title !== title));
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <h1>Online Bookstore</h1>

        <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
          <Link to="/cart" style={{ marginRight: "10px" }}>Cart ({cart.length})</Link>
          <Link to="/checkout" style={{ marginRight: "10px" }}>Checkout</Link>
          <Link to="/history">Order History</Link>
        </nav>

        <Routes>
          <Route path="/" element={
            <div>
              <Signup />
              <Login />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search books"
              />
              <button onClick={fetchBooks}>Search</button>

              <BookList books={books} addToCart={addToCart} />
            </div>
          } />
          <Route path="/cart" element={
            <CartPage
              cart={cart}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
              removeFromCart={removeFromCart}
              getTotal={getTotal}
            />
          } />
          <Route path="/checkout" element={<Checkout cart={cart} getTotal={getTotal} setCart={setCart} />} />
          <Route path="/history" element={<OrderHistoryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
