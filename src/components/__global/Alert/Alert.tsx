import { FC } from "react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useRouterBack } from "@kokateam/router-vkminiapps";

import { clsx } from "clsx";

import { PopoutWrapper } from "@vkontakte/vkui";
import { Header } from "src/components/__global/index";
import { Icon24Dismiss } from "@vkontakte/icons";

import Props from "./Alert.interface";

import { main } from "src/storage/atoms";

import "./Alert.scss";

const Alert: FC<Props> = ({ header, className, children }) => {
  const [state, setState] = useRecoilState(main);
  const toBack = useRouterBack();

  const timeout = state.platform === "ios" ? 300 : 200;

  useEffect(() => {
    return () => {
      setState((prev) => ({ ...prev, closingAlert: false }));
    };
  }, []);

  const closeAlert = () => {
    close();

    setState((prev) => ({ ...prev, closingAlert: true }));
    setTimeout(() => {
      toBack(-1);
    }, timeout);
  };

  return (
    <PopoutWrapper closing={state.closingAlert} onClick={closeAlert}>
      <div
        className={clsx("Alert", [
          state.closingAlert && "vkuiAlert--closing",
          className,
        ])}
      >
        <Header size={"medium"} className={"Alert__header"}>
          {header}

          <div onClick={closeAlert} className={"Alert__close"}>
            <Icon24Dismiss />
          </div>
        </Header>

        <div className={"Alert__content"}>{children}</div>
      </div>
    </PopoutWrapper>
  );
};

export default Alert;
