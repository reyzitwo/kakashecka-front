import { ReactNode } from "react";

export default interface BadgeProps {
  color?: "white" | "blue";
  mode?: "circle" | "vertical";
  children: ReactNode;
  className?: string;
}
