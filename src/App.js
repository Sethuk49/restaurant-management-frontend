// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { lazy } from 'react';
import Restaurants from './pages/restaurants/index'
import ViewRestaurant from './pages/restaurants/viewRestaurant';
import MenuItems from './pages/menu-items';
import Logout from './pages/auth/Logout';
import HomePage from './pages/HomePage';
import MenuItemEdit from './pages/menu-items/edit';
import MenuItemCreate from './pages/menu-items/create';
import OwnerProfile from './pages/restaurant-owner-profile/profile';
import UploadImages from './pages/restaurant-owner-profile/upload-images';
import UploadForm from './pages/restaurant-owner-profile/upload-images';
import RestaurantImages from './pages/restaurant-owner-profile/restaurant-images';
import Home from './pages/home';
import RestaurantView from './pages/home/view';
import Orders from './pages/orders';
import Registration from './pages/auth/Registration';
import RestaurantRegistration from './pages/restaurants/registration';

import LoginPage from './pages/auth/LoginPage';

import UnauthorizedPage from './pages/UnauthorizedPage';
import NotFoundPage from './pages/NotFoundPage';
import RestaturantOrders from './pages/restaurants/orders';
import RestaturantReviews from './pages/restaurants/reviews';
import RestaurantReviews from './pages/restaurants/restaurant-reviews';


// const Restaurants = lazy(() => import('./pages/restaurants/index'));
// const ViewRestaurant = lazy(() => import('./pages/restaurants/viewRestaurant'));



function App() {
  return (
    <Router>
      <Routes>

        <Route
          path="/"
          element={
            <ProtectedRoute roleRequired={["admin", "restaurant_owner"]}>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/restaurants"
          element={
            <ProtectedRoute roleRequired={["admin"]}>
              <Layout>
                <Restaurants />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/restaurant/view/:id"
          element={
            <ProtectedRoute roleRequired={["admin"]}>
              <Layout>
                <ViewRestaurant />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/restaurant/review/:id"
          element={
            <ProtectedRoute roleRequired={["admin"]}>
              <Layout>
                <RestaurantReviews />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Restaurant Owner Routes */}
        <Route
          path="/restaurant/menu-items"
          element={
            <ProtectedRoute roleRequired={["restaurant_owner"]}>
              <Layout>
                <MenuItems />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/restaurant/menu-item/create"
          element={
            <ProtectedRoute roleRequired={["restaurant_owner"]}>
              <Layout>
                <MenuItemCreate />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/restaurant/menu-item/edit/:id"
          element={
            <ProtectedRoute roleRequired={["restaurant_owner"]}>
              <Layout>
                <MenuItemEdit />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/restaurant-owner/profile"
          element={
            <ProtectedRoute roleRequired={["restaurant_owner"]}>
              <Layout>
                <OwnerProfile />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/restaurant/images"
          element={
            <ProtectedRoute roleRequired={["restaurant_owner"]}>
              <Layout>
                <RestaurantImages />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/restaurant/upload"
          element={
            <ProtectedRoute roleRequired={["restaurant_owner"]}>
              <Layout>
                <UploadForm />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/restaurant/order"
          element={
            <ProtectedRoute roleRequired={["restaurant_owner"]}>
              <Layout>
                <RestaturantOrders />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/restaurant/reviews"
          element={
            <ProtectedRoute roleRequired={["restaurant_owner"]}>
              <Layout>
                <RestaturantReviews />
              </Layout>
            </ProtectedRoute>
          }
        />


        <Route
          path="/my-orders"
          element={
            <ProtectedRoute roleRequired={["user"]}>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route path='/home' element={<Home />} />
        <Route path='/view-restaurant/:id' element={<RestaurantView />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<Registration />} />
        <Route path='/resaturant-registration' element={<RestaurantRegistration />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path='/logout' element={<Logout />} />
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </Router>
  );
}

export default App;
