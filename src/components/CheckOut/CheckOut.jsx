import React, { useState, useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { CartContext } from '../../context/CartContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { getPayment, getLoggedUserCart, numOfCartItems, cartId } = useContext(CartContext);
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCart() {
      const cartResponse = await getLoggedUserCart();
      if (cartResponse.statusMsg === 'fail' || numOfCartItems === 0) {
        setApiError('Your cart is empty. Please add items to your cart before proceeding to checkout.');
      }
    }
    
    fetchCart();
  }, [numOfCartItems, getLoggedUserCart]);

  const validationSchema = Yup.object().shape({
    details: Yup.string()
      .min(3, 'Details min length is 3')
      .required('Details are required'),
    phone: Yup.string()
      .matches(/^(010|011|012|015)\d{8}$/, 'Phone must be a valid Egyptian number')
      .required('Phone is required'),
    city: Yup.string()
      .min(2, 'City min length is 2')
      .required('City is required'),
    paymentMethod: Yup.string()
      .oneOf(['payOnline', 'payCash'], 'Select a valid payment method')
      .required('Payment method is required'),
  });

  const formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
      paymentMethod: 'payCash', // Default to payCash
    },
    validationSchema,
    onSubmit: handleCheckout,
  });

  async function handleCheckout(values) {
    if (numOfCartItems === 0 || !cartId) {
      setApiError('Your cart is empty or cart ID is missing. Please add items to your cart before proceeding to checkout.');
      return;
    }

    setIsLoading(true);
    try {
      if (values.paymentMethod === 'payOnline') {
        // Handle "Pay Online"
        const url = `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`;
        const res = await getPayment(url, values); 
        window.location.href = res.session.url; // Redirect to payment session
      } else if (values.paymentMethod === 'payCash') {
        // Handle "Pay Cash"
        const url = `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;
        const res = await getPayment(url, values);
        if (res.status === 'success') {
          navigate('/AllOrders'); 
        } else {
          setApiError(res.message || 'Checkout failed. Please try again.');
        }
      }
    } catch (error) {
      setApiError('An error occurred during checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      {apiError && (
        <div className="text-xl p-3 text-red-500 rounded-lg bg-gray-700 dark:bg-gray-900">
          {apiError}
        </div>
      )}

      <h1 className="text-5xl font-bold text-center text-green-400 mb-12 dark:text-green-300">
          Checkout
      </h1>

      <div className="relative z-0 w-full mb-5 group p-2">
        <input
          value={formik.values.details}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
          name="details"
          id="details"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="details"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Enter Your Details
        </label>
      </div>
      {formik.errors.details && formik.touched.details && (
        <div className="mt-2 mb-4 p-3 text-red-500 rounded-lg bg-gray-700 dark:bg-gray-900">
          {formik.errors.details}
        </div>
      )}

      <div className="relative z-0 w-full mb-5 group p-2">
        <input
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="tel"
          name="phone"
          id="phone"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="phone"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Enter Your Phone Number
        </label>
      </div>
      {formik.errors.phone && formik.touched.phone && (
        <div className="mt-2 mb-4 p-3 text-red-500 rounded-lg bg-gray-700 dark:bg-gray-900">
          {formik.errors.phone}
        </div>
      )}

      <div className="relative z-0 w-full mb-5 group p-2">
        <input
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
          name="city"
          id="city"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="city"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Enter Your City
        </label>
      </div>
      {formik.errors.city && formik.touched.city && (
        <div className="mt-2 mb-4 p-3 text-red-500 rounded-lg bg-gray-700 dark:bg-gray-900">
          {formik.errors.city}
        </div>
      )}

      <fieldset className="mb-5">
        <legend className="text-slate-950 dark:text-slate-100 text-2xl mb-2 font-semibold">Payment Method</legend>
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="payCash"
            name="paymentMethod"
            value="payCash"
            checked={formik.values.paymentMethod === 'payCash'}
            onChange={formik.handleChange}
            className="mr-2"
          />
          <label htmlFor="payCash" className="text-gray-700 dark:text-gray-300">Pay Cash</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="payOnline"
            name="paymentMethod"
            value="payOnline"
            checked={formik.values.paymentMethod === 'payOnline'}
            onChange={formik.handleChange}
            className="mr-2"
          />
          <label htmlFor="payOnline" className="text-gray-700 dark:text-gray-300">Pay Online</label>
        </div>
        {formik.errors.paymentMethod && formik.touched.paymentMethod && (
          <div className="mt-2 p-3 text-red-500 rounded-lg bg-gray-700 dark:bg-gray-900">
            {formik.errors.paymentMethod}
          </div>
        )}
      </fieldset>

      <div className="flex justify-between items-center">
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-green-600 dark:hover:bg-green-700"
        >
          {isLoading ? 'Processing...' : 'Checkout'}
        </button>
        <div className="flex items-center">
          {isLoading && <div className="w-6 h-6 border-4 border-gray-300 border-t-transparent border-solid rounded-full animate-spin dark:border-gray-600"></div>}
        </div>
      </div>
    </form>
  );
}
