import { createApi } from "@reduxjs/toolkit/query/react";
import { serverBaseQuery } from "../utils/fetchBaseQuery";
import type { IAuthRegister } from "../types/auth/IAuthRegister";
import { serialize } from "object-to-formdata";
import type { IAuthLogin } from "../types/auth/IAuthLogin";

interface IAuthResponse {
    token: string | null;
}


export const apiAuth = createApi({
    reducerPath: "apiAuth",
    baseQuery: serverBaseQuery("Account"),
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
        }),
        login: builder.mutation<IAuthResponse, IAuthLogin>({
            query: (model) => {
                try {
                    return {
                        method: "POST", 
                        url: "login",
                        body: model
                    };
                } catch {
                    throw new Error("Помилка входу");
                }
            }
        }),
        loginByGoogle: builder.mutation<IAuthResponse, string>({
            query: (token) => ({
                url: 'googleLogin',
                method: 'POST',
                body: {token}
            })
        }),
    })
})

export const { 
    useRegisterMutation,
    useLoginMutation,
    useLoginByGoogleMutation
} = apiAuth;