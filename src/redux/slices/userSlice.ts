import { AuthUser } from "@/typings/data";
import { createSlice } from "@reduxjs/toolkit"

interface initialStateInterface {
    user: AuthUser;
}

const initialState: initialStateInterface = {
    user: {},
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        /** Changes User Authentication State */
        setUser(state, action: {payload: AuthUser}) {
            state.user = action.payload;
        }
    }
});

export const {setUser} = userSlice.actions;

/** @returns {AuthUser} Authenticated User State */
export const selectUser = (state: {user: initialStateInterface}) => state.user.user;

export default userSlice;