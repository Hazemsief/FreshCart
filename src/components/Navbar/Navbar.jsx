import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';

export default function NavBar() {
  
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode')) || false;
    setDarkMode(savedDarkMode);
    document.documentElement.classList.toggle('dark', savedDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode)); 
  };

  const { accessToken, setaccessToken } = useContext(AuthContext);
  const { numOfCartItems } = useContext(CartContext);

  function handleLogout() {
    localStorage.removeItem('accessToken');
    setaccessToken(null);
  }

  return (
    <nav className="bg-gray-100 border-gray-200 top-0 left-0 right-0 py-2 dark:bg-gray-900 dark:text-white z-50">
      <div className='container mx-auto flex flex-col lg:flex-row items-center justify-between py-2'>
        <div className='flex flex-col lg:flex-row items-center space-x-4'>
          <img src={Logo} width={110} alt="Fresh cart logo" />
          <ul className='flex flex-col lg:flex-row items-center space-x-4'>
            {accessToken !== null ? <>
              <li className='py-2'>
                <NavLink
                  to='/'
                  className={({ isActive }) => `mx-2 py-2 text-lg ${isActive ? 'text-green-400 dark:text-green-400' : 'text-slate-900 dark:text-white'}`}
                >
                  Home
                </NavLink>
              </li>
              <li className='py-2'>
                <NavLink
                  to='/products'
                  className={({ isActive }) => `mx-2 py-2 text-lg ${isActive ? 'text-green-400 dark:text-green-400' : 'text-slate-900 dark:text-white'}`}
                >
                  Products
                </NavLink>
              </li>
              <li className='py-2'>
                <NavLink
                  to='/wishlists'
                  className={({ isActive }) => `mx-2 py-2 text-lg ${isActive ? 'text-green-400 dark:text-green-400' : 'text-slate-900 dark:text-white'}`}
                >
                  Wishlist
                </NavLink>
              </li>
              <li className='py-2'>
                <NavLink
                  to='/brands'
                  className={({ isActive }) => `mx-2 py-2 text-lg ${isActive ? 'text-green-400 dark:text-green-400' : 'text-slate-900 dark:text-white'}`}
                >
                  Brands
                </NavLink>
              </li>
              <li className='py-2'>
                <NavLink
                  to='/catagories'
                  className={({ isActive }) => `mx-2 py-2 text-lg ${isActive ? 'text-green-400 dark:text-green-400' : 'text-slate-900 dark:text-white'}`}
                >
                  Categories
                </NavLink>
              </li>
              <li className='py-2'>
                <NavLink
                  to='/cart'
                  className={({ isActive }) => `mx-2 py-2 text-lg ${isActive ? 'text-green-400 dark:text-green-400' : 'text-slate-900 dark:text-white'}`}
                >
                  <button type="button" className="relative inline-flex items-center p-3 text-sm font-medium text-center text-slate-950 bg-green-400 rounded-lg hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-green-500 dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    <i className='fas fa-cart-shopping fa-1x'></i>
                    <span className="sr-only">Cart</span>
                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-sm font-bold text-slate-950 border-2 border-red-200 rounded-full -top-5 -end-5 dark:border-white dark:text-white">
                      {numOfCartItems}
                    </div>
                  </button>
                </NavLink>
              </li>
            </> : null}
          </ul>
        </div>
        <div className='flex flex-col lg:flex-row items-center space-x-4'>
          <ul className='flex flex-col lg:flex-row items-center space-x-4'>
            {accessToken === null ? <>
              <li className='py-2'>
                <NavLink
                  to='/login'
                  className={({ isActive }) => `mx-2 py-2 text-lg ${isActive ? 'text-green-400 dark:text-green-400' : 'text-slate-900 dark:text-white'}`}
                >
                  Login
                </NavLink>
              </li>
              <li className='py-2'>
                <NavLink
                  to='/register'
                  className={({ isActive }) => `mx-2 py-2 text-lg ${isActive ? 'text-green-400 dark:text-green-400' : 'text-slate-900 dark:text-white'}`}
                >
                  Register
                </NavLink>
              </li>
            </>
            : <li className='py-2'>
              <NavLink
                to='/login'
                onClick={handleLogout}
                className={({ isActive }) => `mx-2 py-2 text-lg ${isActive ? 'text-green-400 dark:text-green-400' : 'text-slate-900 dark:text-white'}`}
              >
                Logout
              </NavLink>
            </li>
            }
            <li className='py-2 flex items-center space-x-2'>
              <i className='fab fa-facebook text-xl'></i>
              <i className='fab fa-twitter text-xl'></i>
              <i className='fab fa-instagram text-xl'></i>
              <i className='fab fa-youtube text-xl'></i>
            </li>
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 dark:text-gray-400"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m8-8a9 9 0 100 18 9 9 0 000-18z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m8-8a9 9 0 100 18 9 9 0 000-18z"
                  />
                </svg>
              )}
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
}
