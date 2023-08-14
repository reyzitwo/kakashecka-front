import { atom } from "recoil";
import { TopResponse } from "src/modules/api/interfaces/response";

interface topI {
  balance: null | Array<TopResponse>;
  contamination: null | Array<TopResponse>;
  purity: null | Array<TopResponse>;
  activeTab: "balance" | "contamination" | "purity";
}

const _ = atom<topI>({
  key: "topStorage",
  default: {
    balance: null,
    contamination: null,
    purity: null,
    activeTab: "balance",
  },
});

export default _;
