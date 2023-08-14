import * as Icons from "./svg";
import { PopoutMore } from "src/components/__popouts";

export default [
  {
    id: "top",
    title: "Топ",
    icon: <Icons.IconTop />,
  },
  {
    id: "dirty",
    title: "Испачкать",
    icon: <Icons.IconDirty />,
  },
  {
    id: "profile",
    title: "Профиль",
    icon: <Icons.IconProfile />,
  },
  {
    id: "shop",
    title: "Магазин",
    icon: <Icons.IconShop />,
  },
  {
    popout: <PopoutMore />,
    title: "Еще",
    icon: <Icons.IconMore />,
  },
];
