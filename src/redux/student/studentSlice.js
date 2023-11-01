import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false
};

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        signInStudentStart: (state) => {
            state.loading = true;
        },

        signInStudentSuccess: (state, action) => {
            state.currentUser = action.payload,
            state.loading = false,
            state.error = null;
        },
        signInStudentFailure: (state, action) => {
            state.error = action.payload,
            state.loading = false;
        },
        updateStudentStart: (state) => {
            state.loading = true;
        },
        updateStudentSuccess: (state, action) => {
            state.currentUser = action.payload,
            state.loading = false,
            state.error = null;
        },
        updateStudentFailure: (state, action) => {

            state.error = action.payload,
            state.loading = false;
        },
        signOutStudentStart: (state) => {
            state.loading = true;
        },
        signOutStudentSuccess: (state) => {
            state.currentUser = null,
            state.loading = false,
            state.error = null;
        },
        signOutStudentFailure: (state, action) => {
            state.error = action.payload,
            state.loading = false;
        },
    }
});

export const { 
    signInStudentStart,
    signInStudentSuccess,
    signInStudentFailure,
    updateStudentStart,
    updateStudentSuccess,
    updateStudentFailure,
    signOutStudentStart,
    signOutStudentSuccess,
    signOutStudentFailure
} = studentSlice.actions;

export default studentSlice.reducer;