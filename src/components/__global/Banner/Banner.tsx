import { FC } from "react";

import { Banner as VKBanner } from "@vkontakte/vkui";

import Props from "./Banner.interface";

import "./Banner.scss";

const Banner: FC<Props> = ({
  before,
  header,
  subheader,
  actions,
  background,
  className,
}) => {
  return (
    <VKBanner
      mode={background ? "image" : "tint"}
      before={before}
      header={header}
      subheader={subheader}
      background={background}
      actions={actions}
      className={className}
    />
  );
};

export default Banner;
