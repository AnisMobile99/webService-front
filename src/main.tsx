import React from "react";
import ReactDOM from "react-dom/client";
import Dashboard from "./views/Dashboard.tsx";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "./views/SignIn.tsx";

export const MainLayout: React.FC = () => {
	return <Outlet />;
};

const router = createBrowserRouter([
	{
		element: <MainLayout />,
		// errorElement: <Error />,
		children: [
			{
				path: "/",
				element: <SignIn />,
			},
			{
				path: "/dashboard",
				element: <Dashboard />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
