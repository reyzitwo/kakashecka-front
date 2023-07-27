import { FC } from "react";
import { clsx } from "clsx";

import { Avatar } from "@vkontakte/vkui";

import Props from "./Cell.interface";

import "./Cell.scss";

const Cell: FC<Props> = ({
  before,
  avatar,
  subheader,
  after,
  textSize = 1,
  onClick,
  className,
  children,
}) => {
  return (
    <div
      onClick={onClick}
      className={clsx("Cell", `Cell_text-size_${textSize}`, className)}
    >
      {before && <div className={"Cell__before"}>{before}</div>}

      {avatar && <Avatar src={avatar} size={38} className={"Cell__avatar"} />}

      <div className={"Cell__content"}>
        <b className={"Cell__header"}>{children}</b>
        {subheader && <div className={"Cell__subheader"}>{subheader}</div>}
      </div>

      {after && <div className={"Cell__after"}>{after}</div>}
    </div>
  );
};

export default Cell;
