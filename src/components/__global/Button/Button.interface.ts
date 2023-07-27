import { ReactNode } from "react";

export default interface ButtonProps {
  background?: "white" | "blue" | "green" | "orange" | "gray";
  before?: ReactNode;
  after?: ReactNode;
  onClick?: () => void;
  size?: "small" | "default" | "large";
  stretched?: boolean;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}
