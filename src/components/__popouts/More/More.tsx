import { useState } from "react";

import { Alert, Cell, Switch } from "src/components/__global";
import * as Icons from "./svg";

import bridge from "@vkontakte/vk-bridge";

import "./More.scss";

const More = ({}) => {
  const [notifications, setNotification] = useState(false);

  const toggleNotifications = (value: boolean) => {
    bridge
      .send(value ? "VKWebAppAllowNotifications" : "VKWebAppDenyNotifications")
      .then(() => {
        setNotification(value);
      });
  };

  return (
    <Alert id={"more"} header={"Ещё"} isDebounce>
      <Cell before={<Icons.Group />} subheader={"Наше официальное сообщество"}>
        Открыть паблик
      </Cell>

      <Cell
        before={<Icons.Notifications />}
        subheader={"Всплывающие уведомления"}
        after={<Switch value={notifications} onToggle={toggleNotifications} />}
      >
        Уведомления
      </Cell>

      <Cell before={<Icons.Game />} subheader={"Манул о том как играть"}>
        Как играть?
      </Cell>

      <Cell
        before={<Icons.Support />}
        subheader={"Остались вопросы ? – Задайте их нам."}
      >
        Поддержка
      </Cell>
    </Alert>
  );
};

export default More;
