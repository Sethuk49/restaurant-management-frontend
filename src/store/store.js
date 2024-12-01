// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

// Create the Redux store and combine the slices
const store = configureStore({
    reducer: {
        user: userReducer, //user slice
    },
});

export default store;
