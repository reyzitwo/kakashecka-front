import { atom } from "recoil";

type shopI = Array<{
  id: number;
  title: string;
  items: Array<{
    id: number;
    title: string;
    description: string;
    price: number;
    max_count: number;
    count: number;
    photo_url: string;
  }>;
}>;

const _ = atom<shopI | null>({
  key: "shopStorage",
  default: null,
});

export default _;
