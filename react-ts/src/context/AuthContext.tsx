import { createContext, useState } from "react";
import type { IAuthItem } from "../types/auth/IAuthItem";
import { jwtDecode } from "jwt-decode";

// Context
export interface AuthContextType {
    token: string | null;
    user: IAuthItem | null;
    login: (token: string) => void;
    logout: () => void;
    loadFromLocalStorage: () => void;
    getUserFromToken: (token: string) => IAuthItem | null;
    getUserFromTokenAndSetUser: (token: string) => void;
    isLoggedIn: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);


// Provider
interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<IAuthItem | null>(null);

    const login = (newToken: string) => {
        setToken(newToken);
        saveToLocalStorage(newToken);
        getUserFromTokenAndSetUser(newToken);
    };


    const getUserFromTokenAndSetUser = (token: string) => {
        console.log("test decode:", getUserFromToken(token));
        setUser(getUserFromToken(token));
    }


    const getUserFromToken = (token: string): IAuthItem | null => {
    try {
        const decoded: any = jwtDecode(token);
        let roles: string[] = [];
        const rawRoles = decoded["roles"] ?? decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        if (typeof rawRoles === "string") {
            roles = [rawRoles];
        } else if (Array.isArray(rawRoles)) {
            roles = rawRoles;
        }

        return {
            name: decoded["name"] ?? decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ?? "",
            email: decoded["email"] ?? decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] ?? "",
            image: decoded["image"] ?? "",
            token,
            roles
        };
    } catch (e) {
        console.error("Invalid token", e);
        return null;
    }
};


    const saveToLocalStorage = (token: string) => {
        localStorage.setItem("authToken", token);
    }

    const loadFromLocalStorage = () => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setToken(token);
            getUserFromTokenAndSetUser(token);
        }
    }

    const logout = () => {
        setToken(null);
        localStorage.removeItem("authToken");
    };

    const isLoggedIn = token !== null;

    return (
        <AuthContext.Provider value={{ token, user, login, logout, loadFromLocalStorage, getUserFromToken, getUserFromTokenAndSetUser, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};
