import { useContext } from "react";
import type { ICategoryItem } from "../../../types/category/ICategoryItem";
import CategoryRow from "./CategoryRow";
import { Link } from "react-router";
import { ThemeContext, type ThemeContextType } from "../../../context/ThemeContext";
import { useGetCategoriesQuery } from "../../../services/apiCategory";

const CategoriesListPage = () => {
    const {data: categories} = useGetCategoriesQuery();
    const { theme, changeTheme } = useContext(ThemeContext) as ThemeContextType;

    // const { categories, requestCategories } = useContext(CategoriesContext) as CategoriesContextType;

    // useEffect(() => {
    //     requestCategories();
    // }, []);



    return(
        <>
            <div className="flex justify-between mx-10 my-4">
                <button type="button" className="cursor-pointer text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5" onClick={changeTheme}>
                    {theme === "light" ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    )}
                </button>
                <h1 className={"text-4xl font-extrabold text-center dark:text-white"}>Список категорій</h1>
                <div className="flex gap-2">
                    <Link to="/register" type="button" className="align-middle focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z" clipRule="evenodd"/>
                        </svg>
                    </Link>
                    <Link to="/create" type="button" className="align-middle focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">+</Link>
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Фото
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Назва
                            </th>
                            <th scope="col" className="py-3">
                                Дії
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories?.map((category: ICategoryItem) =>
                            <CategoryRow key={category.id} category={category} />
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default CategoriesListPage;