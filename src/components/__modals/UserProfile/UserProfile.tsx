import { useRecoilState } from "recoil";
import { FC, useState } from "react";
import { useRouterData } from "@kokateam/router-vkminiapps";

import { ModalCard, Avatar } from "@vkontakte/vkui";
import { Button, Balance } from "src/components/__global";
import { ImgToiletPaper, SvgDirty } from "src/assets/img";

import Props from "../modal.interface";

import { API } from "src/modules";
import { user } from "src/storage/atoms";
import { SelectorSnackbar } from "src/storage/selectors/main";

import "./UserProfile.scss";

const UserProfile: FC<Props> = ({ id, onClose }) => {
  const dataRouter = useRouterData();
  const api = new API();

  const [state] = useState(dataRouter);
  const [stateUser, setStateUser] = useRecoilState(user);
  const [, setSnackbar] = useRecoilState(SelectorSnackbar);

  const theft = async () => {
    const response = await api.theft({ user_id: state.user_id });
    if (!response) {
      return setSnackbar({ status: "error", text: "Ошибка" });
    }

    setStateUser({ ...stateUser, toilet_paper: response.toilet_paper });
  };

  const dirty = async () => {
    const response = await api.dirtyUsers.dirty({ user_id: state.user_id });
    if (!response) {
      return setSnackbar({ status: "error", text: "Ошибка" });
    }
  };

  return (
    <ModalCard
      id={id}
      icon={<Avatar src={state?.avatar} size={80} />}
      header={state?.name}
      subheader={`ID: ${state?.id}`}
      actions={
        state.id !== stateUser.id && (
          <>
            <Button
              size={"large"}
              before={<img src={ImgToiletPaper} alt={""} />}
              onClick={theft}
            >
              Украсть бумагу
            </Button>

            <Button
              size={"large"}
              background={"orange"}
              before={<SvgDirty />}
              onClick={dirty}
            >
              Испачкать
            </Button>
          </>
        )
      }
      onClose={onClose}
    >
      <Balance balance={state.toilet_paper} className={"UserProfile-Balance"} />
    </ModalCard>
  );
};

export default UserProfile;
