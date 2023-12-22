import Header from "@/components/Header.jsx";
import { Outlet, ScrollRestoration } from "react-router-dom";

export default function RootLayout() {
	return (
		<div className="h-screen bg-[#f3f2fa] text-[#1A1A1F]">
			<Header />
			<main className="bg-[#f3f2fa]">
				<Outlet />
			</main>
			<ScrollRestoration />
		</div>
	);
}
