import { FC } from "react";
import { clsx } from "clsx";

import { Spinner } from "@vkontakte/vkui";

import Props from "./Spinner.interface";

import "./Spinner.scss";

const CustomSpinner: FC<Props> = ({ size = "regular", className }) => {
  return (
    <div className={clsx("CustomSpinner", className)}>
      <Spinner size={size} />
    </div>
  );
};

export default CustomSpinner;
