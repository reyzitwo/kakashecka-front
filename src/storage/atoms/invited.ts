import { atom } from "recoil";

interface User {
  id: number;
  name: string;
  avatar: string;
}

type topI = null | Array<User>;

const _ = atom<topI>({
  key: "invitedStorage",
  default: null,
});

export default _;
