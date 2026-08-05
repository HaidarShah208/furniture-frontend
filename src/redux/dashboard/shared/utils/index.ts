import type { baseApi } from "@/redux/baseApi";

type TagTypes = (typeof baseApi extends { reducerPath: string } ? never : never) extends never
  ? "Products" | "Product" | "Orders" | "Order" | "Categories" | "Category" | "Settings" | "Profile" | "Dashboard"
  : never;

export function provideListTags<
  TEntity extends TagTypes,
  TList extends TagTypes,
  T extends { id: string | number },
>(
  entityTag: TEntity,
  listTag: TList,
  result?: { data: T[] }
): ({ type: TEntity; id: string } | { type: TList })[] {
  if (!result?.data) return [{ type: listTag }];
  return [
    ...result.data.map(({ id }) => ({ type: entityTag, id: String(id) })),
    { type: listTag },
  ];
}

export function invalidateEntityTags<
  TEntity extends TagTypes,
  TList extends TagTypes,
>(
  entityTag: TEntity,
  listTag: TList,
  id?: string,
): ({ type: TEntity; id: string } | { type: TList })[] {
  if (id) return [{ type: entityTag, id }, { type: listTag }];
  return [{ type: listTag }];
}
