import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
	const [isAuthorized, setIsAuthorized] = useState(false);

	const contextValue = {
		isAuthorized,
		setIsAuthorized,
	};

	useEffect(() => {
		const isAuthorizedData = JSON.parse(localStorage.getItem("isAuthorized"));

		if (isAuthorizedData) {
			setIsAuthorized(isAuthorizedData);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("isAuthorized", JSON.stringify(isAuthorized));
	}, [isAuthorized]);

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
}
