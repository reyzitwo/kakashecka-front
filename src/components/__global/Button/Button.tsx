import { FC } from "react";
import { clsx } from "clsx";

import Props from "./Button.interface";

import "./Button.scss";

const Button: FC<Props> = ({
  background = "blue",
  before,
  after,
  size = "default",
  onClick,
  className,
  stretched = false,
  disabled = false,
  children = "Click me!",
}) => {
  return (
    <button
      onClick={() => {
        if (disabled) return;
        onClick && onClick();
      }}
      className={clsx(
        "Button",
        [stretched && "Button_stretched"],
        [!disabled && "Button_effects"],
        `Button_background_${background}`,
        `Button_size_${size}`,
        className
      )}
    >
      {before && <div className={"Button__before"}>{before}</div>}
      {children}
      {after && <div className={"Button__after"}>{after}</div>}
    </button>
  );
};

export default Button;
