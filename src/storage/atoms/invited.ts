import { atom } from "recoil";

interface User {
  id: number;
  user_id: number;
  name: string;
  avatar: string;
}

interface topI {
  referrals: Array<User>;
  count: number;
}

const _ = atom<topI | null>({
  key: "invitedStorage",
  default: null,
});

export default _;
