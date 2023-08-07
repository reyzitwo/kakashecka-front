import { ReactNode } from "react";

export default interface BannerProps {
  before?: ReactNode;
  header: string;
  subheader: string;
  actions: ReactNode;
  background?: ReactNode;
  className?: string;
}
