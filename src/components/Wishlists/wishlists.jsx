import React, { useContext, useEffect, useState } from 'react';
import { WishlistContext } from '../../context/wishListContext';
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';

export default function Wishlist() {
  const { getLoggedUserWishlist, removeProductFromWishlist } = useContext(WishlistContext);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [addingToCart, setAddingToCart] = useState(null); // Track adding to cart state
  const { addProductToCart } = useContext(CartContext);

  const fetchWishlistItems = async () => {
    setLoading(true);
    try {
      const response = await getLoggedUserWishlist();
      const { data } = response;
      setWishlistItems(data);
    } catch (error) {
      console.error('Failed to fetch wishlist items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    setRemovingId(productId);
    try {
      await removeProductFromWishlist(productId);
      toast.success('Removed from wishlist', {
        duration: 2000,
        position: 'top-right',
      });
      // Update the wishlist items state without refreshing the page
      setWishlistItems(prevItems => prevItems.filter(item => item._id !== productId));
    } catch (error) {
      toast.error('Failed to remove from wishlist', {
        duration: 2000,
        position: 'top-right',
      });
    } finally {
      setRemovingId(null);
    }
  };

  const handleAddToCart = async (productId) => {
    setAddingToCart(productId); // Set loading state
    try {
      const response = await addProductToCart(productId);
      if (response.data.status === 'success') {
        toast.success(response.data.message, {
          duration: 2000,
          position: 'top-right',
        });
      } else {
        toast.error(response.data.message, {
          duration: 2000,
          position: 'top-right',
        });
      }
    } catch (error) {
      toast.error('Failed to add to cart.', {
        duration: 2000,
        position: 'top-right',
      });
    } finally {
      setAddingToCart(null); // Reset loading state
    }
  };

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-16 h-16 border-4 border-t-4 border-green-400 border-solid rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center py-5">
      <h1 className="text-3xl font-bold text-green-400 mb-4">My Wishlist</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {wishlistItems.length > 0 ? (
          wishlistItems.map((product) => (
            <div key={product._id} className="w-80 max-w-xs bg-white border border-green-400 rounded-lg shadow-md overflow-hidden">
              <a href="#">
                <img className="w-full h-80 object-cover" src={product.imageCover} alt={product.title} />
              </a>
              <div className="p-4">
                <a href="#">
                  <h5 className="text-lg font-semibold text-gray-800 truncate">{product.title}</h5>
                </a>
                <div className="flex items-center mt-2">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    {[...Array(Math.floor(product.ratingsAverage))].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    ))}
                    {[...Array(5 - Math.floor(product.ratingsAverage))].map((_, i) => (
                      <svg key={i + Math.floor(product.ratingsAverage)} className="w-4 h-4 text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xl font-bold text-gray-900">{product.price} EGP</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product._id)}
                      className={`bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition ${addingToCart === product._id ? 'bg-blue-700' : ''}`}
                      disabled={addingToCart === product._id}
                    >
                      {addingToCart === product._id ? (
                        <svg className="w-5 h-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"></path>
                        </svg>
                      ) : (
                        'Add to Cart'
                      )}
                    </button>
                    <button
                      onClick={() => handleRemoveFromWishlist(product._id)}
                      className={`bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition ${removingId === product._id ? 'bg-red-700' : ''}`}
                      disabled={removingId === product._id}
                    >
                      {removingId === product._id ? 'Removing...' : 'Remove'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg font-semibold text-gray-600">Your wishlist is empty</p>
        )}
      </div>
    </div>
  );
}
