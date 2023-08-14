import { atom } from "recoil";

export type snackbarType = {
  status: "error" | "success" | "warning";
  text: string;
} | null;

interface mainI {
  isDesktop: boolean;
  platform: string;
  closingAlert: boolean;
  snackbar: snackbarType;
}

const _ = atom<mainI>({
  key: "mainStorage",
  default: {
    isDesktop: false,
    platform: "",
    closingAlert: false,
    snackbar: null,
  },
});

export default _;
