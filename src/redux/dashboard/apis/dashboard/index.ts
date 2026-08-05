import { baseApi } from "@/redux/baseApi";
import type { Order } from "@/types/admin/order";
import type { Product } from "@/types/admin/product";
import type { PaginatedResponse } from "@/redux/dashboard/shared/types";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecentOrders: builder.query<PaginatedResponse<Order[]>, void>({
      query: () => ({
        url: "/admin/orders",
        params: { page: 1, limit: 100 },
      }),
      providesTags: ["Dashboard", "Orders"],
    }),
    getAllProducts: builder.query<PaginatedResponse<Product[]>, void>({
      query: () => ({
        url: "/admin/products",
        params: { page: 1, limit: 100 },
      }),
      providesTags: ["Dashboard", "Products"],
    }),
  }),
});

export const {
  useGetRecentOrdersQuery,
  useGetAllProductsQuery,
} = dashboardApi;
