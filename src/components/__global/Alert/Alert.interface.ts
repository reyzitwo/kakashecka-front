import { ReactNode } from "react";

export default interface AlertProps {
  id: string;
  header: string;
  isBack?: boolean;
  isDebounce?: boolean;
  className?: string;
  children: ReactNode;
}
