import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInUserStart: (state) => {
            state.loading = true;
        },

        signInUserSuccess: (state, action) => {
            state.currentUser = action.payload,
            state.loading = false,
            state.error = null;
        },
        signInUserFailure: (state, action) => {
            state.error = action.payload,
            state.loading = false;
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload,
            state.loading = false,
            state.error = null;
        },
        updateUserFailure: (state, action) => {

            state.error = action.payload,
            state.loading = false;
        },
        signOutUserStart: (state) => {
            state.loading = true;
        },
        signOutUserSuccess: (state) => {
            state.currentUser = null,
            state.loading = false,
            state.error = null;
        },
        signOutUserFailure: (state, action) => {
            state.error = action.payload,
            state.loading = false;
        },
        resetUser: (state) => {
            state.currentUser = null,
            state.loading = false,
            state.error = null;
        }
    }
});

export const { 
    signInUserStart,
    signInUserSuccess,
    signInUserFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    signOutUserStart,
    signOutUserSuccess,
    signOutUserFailure,
    resetUser
} = userSlice.actions;

export default userSlice.reducer;