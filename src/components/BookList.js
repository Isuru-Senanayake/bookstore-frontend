import React, { useState, useEffect } from "react";
import axios from "axios";

function BookList({ addToCart }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/books?q=")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Books</h2>
      {books.length === 0 ? (
        <p>No books found</p>
      ) : (
        books.map((book) => (
          <div key={book.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <button onClick={() => addToCart(book)}>Add to Cart</button>
          </div>
        ))
      )}
    </div>
  );
}

export default BookList;
