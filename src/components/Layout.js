// src/components/Layout.js

import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  const role = localStorage.getItem("role");
  return (
    <div className="h-screen overflow-hidden flex flex-col bg-gray-200">
      {/* Header */}
      <header className="h-[7%] bg-purple-400 text-white p-4 shadow-lg">
        <nav className="container mx-auto flex justify-between items-center">
          {/* Logo or Brand Name */}
          <div className="text-2xl font-bold">
            <Link to="/">Restaurant Management</Link>
          </div>

          {/* Navigation Links */}
          <ul className="hidden md:flex space-x-6">
            {role === "admin" &&
              <li>
                <Link to="/" className="hover:text-gray-300">Restaurants</Link>
              </li>
            }
            {
              role === "restaurant_owner" &&
              <li>
                <Link to="/" className="hover:text-gray-300">Menu Items</Link>
              </li>
            }
            {
              role === "restaurant_owner" &&
              <li>
                <Link to="/restaurant-owner/profile" className="hover:text-gray-300">Profile</Link>
              </li>
            }

            {
              role === "restaurant_owner" &&
              <li>
                <Link to="/restaurant/images" className="hover:text-gray-300">Restaurant Images</Link>
              </li>
            }


            {
              role === "restaurant_owner" &&
              <li>
                <Link to="/restaurant/order" className="hover:text-gray-300">Orders</Link>
              </li>
            }

            {
              role === "restaurant_owner" &&
              <li>
                <Link to="/restaurant/reviews" className="hover:text-gray-300">Reviews</Link>
              </li>
            }

            <li>
              <Link to="/logout" className="hover:text-gray-300">Logout</Link>
            </li>
          </ul>

          {/* Mobile Menu (Hamburger Icon) */}
          <div className="md:hidden">
            <button className="text-white focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content: Set it to flex-grow to fill remaining space */}
      <main className="h-[88%] p-4 overflow-auto">
        {children} {/* Render the content of the page */}
      </main>

      {/* Footer */}
      <footer className="h-[5%] bg-purple-400 text-white text-center p-4">
        <p>&copy; 2024 My Website. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
