import React from "react";

function CartPage({ cart, increaseQty, decreaseQty, removeFromCart, getTotal }) {
  return (
    <div>
      <h2>Cart ({cart.length} items)</h2>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul>
          {cart.map((item, i) => (
            <li key={i}>
              <strong>{item.title}</strong> by {item.authors?.join(", ")} <br />
              Rs. {item.price} × {item.qty} = Rs. {item.price * item.qty}
              <br />
              <button onClick={() => decreaseQty(item.title)}>-</button>
              <button onClick={() => increaseQty(item.title)}>+</button>
              <button onClick={() => removeFromCart(item.title)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: Rs. {getTotal()}</h3>
    </div>
  );
}

export default CartPage;
