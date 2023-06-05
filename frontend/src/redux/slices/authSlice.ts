import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserInfo {
	_id: string;
	name: string;
	email: string;
	password: string;
}

export interface AuthState {
	userInfo: UserInfo | null;
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
		setCredentials: (state, action: PayloadAction<UserInfo>): void => {
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
