import { configureStore } from "@reduxjs/toolkit";
import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";

import authReducer from "./slices/authSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware) => getDefaultMiddleware(),
	devTools: true,
});

export default store;
