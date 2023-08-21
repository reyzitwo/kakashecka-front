import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";
import { useRouterModal } from "@kokateam/router-vkminiapps";

import { Placeholder } from "@vkontakte/vkui";
import { Button, Cell, Header, Spinner } from "src/components/__global";
import { Icon24UserAdd, Icon12Clock, Icon20Story } from "@vkontakte/icons";

import bridge from "@vkontakte/vk-bridge";
import { user, invited } from "src/storage/atoms";
import { SelectorSnackbar } from "src/storage/selectors/main";
import { API } from "src/modules";

import "./Dirty.scss";

const Dirty = () => {
  const [, toModal] = useRouterModal();

  const userInfo = useRecoilValue(user);
  const [state, setState] = useRecoilState(invited);
  const [, setSnackbar] = useRecoilState(SelectorSnackbar);

  useEffect(() => {
    if (!state) {
      getUsers();
    }
  }, []);

  const getUsers = async () => {
    const referrals = await new API().referrals();
    setState(referrals);
  };

  const copyLink = () => {
    bridge
      .send("VKWebAppCopyText", {
        text: `https://vk.com/app51710990#${userInfo.user_id}`,
      })
      .then(() =>
        setSnackbar({ status: "success", text: "Ссылка скопирована" })
      );
  };

  return (
    <>
      <Cell
        before={
          <Button disabled>
            <Icon24UserAdd height={18} width={18} />
          </Button>
        }
        subheader={`https://vk.com/app51710990#${userInfo.user_id}`}
        after={
          <Button background={"orange"} onClick={() => copyLink()}>
            Копировать
          </Button>
        }
        className={"Dirty_referral-link"}
      >
        Реферальная ссылка
      </Cell>

      <Button
        before={<Icon12Clock height={20} width={20} />}
        size={"large"}
        stretched
        onClick={() => toModal("shareStories", { type: "referral_invite" })}
        className={"Dirty_share-story mt10"}
      >
        Поделиться в истории
      </Button>

      <Header badge={state?.count}>Приглашенные игроки</Header>

      {state ? (
        state.referrals.length === 0 ? (
          <Placeholder>У вас нет приглашенных игроков</Placeholder>
        ) : (
          state.referrals.map((element) => (
            <Cell
              key={element.id}
              after={
                <Button
                  onClick={() => {
                    toModal("shareStories", {
                      type: "referral_player",
                      data: element.user_id,
                    });
                  }}
                  className={"Dirty__button-share-user"}
                >
                  <Icon20Story />
                </Button>
              }
              avatar={element.avatar}
              textSize={2}
            >
              {element.name}
            </Cell>
          ))
        )
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Dirty;
