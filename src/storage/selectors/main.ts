import { selector } from "recoil";
import _, { snackbarType } from "src/storage/atoms/main";

export const getIsDesktop = selector({
  key: "getIsDesktop",
  get: ({ get }) => get(_).isDesktop,
});

export const getPlatform = selector({
  key: "getPlatform",
  get: ({ get }) => get(_).platform,
});

export const SelectorSnackbar = selector<snackbarType>({
  key: "snackbar",
  get: ({ get }) => get(_).snackbar,
  set: ({ set, get }, value) => {
    const old = get(_);

    // @ts-ignore
    set(_, { ...old, snackbar: value });
  },
});
