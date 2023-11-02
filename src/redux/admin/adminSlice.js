import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        signInAdminStart: (state) => {
            state.loading = true;
        },

        signInAdminSuccess: (state, action) => {
            state.currentUser = action.payload,
            state.loading = false,
            state.error = null;
        },
        signInAdminFailure: (state, action) => {
            state.error = action.payload,
            state.loading = false;
        },
        updateAdminStart: (state) => {
            state.loading = true;
        },
        updateAdminSuccess: (state, action) => {
            state.currentUser = action.payload,
            state.loading = false,
            state.error = null;
        },
        updateAdminFailure: (state, action) => {

            state.error = action.payload,
            state.loading = false;
        },
        signOutAdminStart: (state) => {
            state.loading = true;
        },
        signOutAdminSuccess: (state) => {
            state.currentUser = null,
            state.loading = false,
            state.error = null;
        },
        signOutAdminFailure: (state, action) => {
            state.error = action.payload,
            state.loading = false;
        },
    }
});

export const { 
    signInAdminStart,
    signInAdminSuccess,
    signInAdminFailure,
    updateAdminStart,
    updateAdminSuccess,
    updateAdminFailure,
    signOutAdminStart,
    signOutAdminSuccess,
    signOutAdminFailure
} = adminSlice.actions;

export default adminSlice.reducer;