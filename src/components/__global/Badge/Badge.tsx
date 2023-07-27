import { FC } from "react";
import { clsx } from "clsx";

import Props from "./Badge.interface";

import "./Badge.scss";

const Badge: FC<Props> = ({
  color = "white",
  mode = "circle",
  className,
  children,
}) => {
  return (
    <div
      className={clsx(
        "Badge",
        `Badge_color_${color}`,
        `Badge_mode_${mode}`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Badge;
