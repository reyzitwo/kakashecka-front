import { FC } from "react";
import { clsx } from "clsx";

import { Cell } from "../";
import ImgToiletPaper from "src/assets/img/toilet_paper.png";

import Props from "./Balance.interface";

import "./Balance.scss";

const Balance: FC<Props> = ({ balance, className }) => {
  return (
    <Cell
      before={<img src={ImgToiletPaper} alt={""} />}
      subheader={balance.toLocaleString("ru")}
      className={clsx("Balance", className)}
    >
      Баланс
    </Cell>
  );
};

export default Balance;
