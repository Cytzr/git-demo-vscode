import { useQuery, UseQueryOptions, useSuspenseQuery, UseSuspenseQueryOptions } from "@tanstack/react-query";
import { fetchAuthUser } from "../../api/auth";

export const useGetUserDataSuspenseQuery = (AuthorizationCode: string, options?: UseSuspenseQueryOptions) =>
    useSuspenseQuery({
        //Set cache within the "user-data" query key
        queryKey: ["user-data"],
        queryFn: () => fetchAuthUser(AuthorizationCode),
        ...options
    });

export const useGetUserDataQuery = (AuthorizationCode: string, options?: UseQueryOptions) =>
    useQuery({
        //Set cache within the "user-data" query key
        queryKey: ["user-data"],
        queryFn: () => fetchAuthUser(AuthorizationCode),
        ...options
    });