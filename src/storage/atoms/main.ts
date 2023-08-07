import { atom } from "recoil";

interface mainI {
  isDesktop: boolean;
  platform: string;
  closingAlert: boolean;
}

const _ = atom<mainI>({
  key: "mainStorage",
  default: {
    isDesktop: false,
    platform: "",
    closingAlert: false,
  },
});

export default _;
