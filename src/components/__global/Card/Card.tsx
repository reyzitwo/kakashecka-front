import { FC } from "react";
import { clsx } from "clsx";

import { Button } from "../";
import ImgToiletPaper from "src/assets/png/toilet_paper.png";

import Props from "./Card.interface";

import "./Card.scss";

const Card: FC<Props> = ({
  id,
  image,
  header,
  subheader,
  price,
  className,
}) => {
  return (
    <div key={id} className={clsx("Card", className)}>
      <img src={image} alt={""} className={"Card__img"} />

      <b className={"Card__header"}>{header}</b>
      <div className={"Card__subheader"}>{subheader}</div>

      <Button after={<img src={ImgToiletPaper} alt={""} />}>{price}</Button>
    </div>
  );
};

export default Card;
