import { createSlice } from "@reduxjs/toolkit"

interface initialStateInterface {
    isLoggedIn: boolean;
    token?: string;
}

const initialState: initialStateInterface = {
    isLoggedIn: false,
    token: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        /** Changes User Authentication State */
        setIsLoggedIn(state, action: {payload: {isLoggedIn: boolean; token?: string;}}) {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token ?? '');
        }
    }
});

export const {setIsLoggedIn} = authSlice.actions;

/** @returns {boolean} User Authentication State */
export const selectIsLoggedIn = (state: {auth: initialStateInterface}) => state.auth.isLoggedIn;

/** @returns {string} Auth Token */
export const selectToken = (state: {auth: initialStateInterface}) => state.auth.token;

export default authSlice;