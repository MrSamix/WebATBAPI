import { createApi } from "@reduxjs/toolkit/query/react";
import type { ICategoryItem } from "../types/category/ICategoryItem";
import {serverBaseQuery} from "../utils/fetchBaseQuery.ts";
import type {ICategoryCreate} from "../types/category/ICategoryCreate.ts";
import { serialize } from "object-to-formdata"


export const apiCategory = createApi({
    reducerPath: "apiCategory",
    tagTypes: ["Categories"],
    baseQuery: serverBaseQuery("Categories"),
        endpoints: (builder) => ({
            getCategories: builder.query<ICategoryItem[], void>({
                query: () => ({
                    url: "",
                    method: "GET"
                }),
                providesTags: ["Categories"] // Кещує категорії
            }),
            createCategory: builder.mutation<void, ICategoryCreate>({
                query: (model) => {
                    try {
                        const formData = serialize(model);
                        return {
                            method: "POST",
                            url: "",
                            body: formData
                        }
                    }
                    catch {
                        throw new Error("Помилка перетворення даних")
                    }
                },
                invalidatesTags: ["Categories"] // Перекешовує категорії
            }),
            deleteCategory: builder.mutation<void, number>({
                query: (id: number) => {
                    return {
                        url: `${id}`,
                        method: "DELETE"
                    }
                },
                invalidatesTags: ["Categories"],
            })
        })
});

export const {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useDeleteCategoryMutation
} = apiCategory;