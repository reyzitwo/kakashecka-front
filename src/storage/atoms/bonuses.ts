import { atom } from "recoil";
import { BonusesGetResponse } from "src/modules/api/interfaces/response";

const _ = atom<BonusesGetResponse | null>({
  key: "bonusesStorage",
  default: null,
});

export default _;
