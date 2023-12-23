import { useAuth } from "@/context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

export default function Protected({ children }) {
	const { isAuthorized } = useAuth();

	return isAuthorized ? children : <Navigate to="/" replace={true} />;
}
