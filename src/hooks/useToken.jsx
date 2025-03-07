import { useEffect, useState } from "react";

/**
 * Custom hook to retrieve and manage token from localStorage.
 * @returns {{ token: string | null, isAuthenticated: boolean }}
 */
export const useToken = () => {
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        try {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error("Error accessing localStorage:", error);
        }
    }, []);

    return { token, isAuthenticated };
};
