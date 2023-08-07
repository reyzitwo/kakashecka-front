import { FC } from "react";

import { ModalCard } from "@vkontakte/vkui";
import { Button, Header } from "src/components/__global";
import { Icon12Clock } from "@vkontakte/icons";

import Props from "../modal.interface";

import "./ShareStories.scss";

const ShareStories: FC<Props> = ({ id, onClose }) => {
  return (
    <ModalCard
      id={id}
      onClose={onClose}
      actions={
        <Button
          size={"large"}
          before={<Icon12Clock height={20} width={20} />}
          stretched
          className={"ShareStories-Button"}
        >
          ОПУБЛИКОВАТЬ
        </Button>
      }
    >
      <Header size={"medium"} className={"ShareStories-Header"}>
        Выбор дизайна истории
      </Header>
    </ModalCard>
  );
};

export default ShareStories;
