import { FC } from "react";
import { clsx } from "clsx";

import Props from "./Switch.interface.ts";

import "./Switch.scss";

const Switch: FC<Props> = ({ value, onToggle, className }) => {
  return (
    <div onClick={() => onToggle(!value)} className={clsx("Switch", className)}>
      <div
        style={{ left: value ? "20px" : 0 }}
        className={"Switch__round trans"}
      />
    </div>
  );
};

export default Switch;
