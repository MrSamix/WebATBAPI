import { createContext, useEffect, useState } from "react";

// Context
export interface ThemeContextType {
    theme: "light" | "dark";
    changeTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


// Provider
interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const getInitialTheme = (): "light" | "dark" => {
        const stored = localStorage.getItem("theme");
        if (stored === "light" || stored === "dark") {
            return stored;
        }
        if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark";
        }
        return "light";
    };

    const [theme, setTheme] = useState<"light" | "dark">(() => getInitialTheme());

    const changeTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    useEffect(() => {
        // Sync the HTML class and persist selection
        document.documentElement.classList.toggle('dark', theme === 'dark');
        try {
            localStorage.setItem('theme', theme);
        } catch {
            // ignore persistence errors
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
