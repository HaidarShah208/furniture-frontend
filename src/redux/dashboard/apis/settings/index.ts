import { baseApi } from "@/redux/baseApi";
import type { Settings, UpdateSettingsRequest } from "@/types/admin/settings";
import type { ApiResponse } from "@/redux/dashboard/shared/types";

const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAll: builder.query<ApiResponse<Settings>, void>({
      query: () => "/admin/settings",
      providesTags: ["Settings"],
    }),
    update: builder.mutation<ApiResponse<Settings>, UpdateSettingsRequest>({
      query: (body) => ({
        url: "/admin/settings",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Settings"],
    }),
  }),
});

export const {
  useGetAllQuery: useGetSettingsQuery,
  useUpdateMutation: useUpdateSettingsMutation,
} = settingsApi;
