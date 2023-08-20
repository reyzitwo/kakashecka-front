import { FC } from "react";
import { clsx } from "clsx";

import Props from "./Group.interface";

import "./Group.scss";

const Group: FC<Props> = ({
  paddingLevel = 1,
  header,
  className,
  classNameContent,
  children,
}) => {
  return (
    <div
      className={clsx(
        "Group",
        `Group_padding-level_${paddingLevel}`,
        className
      )}
    >
      {header && (
        <div
          className={clsx(
            "Group__header",
            `Group__header_mode_${header.mode}`,
            `Group__header_background_${header.background}`,
            header.className
          )}
        >
          {header.text}
        </div>
      )}

      <div
        className={clsx("Group__content", [
          header && `Group__content_padding-top_${paddingLevel}`,
          classNameContent,
        ])}
      >
        {children}
      </div>
    </div>
  );
};

export default Group;
