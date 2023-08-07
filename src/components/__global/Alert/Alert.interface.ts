import { ReactNode } from "react";

export default interface AlertProps {
  header: string;
  className?: string;
  children: ReactNode;
}
