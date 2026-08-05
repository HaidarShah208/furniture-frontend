import { baseApi } from "@/redux/baseApi";
import type { Category, CreateCategoryRequest, UpdateCategoryRequest } from "@/types/admin/category";
import type { ApiResponse } from "@/redux/dashboard/shared/types";
import { provideListTags, invalidateEntityTags } from "@/redux/dashboard/shared/utils";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAll: builder.query<ApiResponse<Category[]>, void>({
      query: () => "/admin/categories",
      providesTags: (result) => provideListTags("Category", "Categories", result),
    }),
    getById: builder.query<ApiResponse<Category>, string>({
      query: (id) => `/admin/categories/${id}`,
      providesTags: (_result, _err, id) => [{ type: "Category", id }],
    }),
    create: builder.mutation<ApiResponse<Category>, CreateCategoryRequest>({
      query: (body) => ({
        url: "/admin/categories",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidateEntityTags("Category", "Categories"),
    }),
    update: builder.mutation<ApiResponse<Category>, { id: string; data: UpdateCategoryRequest }>({
      query: ({ id, data }) => ({
        url: `/admin/categories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _err, { id }) => invalidateEntityTags("Category", "Categories", id),
    }),
    delete: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `/admin/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: invalidateEntityTags("Category", "Categories"),
    }),
  }),
});

export const {
  useGetAllQuery: useGetCategoriesQuery,
  useGetByIdQuery: useGetCategoryByIdQuery,
  useCreateMutation: useCreateCategoryMutation,
  useUpdateMutation: useUpdateCategoryMutation,
  useDeleteMutation: useDeleteCategoryMutation,
} = categoryApi;
