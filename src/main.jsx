import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";

import RootLayout from "@/layouts/RootLayout.jsx";
import Error from "@/routes/Error.jsx";
import Blogs, { loader as blogsLoader } from "@/routes/Blogs.jsx";
import BlogDetails from "@/routes/BlogDetails.jsx";
import Create from "@/routes/Create.jsx";
import { action as loginAction } from "@/components/LoginForm.jsx";

import "./axios/global.js";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path="/"
			element={<RootLayout />}
			errorElement={<Error />}
			action={loginAction}
		>
			<Route errorElement={<Error />}>
				<Route index="true" element={<Blogs />} loader={blogsLoader} />
				<Route path="blogs/:id" element={<BlogDetails />} />
				<Route path="create" element={<Create />} />
			</Route>
		</Route>,
	),
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
