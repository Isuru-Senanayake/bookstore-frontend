import React from "react";

function BookList({ books, search, setSearch, fetchBooks, addToCart }) {
  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search books"
      />
      <button onClick={fetchBooks}>Search</button>

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
}

export default BookList;
