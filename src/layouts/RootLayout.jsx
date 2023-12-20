import Header from "@/components/layout/Header.jsx";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
	return (
		<div className="h-screen bg-[#f3f2fa]">
			<Header />
			<main className="bg-[#f3f2fa]">
				<Outlet />
			</main>
		</div>
	);
}
