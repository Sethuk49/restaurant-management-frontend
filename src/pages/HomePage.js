// src/pages/HomePage.js
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role === "restaurant_owner") {
      navigate("/restaurant/menu-items");
    } else if (role === "admin") {
      navigate("/restaurants");
    }
  })
  return (
    <></>
  );
};

export default HomePage;
