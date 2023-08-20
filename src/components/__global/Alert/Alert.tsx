import { FC, useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useRouterBack } from "@kokateam/router-vkminiapps";

import { clsx } from "clsx";

import { PopoutWrapper } from "@vkontakte/vkui";
import { Header } from "src/components/__global/index";
import { Icon24Dismiss } from "@vkontakte/icons";

import Props from "./Alert.interface";

import { main } from "src/storage/atoms";

import "./Alert.scss";

declare global {
  interface Window {
    closeAlert: () => void;
  }
}

const Alert: FC<Props> = ({
  id,
  header,
  isBack,
  isDebounce,
  className,
  children,
}) => {
  const [state, setState] = useRecoilState(main);
  const toBack = useRouterBack();

  const timeout = state.platform === "ios" ? 300 : 200;

  const [debounce, setDebounce] = useState(!isDebounce);

  useEffect(() => {
    window.closeAlert = closeAlert;

    document.getElementsByClassName(
      "vkuiPopoutRoot__popout PopoutRoot__popout"
    )[0].id = id;

    // костыль, алерт дергается из-за смены его положения
    setTimeout(() => {
      setDebounce(true);
    }, 1);

    return () => {
      setState((prev) => ({ ...prev, closingAlert: false }));
    };
  }, []);

  const closeAlert = () => {
    setState((prev) => ({ ...prev, closingAlert: true }));
    setTimeout(() => {
      toBack(-1);
    }, timeout);
  };

  return (
    <PopoutWrapper closing={state.closingAlert} onClick={closeAlert}>
      {debounce && (
        <div
          className={clsx("Alert", [
            state.closingAlert && "vkuiAlert--closing",
            className,
          ])}
        >
          <Header size={"medium"} className={"Alert__header"}>
            {header}

            {isBack && (
              <div onClick={closeAlert} className={"Alert__close"}>
                <Icon24Dismiss />
              </div>
            )}
          </Header>

          <div className={"Alert__content"}>{children}</div>
        </div>
      )}
    </PopoutWrapper>
  );
};

export default Alert;
