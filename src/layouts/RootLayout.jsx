import Header from "@/components/Header.jsx";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { classNames } from "@/helpers.js";

export default function RootLayout() {
	const location = useLocation();

	return (
		<div
			className={classNames(
				location.pathname === "/create" ? "bg-[#fbfaff]" : "bg-[#f3f2fa]",
				"h-screen text-[#1A1A1F]",
			)}
		>
			<Header />
			<main
				className={classNames(
					location.pathname === "/create" ? "bg-[#fbfaff]" : "bg-[#f3f2fa]",
					"py-20",
				)}
			>
				<Outlet />
			</main>
			<ScrollRestoration />
		</div>
	);
}
