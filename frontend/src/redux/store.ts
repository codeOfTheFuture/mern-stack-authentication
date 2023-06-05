import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";

const rootReducer = combineReducers({
	auth: authReducer,
	[apiSlice.reducerPath]: apiSlice.reducer,
});

const store: ToolkitStore = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
