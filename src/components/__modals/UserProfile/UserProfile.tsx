import { useRecoilState } from "recoil";
import { FC, useState } from "react";
import { useRouterData } from "@kokateam/router-vkminiapps";

import { ModalCard, Avatar } from "@vkontakte/vkui";
import { Button, Balance } from "src/components/__global";
import { ImgToiletPaper, SvgDirty } from "src/assets/img";

import Props from "../modal.interface";

import { API, declOfNum } from "src/modules";
import { dirtyUsers, user, top } from "src/storage/atoms";
import { SelectorSnackbar } from "src/storage/selectors/main";

import "./UserProfile.scss";

const UserProfile: FC<Props> = ({ id, onClose }) => {
  const dataRouter = useRouterData();
  const api = new API();

  const [state, setState] = useState(dataRouter);
  const [stateTop, setTop] = useRecoilState(top);
  const [stateUser, setStateUser] = useRecoilState(user);
  const [stateDirty, setDirty] = useRecoilState(dirtyUsers);
  const [, setSnackbar] = useRecoilState(SelectorSnackbar);

  const theft = async () => {
    const response = await api.theft({ user_id: state.user_id });
    if (!response) return;

    const tops = { balance: null, contamination: null, purity: null };
    const currentUserPaper =
      state.toilet_paper - (response.toilet_paper - stateUser.toilet_paper);

    // @ts-ignore
    Object.keys(tops).map((el: typeof stateTop.activeTab) => {
      //@ts-ignore
      tops[el] = updateToiletPaperById(
        el,
        state.id,
        currentUserPaper,
        response.toilet_paper
      );
    });

    setTop({ ...stateTop, ...tops });
    setState({ ...state, toilet_paper: currentUserPaper });

    setSnackbar({
      status: "success",
      text: `Вы успешно украли ${declOfNum(
        response.toilet_paper - stateUser.toilet_paper,
        ["туалетную бумагу", "туалетные бумаги", "туалетных бумаг"]
      )}`,
    });
    setStateUser({ ...stateUser, toilet_paper: response.toilet_paper });
  };

  const dirty = async () => {
    const response = await api.dirtyUsers.dirty({ user_id: state.user_id });
    if (!response) return;

    setDirty(stateDirty ? [...stateDirty, response] : null);
    setSnackbar({ status: "success", text: "Успешно!" });
  };

  const updateToiletPaperById = (
    tab: typeof stateTop.activeTab,
    userId: number,
    newToiletPaper: number,
    newToilerPaperUser: number
  ) => {
    if (!stateTop[tab]) return null;

    const updatedTop = stateTop[tab]?.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          toilet_paper: newToiletPaper,
        };
      }

      if (user.id === stateUser.id) {
        return {
          ...user,
          toilet_paper: newToilerPaperUser,
        };
      }

      return user;
    });

    if (tab === "balance" && updatedTop) {
      // Сортировка пользователей по toilet_paper в порядке убывания
      updatedTop.sort((a, b) => b.toilet_paper - a.toilet_paper);
    }

    return updatedTop;
  };

  const openVKProfile = (user_id: number) => {
    window.open(`https://vk.com/id${user_id}`);
  };

  return (
    <ModalCard
      id={id}
      icon={
        <Avatar
          src={state?.avatar}
          size={80}
          onClick={() => openVKProfile(state.user_id)}
        />
      }
      header={
        <div onClick={() => openVKProfile(state.user_id)}>{state?.name}</div>
      }
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
