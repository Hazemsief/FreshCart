import React, { useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Catagories from './components/Catagories/Catagories';
import Brands from './components/Brands/Brands';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Products from './components/products/products';
import Notfound from './components/Notfound/Notfound';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/productDetails/productDetails';
import AuthContextProvider from './context/AuthContext';
import CartContextProvider from './context/CartContext';
import WishlistContextProvider from './context/wishListContext';
import toast, { Toaster } from 'react-hot-toast';
import Wishlists from './components/Wishlists/wishlists';
import BrandDetails from './components/BrandDetails/BrandDetails';
import CheckOut from './components/CheckOut/CheckOut';
import AllOrders from './components/AllOrders/AllOrders';

let Routing = createBrowserRouter([
{
    path: '',
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'Catagories', element: <ProtectedRoute><Catagories /></ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'Wishlists', element: <ProtectedRoute><Wishlists /></ProtectedRoute> },
      { path: 'productDetails/:id/:catagory', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: 'BrandDetails', element: <ProtectedRoute> <BrandDetails/></ProtectedRoute>},
      { path: 'CheckOut', element: <ProtectedRoute> <CheckOut/></ProtectedRoute>},
      { path: 'AllOrders', element: <ProtectedRoute> <AllOrders/></ProtectedRoute>},
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'ForgetPassword', element: <ForgetPassword /> },
      { path: '*', element: <Notfound /> },
    ]
  }
]);

function App() {
  return (
    <>
      <AuthContextProvider>
        <CartContextProvider>
          <WishlistContextProvider>
            <RouterProvider router={Routing} />
            <Toaster />
          </WishlistContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
