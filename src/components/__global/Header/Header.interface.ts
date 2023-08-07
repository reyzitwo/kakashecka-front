import { ReactNode } from "react";

export default interface HeaderProps {
  size?: "small" | "medium";
  badge?: ReactNode;
  children: ReactNode;
  className?: string;
}
