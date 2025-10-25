import { useContext, useEffect } from "react";
import type { ICategoryItem } from "../../../types/category/ICategoryItem";
import CategoryRow from "./CategoryRow";
import { Link } from "react-router";
import { CategoriesContext, type CategoriesContextType } from "../../../context/CategoriesContext";

const CategoriesListPage = () => {

    const { categories, requestCategories } = useContext(CategoriesContext) as CategoriesContextType;

    useEffect(() => {
        requestCategories();
    }, []);



    return(
        <>
            <div className="flex justify-between mx-10 my-4">
                <div></div>
                <h1 className={"text-4xl font-extrabold text-center"}>Список категорій</h1>
                <Link to="/create" type="button" className="align-middle focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">+</Link>
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
                        {categories.map((category: ICategoryItem) =>
                            <CategoryRow key={category.id} category={category} />
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default CategoriesListPage;