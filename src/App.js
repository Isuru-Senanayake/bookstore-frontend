import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Checkout from "./components/Checkout";
import CartPage from "./pages/CartPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import BookList from "./pages/BookList";
import ProtectedRoute from "./ProtectedRoute";
import './styles.css';


function App() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("harry potter");
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchBooks();
    }
  }, [isLoggedIn]);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/books?q=${search}`);
      const booksWithPrice = res.data.map((book) => ({
        ...book,
        price: Math.floor(Math.random() * 1000) + 500,
      }));
      setBooks(booksWithPrice);
    } catch (error) {
      console.error("Error fetching books", error);
      setBooks([]);
    }
  };

  const addToCart = (book) => {
    const exists = cart.find((item) => item.title === book.title);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.title === book.title ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...book, qty: 1 }]);
    }
  };

  const increaseQty = (title) => {
    setCart(
      cart.map((item) =>
        item.title === title ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (title) => {
    setCart(
      cart.map((item) =>
        item.title === title ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 } : item
      )
    );
  };

  const removeFromCart = (title) => {
    setCart(cart.filter((item) => item.title !== title));
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <h1>Online Bookstore</h1>

        <nav style={{ marginBottom: "20px" }}>
          {!isLoggedIn ? (
            <>
              <Link to="/" style={{ marginRight: "10px" }}>Signup</Link>
              <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
            </>
          ) : (
            <>
              <Link to="/books" style={{ marginRight: "10px" }}>Books</Link>
              <Link to="/cart" style={{ marginRight: "10px" }}>Cart ({cart.length})</Link>
              <Link to="/checkout" style={{ marginRight: "10px" }}>Checkout</Link>
              <Link to="/history" style={{ marginRight: "10px" }}>Order History</Link>
              <button onClick={logout}>Logout</button>
            </>
          )}
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to="/books" /> : <Signup />
            }
          />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/books"
            element={
              <ProtectedRoute>
                <BookList
                  books={books}
                  search={search}
                  setSearch={setSearch}
                  fetchBooks={fetchBooks}
                  addToCart={addToCart}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage
                  cart={cart}
                  increaseQty={increaseQty}
                  decreaseQty={decreaseQty}
                  removeFromCart={removeFromCart}
                  getTotal={getTotal}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout cart={cart} getTotal={getTotal} setCart={setCart} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <OrderHistoryPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
