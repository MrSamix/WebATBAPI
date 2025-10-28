import {fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import APP_ENV from "../env";

export const serverBaseQuery = (path: string) => {
    return fetchBaseQuery(
    {
        baseUrl: `${APP_ENV.API_URL}/api/${path}`
    })
}
