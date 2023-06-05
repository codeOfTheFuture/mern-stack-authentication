import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
	userInfo: string | null;
}

const initialState: AuthState = {
	userInfo: localStorage.getItem("userInfo")
		? JSON.parse(localStorage.getItem("userInfo") as string)
		: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action): void => {
			state.userInfo = action.payload;
			localStorage.setItem("userInfo", JSON.stringify(action.payload));
		},
		clearCredentials: (state): void => {
			state.userInfo = null;
			localStorage.removeItem("userInfo");
		},
	},
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
