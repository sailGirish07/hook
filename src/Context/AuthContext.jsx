import { createContext, useState, useMemo, useCallback } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("loggedInUser");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = useCallback((userData) => {
        localStorage.setItem("loggedInUser", JSON.stringify(userData));
        setUser(userData);
    }, []);

    const authcontextValue = useMemo(() => {
        return {
            user,
            login,
            isAuthenticated: user ? true : false,
        };
    }, [user, login]);

    return (
        <AuthContext.Provider value={authcontextValue}>
            {children}
        </AuthContext.Provider>
    );
}
