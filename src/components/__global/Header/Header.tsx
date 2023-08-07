import { FC } from "react";
import { clsx } from "clsx";

import { Badge } from "src/components/__global/";

import Props from "./Header.interface";

import "./Header.scss";

const Header: FC<Props> = ({ size = "small", badge, className, children }) => {
  return (
    <div className={clsx("Header", `Header_size_${size}`, className)}>
      {children} {badge && <Badge>{badge}</Badge>}
    </div>
  );
};

export default Header;
