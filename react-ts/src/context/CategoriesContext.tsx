import { createContext, useState } from "react";
import type { ICategoryItem } from "../types/category/ICategoryItem";
import api from "../api";

// Context
export interface CategoriesContextType {
    categories: ICategoryItem[];
    requestCategories: () => Promise<void>;
}
export const CategoriesContext = createContext<CategoriesContextType | null>(null);



// Provider
interface CategoriesProviderProps {
    children: React.ReactNode;
}

export const CategoriesProvider = ({ children }: CategoriesProviderProps) => {
    const [categories, setCategories] = useState<ICategoryItem[]>([])

    const requestCategories = async () => {
        try {
            const response = await api.get<ICategoryItem[]>(`Categories`)
            const { data } = response
            setCategories(data);
        } catch (error) {
            console.error("Problem working requestCategories", error)
        }
    }

    return (
        <CategoriesContext.Provider value={{categories, requestCategories}}>
            {children}
        </CategoriesContext.Provider>
    );
};
