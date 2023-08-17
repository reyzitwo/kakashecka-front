import { atom } from "recoil";

interface UserI {
  id: number;
  user_id: number;
  name: string;
  avatar: string;
  contamination: number;
  poop_count: number;
  toilet_paper: number;
  notifications: boolean;
}

const _ = atom<UserI>({
  key: "userStorage",
  default: {
    id: 0,
    user_id: 0,
    name: "",
    avatar: "",
    contamination: 0,
    poop_count: 0,
    toilet_paper: 0,
    notifications: false,
  },
});

export default _;
