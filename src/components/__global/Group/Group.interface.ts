import { ReactNode } from "react";

export default interface GroupProps {
  paddingLevel?: 1 | 2;
  header?: {
    text: string;
    mode: "left" | "center";
    background: "blue" | "orange";
    className?: string;
  };
  className?: string;
  classNameContent?: string;
  children: ReactNode;
}
