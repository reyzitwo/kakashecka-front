import { FC } from "react";
import { useRouterData } from "@kokateam/router-vkminiapps";

import { ModalCard, Avatar } from "@vkontakte/vkui";
import { Button, Balance } from "src/components/__global";
import { ImgToiletPaper, SvgDirty } from "src/assets/img";

import Props from "../modal.interface";

import "./UserProfile.scss";

const UserProfile: FC<Props> = ({ id, onClose }) => {
  const dataRouter = useRouterData();

  return (
    <ModalCard
      id={id}
      icon={<Avatar src={dataRouter?.avatar} size={80} />}
      header={dataRouter?.name}
      subheader={`ID: ${dataRouter?.id}`}
      actions={
        <>
          <Button size={"large"} before={<img src={ImgToiletPaper} alt={""} />}>
            Украсть бумагу
          </Button>

          <Button size={"large"} background={"orange"} before={<SvgDirty />}>
            Испачкать
          </Button>
        </>
      }
      onClose={onClose}
    >
      <Balance balance={21221} className={"UserProfile-Balance"} />
    </ModalCard>
  );
};

export default UserProfile;
