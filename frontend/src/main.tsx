import React from "react";
import ReactDOM from "react-dom/client";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import App from "./App.tsx";
import HomePage from "./pages/HomePage.tsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index={true} path="/" element={<HomePage />} />
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
