import { combineReducers, configureStore } from "@reduxjs/toolkit";

/** Auth Reducer */
import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";

const savedStateSlice = localStorage.getItem('reduxState');

/** Combine all Reducers into Single Reducer */
const rootReducer = combineReducers({
    auth: authSlice.reducer,
    user: userSlice.reducer,
});

const initialStateSlice = savedStateSlice ? JSON.parse(savedStateSlice) : authSlice.getInitialState();

/** Main Redux Store */
const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
        auth: initialStateSlice,
        user: userSlice.getInitialState()
    }
});

store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('reduxState', JSON.stringify(state.auth));
});

export default store;