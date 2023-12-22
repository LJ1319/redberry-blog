import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

export default function Protected({ children }) {
	const { isAuthorized } = useContext(AuthContext);

	return isAuthorized ? children : <Navigate to="/" replace={true} />;
}
