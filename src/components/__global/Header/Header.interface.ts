import { ReactNode } from "react";

export default interface HeaderProps {
  badge: ReactNode;
  children: ReactNode;
  className?: string;
}
