import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/wishListContext';
import toast from 'react-hot-toast';
import { FaHeart } from 'react-icons/fa';

export default function RecentProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { addProductToCart } = useContext(CartContext);
  const { addProductToWishlist, removeProductFromWishlist, wishlistItems = [] } = useContext(WishlistContext);

  async function AddProduct(productId) {
    const response = await addProductToCart(productId);
    
    if (response.data.status === 'success') {
      toast.success(response.data.message, {
        duration: 2000, 
        position: 'top-right', 
        style: {
          animation: 'fadeOut 0.5s ease-in-out', 
        },
      });
    } else {
      toast.error(response.data.message, {
        duration: 2000,
        position: 'top-right',
        style: {
          animation: 'fadeOut 0.5s ease-in-out',
        },
      });
    }
  }

  async function getRecentProducts() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      setProducts(data.data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error?.response?.data?.message || 'An error occurred');
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleAddToWishlist = async (productId) => {
    try {
      await addProductToWishlist(productId);
      toast.success('Added to wishlist', { duration: 2000, position: 'top-right' });
    } catch (error) {
      toast.error('Failed to add to wishlist.', { duration: 2000, position: 'top-right' });
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await removeProductFromWishlist(productId);
      toast.success('Removed from wishlist', { duration: 2000, position: 'top-right' });
    } catch (error) {
      toast.error('Failed to remove from wishlist.', { duration: 2000, position: 'top-right' });
    }
  };

  useEffect(() => {
    getRecentProducts();
  }, []);

  const isProductInWishlist = (productId) => wishlistItems.some(item => item.id === productId);

  return (
    <>
      <section className="py-20 m-40">
        <div className="container mx-auto">
          <h1 className="font-semibold text-2xl text-green-500 mb-20 dark:text-green-400">Recent Products</h1>
          {isLoading ? (
            <div className="text-center text-gray-700 dark:text-gray-300">Loading...</div>
          ) : error ? (
            <div className="text-center text-xl text-red-500 bg-red-100 p-4 rounded-md dark:bg-red-800 dark:text-red-300">
              {error}
            </div>
          ) : (
            <div className="flex flex-wrap -mx-4">
              {products.map((product) => (
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 px-4 mb-4 relative" key={product.id}>
                  <Link to={`/ProductDetails/${product.id}/${product.category.name}`} className="block">
                    <img className="w-full h-48 object-cover rounded-lg" src={product.imageCover} alt={product.title} />
                    <span className="block font-light text-green-600 dark:text-green-400">{product.category.name}</span>
                    <h2 className="text-lg font-normal truncate text-gray-800 mb-4 dark:text-gray-200">{product.title.split('').join(' ')}</h2>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-900 dark:text-gray-300">{product.price} EGP</span>
                      <span className="text-yellow-300 dark:text-yellow-400">{product.ratingsAverage} <i className="fas fa-star"></i></span>
                    </div>
                  </Link>
                  <button 
                    onClick={() => isProductInWishlist(product.id) ? handleRemoveFromWishlist(product.id) : handleAddToWishlist(product.id)}
                    className={`absolute top-2 right-2 p-2 rounded-full text-xl cursor-pointer ${isProductInWishlist(product.id) ? 'text-red-500 bg-gray-200 dark:bg-gray-700' : 'text-gray-200 bg-gray-800 dark:text-gray-400'}`}
                  >
                    <FaHeart />
                  </button>
                  <button onClick={() => AddProduct(product.id)} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700">
                    Add To Cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
