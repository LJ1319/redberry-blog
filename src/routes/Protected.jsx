import { useAuth } from "@/context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Protected({ children }) {
	const { isAuthorized } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthorized) {
			navigate("/");
		}
	}, [isAuthorized, navigate]);

	return children;
}
