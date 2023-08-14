import { FC, useEffect, useState } from "react";
import { useRouterData } from "@kokateam/router-vkminiapps";
import { useRecoilState, useRecoilValue } from "recoil";
import { clsx } from "clsx";

import { ModalCard } from "@vkontakte/vkui";
import { Button, Header, Spinner } from "src/components/__global";
import { Icon12Clock } from "@vkontakte/icons";

import bridge from "@vkontakte/vk-bridge";
import { API } from "src/modules";
import { stories, user } from "src/storage/atoms";

import Props from "../modal.interface";

import "./ShareStories.scss";

const ShareStories: FC<Props> = ({ id, onClose }) => {
  const typeTemplates: "referral_invite" | "referral_player" = useRouterData();
  const [state, setState] = useRecoilState(stories);
  const userInfo = useRecoilValue(user);

  // костыль, TODO: поправить в роутере
  const [templates, setTemplates] = useState(state.templates[typeTemplates]);

  useEffect(() => {
    if (templates) return;
    getTemplates();
  }, []);

  const getTemplates = async () => {
    let response = await new API().stories.get({ type: typeTemplates });

    setTemplates(response);
    setState({
      ...state,
      templates: { ...state.templates, [typeTemplates]: response },
    });
  };

  const shareStories = () => {
    if (!templates) return;

    bridge
      .send("VKWebAppShowStoryBox", {
        background_type: "image",
        url: templates[state.active].url,
        attachment: {
          text: "open",
          type: "url",
          url: `https://vk.com/app51710990#${userInfo.user_id}`,
        },
      })
      .then(() => {});
  };

  return (
    <ModalCard
      id={id}
      onClose={onClose}
      actions={
        <Button
          size={"large"}
          before={<Icon12Clock height={20} width={20} />}
          stretched
          onClick={shareStories}
          className={"ShareStories-Button"}
        >
          ОПУБЛИКОВАТЬ
        </Button>
      }
    >
      <Header size={"medium"} className={"ShareStories-Header"}>
        Выбор дизайна истории
      </Header>

      {templates ? (
        <div className={"ShareStories-Templates"}>
          {templates.map((el) => (
            <div
              className={clsx(
                "ShareStories-Templates__item",
                el.id === state.active && "ShareStories-Templates__item_active"
              )}
            >
              <img
                id={el.id === state.active ? "active" : ""}
                key={el.id}
                src={el.url}
                alt={""}
                onClick={() => setState({ ...state, active: el.id })}
              />
            </div>
          ))}
        </div>
      ) : (
        <Spinner />
      )}
    </ModalCard>
  );
};

export default ShareStories;
