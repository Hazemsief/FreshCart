import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import { Spinner } from "flowbite-react";

export default function Cart() {
  const { getLoggedUserCart, updateCartItemCount, removeItemFromCart, clearCart } = useContext(CartContext);
  const [cartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [actionLoading, setActionLoading] = useState({ update: null, remove: null, clear: false });
  const [isEmpty, setIsEmpty] = useState(false);
  const [showToast, setShowToast] = useState(true); 
  const navigate = useNavigate();

  const getCartItem = async () => {
    try {
      const response = await getLoggedUserCart();
      const items = response.data.data;
      setCartDetails(items);
      const empty = items.products.length === 0;
      setIsEmpty(empty);
      setShowToast(!empty); 
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
      if (showToast) {
        toast.error('Failed to load cart items. Please try again later.', {
          duration: 2000,
          position: 'top-right',
          style: {
            animation: 'fadeOut 0.5s ease-in-out',
          },
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const updateCartCount = async (productId, count) => {
    if (count < 1) {
      toast.error('Quantity must be at least 1', {
        duration: 2000,
        position: 'top-right',
        style: {
          animation: 'fadeOut 0.5s ease-in-out',
        },
      });
      return;
    }
    setActionLoading(prev => ({ ...prev, update: productId }));
    try {
      await updateCartItemCount(productId, count);
      setCartDetails(prevDetails => ({
        ...prevDetails,
        products: prevDetails.products.map(product =>
          product.product.id === productId
            ? { ...product, count }
            : product
        ),
      }));
      toast.success('Cart updated successfully', {
        duration: 2000,
        position: 'top-right',
        style: {
          animation: 'fadeOut 0.5s ease-in-out',
        },
      });
    } catch (error) {
      console.error('Failed to update cart item count:', error);
      if (showToast) {
        toast.error('Failed to update cart. Please try again later.', {
          duration: 2000,
          position: 'top-right',
          style: {
            animation: 'fadeOut 0.5s ease-in-out',
          },
        });
      }
    } finally {
      setActionLoading(prev => ({ ...prev, update: null }));
    }
  };

  const deleteItem = async (productId) => {
    setActionLoading(prev => ({ ...prev, remove: productId }));
    try {
      await removeItemFromCart(productId);
      setCartDetails(prevDetails => ({
        ...prevDetails,
        products: prevDetails.products.filter(product => product.product.id !== productId),
      }));
      toast.success('Product removed successfully', {
        duration: 2000,
        position: 'top-right',
        style: {
          animation: 'fadeOut 0.5s ease-in-out',
        },
      });
    } catch (error) {
      console.error('Failed to remove product:', error);
      if (showToast) {
        toast.error('Failed to remove product. Please try again later.', {
          duration: 2000,
          position: 'top-right',
          style: {
            animation: 'fadeOut 0.5s ease-in-out',
          },
        });
      }
    } finally {
      setActionLoading(prev => ({ ...prev, remove: null }));
    }
  };

  const handleClearCart = async () => {
    setActionLoading(prev => ({ ...prev, clear: true }));
    try {
      await clearCart();
      setCartDetails(null);
      setIsEmpty(true);
      setShowToast(false); 
      toast.success('Cart cleared successfully', {
        duration: 2000,
        position: 'top-right',
        style: {
          animation: 'fadeOut 0.5s ease-in-out',
        },
      });
      navigate('/products');
    } catch (error) {
      console.error('Failed to clear cart:', error);
      if (showToast) {
        toast.error('Failed to clear cart. Please try again later.', {
          duration: 2000,
          position: 'top-right',
          style: {
            animation: 'fadeOut 0.5s ease-in-out',
          },
        });
      }
    } finally {
      setActionLoading(prev => ({ ...prev, clear: false }));
    }
  };

  useEffect(() => {
    getCartItem();
  }, []);

  const calculateTotalPrice = () => {
    return cartDetails?.products.reduce((total, product) => total + product.price * product.count, 0) || 0;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
        <Spinner aria-label="Loading..." />
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="text-center mt-20" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
        <h2 className="text-2xl text-gray-500 mb-4">Cart is Empty</h2>
        <button
          onClick={() => navigate('/products')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go to Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto sm:rounded-lg" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
      <h2 className="text-2xl text-green-500 py-5 text-center">Shopping Cart</h2>
      <table className="w-full max-w-5xl mx-auto text-sm text-left text-gray-500 dark:text-gray-400" style={{ color: 'var(--text-color)' }}>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">Product</th>
            <th scope="col" className="px-6 py-3">Qty</th>
            <th scope="col" className="px-6 py-3">Price</th>
            <th scope="col" className="px-6 py-3">Qnty Price</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartDetails?.products.map((product) => {
            const totalPrice = product.price * product.count;
            return (
              <tr
                key={product.product.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4">
                  <img
                    src={product.product.imageCover}
                    className="w-20 h-20 md:w-32 md:h-32 object-cover"
                    alt={product.product.title}
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.product.title}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button
                      onClick={() => updateCartCount(product.product.id, product.count - 1)}
                      className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-500 dark:focus:ring-gray-600"
                    >
                      -
                    </button>
                    <span className="mx-2">{product.count}</span>
                    <button
                      onClick={() => updateCartCount(product.product.id, product.count + 1)}
                      className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-500 dark:focus:ring-gray-600"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">{product.price.toFixed(2)}</td>
                <td className="px-6 py-4">{totalPrice.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteItem(product.product.id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    <div className="flex flex-col items-center px-6 py-4 space-y-4">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-4">{calculateTotalPrice().toFixed(2)}</h3>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleClearCart}
          disabled={actionLoading.clear}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
        >
          {actionLoading.clear ? 'Clearing...' : 'Clear Cart'}
        </button>
        <Link
          to="/checkout"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>

    </div>
  );
}
