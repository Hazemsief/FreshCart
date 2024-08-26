import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartId, setCartId] = useState(null); 
  const [UserId, setUserId] = useState(null);

  const headers = {
    token: localStorage.getItem('accessToken')
  };

  const getLoggedUserCart = async () => {
    try {
      console.log('Fetching cart with headers:', headers);
      const response = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', { headers });
      console.log('Cart response:', response.data); 
      const { data } = response;
      setNumOfCartItems(data.numOfCartItems);
      setCartId(data.cartId); 
      setUserId(data.data.cartOwner); 
      return response;
    } catch (error) {
      console.error('Error fetching cart:', error);
      return error.message; 
    }
  };

  const addProductToCart = async (productId) => {
    try {
      console.log('Adding product to cart with ID:', productId);
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', { productId }, { headers });
      console.log('Add product response:', response.data); 
      await getLoggedUserCart();
      return response;
    } catch (error) {
      console.error('Error adding product to cart:', error);
      return error.message;
    }
  };

  const updateCartItemCount = async (productId, count) => {
    try {
      console.log('Updating item count for product ID:', productId, 'New count:', count);
      const response = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }, { headers });
      console.log('Update item count response:', response.data); 
      await getLoggedUserCart();
      return response;
    } catch (error) {
      console.error('Error updating cart item count:', error);
      return error.message; 
    }
  };

  const removeItemFromCart = async (productId) => {
    try {
      console.log('Removing item from cart with ID:', productId);
      const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers });
      console.log('Remove item response:', response.data); 
      await getLoggedUserCart();
      return response;
    } catch (error) {
      console.error('Error removing item from cart:', error);
      return error.message; 
    }
  };

  const clearCart = async () => {
    try {
      console.log('Clearing cart');
      const response = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', { headers });
      console.log('Clear cart response:', response.data); 
      setNumOfCartItems(0);
      setCartId(null); 
      return response;
    } catch (error) {
      console.error('Error clearing cart:', error);
      return error.message; 
    }
  };

  const getPayment = async (url, shippingAddress) => {
    try {
      const { data } = await axios.post(url, { shippingAddress }, { headers });
      console.log('Payment response:', data); 
      return data;
    } catch (error) {
      console.error('Error during payment:', error);
      return error.message; 
    }
  };

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  return (
    <CartContext.Provider value={{ getLoggedUserCart, addProductToCart, updateCartItemCount, removeItemFromCart, numOfCartItems, cartId, UserId , clearCart, getPayment }}>
      {children}
    </CartContext.Provider>
  );
}
