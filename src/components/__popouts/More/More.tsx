import { useRecoilState } from "recoil";

import { Alert, Cell, Switch } from "src/components/__global";
import * as Icons from "./svg";

import bridge from "@vkontakte/vk-bridge";
import { API } from "src/modules";

import { user } from "src/storage/atoms";

import "./More.scss";

const More = ({}) => {
  const [notifications, setNotification] = useRecoilState(user);

  const toggleNotifications = async (value: boolean) => {
    await bridge.send(
      value ? "VKWebAppAllowNotifications" : "VKWebAppDenyNotifications"
    );

    await new API().profile.patch({ notifications: value });
    setNotification({ ...notifications, notifications: value });
  };

  return (
    <Alert id={"more"} header={"Ещё"} isDebounce>
      <Cell before={<Icons.Group />} subheader={"Наше официальное сообщество"}>
        Открыть паблик
      </Cell>

      <Cell
        before={<Icons.Notifications />}
        subheader={"Всплывающие уведомления"}
        after={
          <Switch
            value={notifications.notifications}
            onToggle={toggleNotifications}
          />
        }
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
