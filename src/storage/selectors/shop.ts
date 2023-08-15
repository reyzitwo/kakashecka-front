import { selector } from "recoil";
import _ from "src/storage/atoms/shop";

export const SelectorShopInventory = selector({
  key: "getShopInventory",
  get: ({ get }) => {
    const state = get(_);
    if (!state) return null;
    const filteredItems = state?.flatMap((itemGroup) =>
      itemGroup.items.filter((item) => item.count > 0 && item.id !== 4)
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

    console.log(newState);

    // @ts-ignore
    set(_, newState);
  },
});
