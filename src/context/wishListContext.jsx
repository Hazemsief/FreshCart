import React, { createContext, useState , useEffect } from "react";
import axios from "axios";

export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  
  const headers = {
    token: localStorage.getItem('accessToken')
  };

  async function getLoggedUserWishlist() {
    try {
      console.log('fetching wishList with headers' , headers);
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers });
      // console.log('WishList response', response)
      return response.data;
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
      throw error;
    }
  }

  async function addProductToWishlist(productId) {
    try {
      const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId }, { headers });
      await getLoggedUserWishlist();
      return response.data;
    } catch (error) {
      console.error('Failed to add product to wishlist:', error);
      throw error;
    }
  }

  async function removeProductFromWishlist(productId) {
    try {
      const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers });
      await getLoggedUserWishlist();
      return response.data;
    } catch (error) {
      console.error('Failed to remove product from wishlist:', error);
      throw error;
    }
  }

  useEffect(() => {
    getLoggedUserWishlist();
  }, []);

  return (
    <WishlistContext.Provider value={{ getLoggedUserWishlist, addProductToWishlist, removeProductFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}
