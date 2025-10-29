import { createApi } from "@reduxjs/toolkit/query/react";
import { serverBaseQuery } from "../utils/fetchBaseQuery";
import type { IAuthRegister } from "../types/auth/IAuthRegister";
import { serialize } from "object-to-formdata";

export const apiAuth = createApi({
    reducerPath: "apiAuth",
    baseQuery: serverBaseQuery("Auth"),
    endpoints: (builder) => ({
        register: builder.mutation<string|null, IAuthRegister>({
            query: (model) => {
                try {
                    const formData = serialize(model);
                    return {
                        method: "POST",
                        url: "register",
                        body: formData
                    };
                } catch {
                    throw new Error("Помилка реєстрації");
                }
            }
        })
    })
})

export const { 
    useRegisterMutation 
} = apiAuth;