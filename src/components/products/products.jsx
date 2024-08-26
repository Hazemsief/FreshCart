import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/wishListContext';
import toast from 'react-hot-toast';
import { FaHeart } from 'react-icons/fa';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { addProductToCart } = useContext(CartContext);
  const { addProductToWishlist, removeProductFromWishlist, wishlistItems = [] } = useContext(WishlistContext);

  const handleAddToCart = async (productId) => {
    try {
      const response = await addProductToCart(productId);
      if (response.data.status === 'success') {
        toast.success(response.data.message, { duration: 2000, position: 'top-right' });
      } else {
        toast.error(response.data.message, { duration: 2000, position: 'top-right' });
      }
    } catch (error) {
      toast.error('Failed to add to cart.', { duration: 2000, position: 'top-right' });
    }
  };

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
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
        setProducts(data.data);
        setFilteredProducts(data.data);
        setError(null);
      } catch (error) {
        console.error(error);
        setError(error?.response?.data?.message || 'An error occurred');
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); 

  useEffect(() => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]); 

  const isProductInWishlist = (productId) => wishlistItems.some(item => item.id === productId);

  return (
    <section className="py-20 p-10 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <h1 className="font-semibold text-2xl text-green-500 mb-20">Recent Products</h1>
        <input
          type="text"
          placeholder="Search for products..."
          className="border p-2 mb-5 w-full dark:bg-gray-800 dark:text-white dark:border-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="w-16 h-16 border-4 border-t-4 border-green-400 border-solid rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center text-xl text-red-500 bg-red-100 p-4 rounded-md shadow-md dark:bg-red-800 dark:text-red-300">
            {error}
          </div>
        ) : (
          <div className="flex flex-wrap -mx-4">
            {filteredProducts.map((product) => (
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-4 relative" key={product.id}>
                <Link to={`/ProductDetails/${product.id}/${product.category.name}`} className="block">
                  <img className="w-full h-48 object-cover rounded-lg" src={product.imageCover} alt={product.title} />
                  <span className="block font-light text-green-600 dark:text-green-400">{product.category.name}</span>
                  <h2 className="text-lg font-normal truncate text-gray-800 mb-4 dark:text-gray-200">{product.title.split('').join(' ')}</h2>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 dark:text-gray-300">{product.price} EGP</span>
                    <span className="text-yellow-300 dark:text-yellow-400">{product.ratingsAverage} <i className="fas fa-star"></i></span>
                  </div>
                </Link>
                <button 
                  onClick={() => isProductInWishlist(product.id) ? handleRemoveFromWishlist(product.id) : handleAddToWishlist(product.id)}
                  className={`absolute top-2 right-2 p-2 rounded-full text-xl cursor-pointer ${isProductInWishlist(product.id) ? 'text-red-500' : 'text-gray-200 dark:text-gray-400'} ${isProductInWishlist(product.id) ? 'bg-gray-200' : 'bg-gray-800 dark:bg-gray-700'}`}
                >
                  <FaHeart />
                </button>
                <div className="flex justify-between items-center mt-2">
                  <button onClick={() => handleAddToCart(product.id)} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700">
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
