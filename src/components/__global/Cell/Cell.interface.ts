import { ReactNode } from "react";

export default interface CellProps {
  before?: ReactNode;
  avatar?: string;
  subheader?: string;
  after?: ReactNode;
  textSize?: 1 | 2;
  onClick?: () => void;

  className?: string;
  children: ReactNode;
}
