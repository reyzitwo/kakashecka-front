import { atom } from "recoil";

interface User {
  id: number;
  name: string;
  avatar: string;
}

interface topI {
  users: null | Array<User>;
  activeTab: 1 | 2 | 3;
}

const _ = atom<topI>({
  key: "topStorage",
  default: {
    users: null,
    activeTab: 1,
  },
});

export default _;
