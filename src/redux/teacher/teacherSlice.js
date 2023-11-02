import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false
};

const teacherSlice = createSlice({
    name: 'teacher',
    initialState,
    reducers: {
        signInTeacherStart: (state) => {
            state.loading = true;
        },

        signInTeacherSuccess: (state, action) => {
            state.currentUser = action.payload,
            state.loading = false,
            state.error = null;
        },
        signInTeacherFailure: (state, action) => {
            state.error = action.payload,
            state.loading = false;
        },
        updateTeacherStart: (state) => {
            state.loading = true;
        },
        updateTeacherSuccess: (state, action) => {
            state.currentUser = action.payload,
            state.loading = false,
            state.error = null;
        },
        updateTeacherFailure: (state, action) => {

            state.error = action.payload,
            state.loading = false;
        },
        signOutTeacherStart: (state) => {
            state.loading = true;
        },
        signOutTeacherSuccess: (state) => {
            state.currentUser = null,
            state.loading = false,
            state.error = null;
        },
        signOutTeacherFailure: (state, action) => {
            state.error = action.payload,
            state.loading = false;
        },
    }
});

export const { 
    signInTeacherStart,
    signInTeacherSuccess,
    signInTeacherFailure,
    updateTeacherStart,
    updateTeacherSuccess,
    updateTeacherFailure,
    signOutTeacherStart,
    signOutTeacherSuccess,
    signOutTeacherFailure
} = teacherSlice.actions;

export default teacherSlice.reducer;