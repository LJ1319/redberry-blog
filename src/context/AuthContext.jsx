import { createContext, useState } from "react";

export const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
	const [isAuthorized, setIsAuthorized] = useState(false);

	const contextValue = {
		isAuthorized,
		setIsAuthorized,
	};

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
}
