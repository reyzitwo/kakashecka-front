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
  const dataRouter: {
    type: "referral_invite" | "referral_player";
    data?: number;
  } = useRouterData();

  const [currentDataRouter] = useState(dataRouter);
  const [state, setState] = useRecoilState(stories);
  const userInfo = useRecoilValue(user);

  // костыль, TODO: поправить в роутере
  const [templates, setTemplates] = useState(
    state.templates[currentDataRouter.type]
  );

  useEffect(() => {
    if (templates) return;
    getTemplates();

    return () => {
      setState({ ...state, active: 0 });
    };
  }, []);

  const getTemplates = async () => {
    let response = await new API().stories.get({
      type: currentDataRouter.type,
    });

    setTemplates(response);
    setState({
      ...state,
      templates: { ...state.templates, [currentDataRouter.type]: response },
    });
  };

  const shareStories = async () => {
    if (!templates) return;
    let image: { url?: string; blob?: string } = {
      url: templates[state.active].url,
    };

    if (currentDataRouter.type === "referral_player") {
      let blob_image = await new API().stories.post({
        template_id: templates[state.active].id,
        user_id: currentDataRouter.data ?? 1,
      });

      image = { blob: `data:image/png;base64,${blob_image}` };
    }

    bridge
      .send("VKWebAppShowStoryBox", {
        ...image,
        background_type: "image",
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
          {templates.map((el, index) => (
            <div
              onClick={() => setState({ ...state, active: index })}
              className={clsx(
                "ShareStories-Templates__item",
                index === state.active && "ShareStories-Templates__item_active"
              )}
            >
              <img
                id={index === state.active ? "active" : ""}
                key={el.id}
                src={el.url}
                alt={""}
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
