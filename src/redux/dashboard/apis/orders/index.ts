import { baseApi } from "@/redux/baseApi";
import type { Order, UpdateOrderStatusRequest } from "@/types/admin/order";
import type { PaginationParams } from "@/types/admin/pagination";
import type { ApiResponse, PaginatedResponse } from "@/redux/dashboard/shared/types";
import { provideListTags, invalidateEntityTags } from "@/redux/dashboard/shared/utils";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAll: builder.query<PaginatedResponse<Order[]>, PaginationParams>({
      query: (params) => ({
        url: "/admin/orders",
        params,
      }),
      providesTags: (result) => provideListTags("Order", "Orders", result),
    }),
    getById: builder.query<ApiResponse<Order>, string>({
      query: (id) => `/admin/orders/${id}`,
      providesTags: (_result, _err, id) => [{ type: "Order", id }],
    }),
    update: builder.mutation<ApiResponse<Order>, { id: string; data: UpdateOrderStatusRequest }>({
      query: ({ id, data }) => ({
        url: `/admin/orders/${id}/status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _err, { id }) => invalidateEntityTags("Order", "Orders", id),
    }),
  }),
});

export const {
  useGetAllQuery: useGetOrdersQuery,
  useGetByIdQuery: useGetOrderByIdQuery,
  useUpdateMutation: useUpdateOrderStatusMutation,
} = orderApi;
