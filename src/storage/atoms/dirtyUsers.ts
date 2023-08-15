import { atom } from "recoil";
import { DirtyUsersGetResponse } from "src/modules/api/interfaces/response";

const _ = atom<DirtyUsersGetResponse | null>({
  key: "dirtyUsersStorage",
  default: null,
});

export default _;
