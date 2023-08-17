import { ReactNode } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useRouterModal } from "@kokateam/router-vkminiapps";

import { Snackbar } from "@vkontakte/vkui";
import {
  Icon24ErrorCircleFillRed,
  Icon24CheckCircleFilledBlue,
} from "@vkontakte/icons";

import { SelectorSnackbar } from "src/storage/selectors/main";
import { user } from "src/storage/atoms";

interface SnackbarProviderI {
  children: ReactNode;
}

const icons = {
  error: <Icon24ErrorCircleFillRed />,
  success: <Icon24CheckCircleFilledBlue />,
  warning: <Icon24ErrorCircleFillRed fill={"#FFFFFF"} />,
};

export default function SnackbarProvider({ children }: SnackbarProviderI) {
  const [modal] = useRouterModal();

  const userInfo = useRecoilValue(user);
  const [state, setState] = useRecoilState(SelectorSnackbar);

  return (
    <>
      {children}

      {state && userInfo.notifications && (
        <Snackbar
          before={icons[state.status]}
          onClose={() => setState(null)}
          duration={5 * 1000}
          className={modal || "vkuiSnackbar_padding"}
        >
          {state.text}
        </Snackbar>
      )}
    </>
  );
}
