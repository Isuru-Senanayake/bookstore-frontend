import axios from 'axios';

const BASE_URL = "http://localhost:5000/api"; // Adjust if using different port

// CART
export const getCart = (userId) => axios.get(`${BASE_URL}/cart/${userId}`);
export const updateCart = (userId, cartData) => axios.post(`${BASE_URL}/cart/${userId}`, cartData);

// ORDERS
export const placeOrder = (orderData) => axios.post(`${BASE_URL}/orders`, orderData);
export const getOrders = (userId) => axios.get(`${BASE_URL}/orders/${userId}`);
