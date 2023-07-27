import { FC } from "react";
import { clsx } from "clsx";

import { Badge } from "src/components/__global/";

import Props from "./Header.interface";

import "./Header.scss";

const Header: FC<Props> = ({ badge, className, children }) => {
  return (
    <div className={clsx("Header", className)}>
      {children} <Badge>{badge}</Badge>
    </div>
  );
};

export default Header;
