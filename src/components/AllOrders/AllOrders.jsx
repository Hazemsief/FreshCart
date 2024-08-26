import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CartContext } from '../../context/CartContext';

export default function AllOrders() {
  const { UserId } = useContext(CartContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getMyOrders = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${UserId}`
      );
      console.log(data); 
      setOrders(data);
    } catch (error) {
      console.error(error); 
      setError('Failed to fetch orders. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (UserId) {
      getMyOrders();
    }
  }, [UserId]);

  if (isLoading) {
    return <div style={{ color: 'var(--text-color)' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'var(--text-color)' }} className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
      <h1 className="text-5xl font-bold text-center text-green-400 mb-12">All My Orders</h1>
      {orders.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-4 rounded-lg shadow-md" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
              <h3 className="text-lg font-medium mb-2">Order ID: {order._id}</h3>
              <p className="text-gray-700 mb-1">
                <strong>Total Price:</strong> ${order.totalCartPrice ? order.totalOrderPrice : 'N/A'}
              </p>
              <p className="text-gray-600">
                <strong>Created At:</strong> {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No orders found.</p>
      )}
    </div>
  );
}
