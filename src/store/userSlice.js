// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: '',
        email: '',
        mobile_number: '',
        role: ''
    },
    reducers: {
        setUser: (state, action) => {
            state.name = action?.payload?.name;
            state.email = action?.payload?.email;
            state.mobile_number = action?.payload?.mobile_number;
            state.role = action?.payload?.role
        },
        clearUser: (state) => {
            state.name = '';
            state.email = '';
            state.mobile_number = '';
            state.role = '';
        },
    },
});

// Export the actions
export const { setUser, clearUser } = userSlice.actions;

// Export the reducer to be used in the store
export default userSlice.reducer;
