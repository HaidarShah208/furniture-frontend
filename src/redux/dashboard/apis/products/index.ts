import { baseApi } from "@/redux/baseApi";
import type { Product, CreateProductRequest, UpdateProductRequest } from "@/types/admin/product";
import type { PaginationParams } from "@/types/admin/pagination";
import type { ApiResponse, PaginatedResponse } from "@/redux/dashboard/shared/types";
import { provideListTags, invalidateEntityTags } from "@/redux/dashboard/shared/utils";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAll: builder.query<PaginatedResponse<Product[]>, PaginationParams>({
      query: (params) => ({
        url: "/admin/products",
        params,
      }),
      providesTags: (result) => provideListTags("Product", "Products", result),
    }),
    getById: builder.query<ApiResponse<Product>, string>({
      query: (id) => `/admin/products/${id}`,
      providesTags: (_result, _err, id) => [{ type: "Product", id }],
    }),
    create: builder.mutation<ApiResponse<Product>, CreateProductRequest>({
      query: (body) => ({
        url: "/admin/products",
        method: "POST",
        body,
      }),
      invalidatesTags: invalidateEntityTags("Product", "Products"),
    }),
    update: builder.mutation<ApiResponse<Product>, { id: string; data: UpdateProductRequest }>({
      query: ({ id, data }) => ({
        url: `/admin/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _err, { id }) => invalidateEntityTags("Product", "Products", id),
    }),
    delete: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `/admin/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: invalidateEntityTags("Product", "Products"),
    }),
  }),
});

export const {
  useGetAllQuery: useGetProductsQuery,
  useGetByIdQuery: useGetProductByIdQuery,
  useCreateMutation: useCreateProductMutation,
  useUpdateMutation: useUpdateProductMutation,
  useDeleteMutation: useDeleteProductMutation,
} = productApi;
