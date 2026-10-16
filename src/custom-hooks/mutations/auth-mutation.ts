import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { UserCredential } from "../../types/auth";
import { fetchAuthUser } from "../../api/auth";

// export const useGetUserDataMutation = (options?: UseMutationOptions<UserCredential, unknown, string>) =>
//     useMutation({
//         mutationFn: (AuthorizationCode: string) => fetchAuthUser(AuthorizationCode),
//         ...options,
//         onSuccess
//     });

// export default function useUserAuth() {
//     const queryClient = useQueryClient();
//     const useGetUserDataMutation = (options?: UseMutationOptions<UserCredential, unknown, string>) =>
//         useMutation({
//             mutationFn: (AuthorizationCode: string) => fetchAuthUser(AuthorizationCode),
//             ...options,
//             onSuccess: () => {
//                 //Set cache within the "user-data" query key
//                 queryClient.invalidateQueries({ queryKey: ["user-data"] });
//             }
//         });
//     return { useGetUserDataMutation };
// }

export const useGetUserDataMutation = (options?: UseMutationOptions<UserCredential, unknown, string>) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (AuthorizationCode: string) => fetchAuthUser(AuthorizationCode),
        ...options,
        onSuccess: () => {
            //Set cache within the "user-data" query key
            queryClient.invalidateQueries({ queryKey: ["user-data"] });
        }
    });
}