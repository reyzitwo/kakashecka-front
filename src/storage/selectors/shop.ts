import { selector } from "recoil";
import _ from "src/storage/atoms/shop";
import { ShopItemsGetResponse } from "src/modules/api/interfaces/response.ts";

// @ts-ignore
export const SelectorShopInventory = selector<ShopItemsGetResponse["items"]>({
  key: "getShopInventory",
  get: ({ get }) => {
    const state = get(_);
    if (!state) return null;
    const filteredItems = state?.flatMap((itemGroup) =>
      itemGroup.items
        .filter((item) => item.count > 0 && item.id !== 4)
        .map((item) => ({ ...item, sectionId: itemGroup.id }))
    );

    return filteredItems;
  },
  // @ts-ignore
  set: ({ get, set }, value: { id: number; count: number }) => {
    const state = get(_);
    const newState = state?.map((itemGroup) => {
      const newItemGroup = [...itemGroup.items];
      const itemIndex = newItemGroup.findIndex((item) => item.id === value.id);

      if (itemIndex !== -1) {
        newItemGroup[itemIndex] = {
          ...newItemGroup[itemIndex],
          count: newItemGroup[itemIndex].count + value.count,
        };
      }
      return { ...itemGroup, items: newItemGroup };
    });

    // @ts-ignore
    set(_, newState);
  },
});
