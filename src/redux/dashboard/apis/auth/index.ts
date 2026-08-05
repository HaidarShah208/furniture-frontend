import { baseApi } from "@/redux/baseApi";
import type { LoginRequest, LoginResponse, AdminProfile } from "@/types/admin/auth";
import type { ApiResponse } from "@/redux/dashboard/shared/types";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<LoginResponse>, LoginRequest>({
      query: (body) => ({
        url: "/admin/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
    getProfile: builder.query<ApiResponse<AdminProfile>, void>({
      query: () => "/admin/profile",
      providesTags: ["Profile"],
    }),
  }),
});

export const { useLoginMutation, useGetProfileQuery } = authApi;
