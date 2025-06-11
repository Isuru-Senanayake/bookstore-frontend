import React from "react";

const BookList = ({ books, addToCart }) => {
  return (
    <div>
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books found</p>
      ) : (
        <ul>
          {books.map((book, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              <strong>{book.title}</strong> by {book.authors?.join(", ")} <br />
              Rs. {book.price} <br />
              {book.thumbnail && (
                <img src={book.thumbnail} alt={book.title} width={100} />
              )}
              <br />
              <button onClick={() => addToCart(book)}>Add to Cart</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
