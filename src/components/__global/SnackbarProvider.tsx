import { ReactNode, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useRouterModal, useRouterPopout } from "@kokateam/router-vkminiapps";

import { Snackbar } from "@vkontakte/vkui";
import {
  Icon24ErrorCircleFillRed,
  Icon24CheckCircleFilledBlue,
} from "@vkontakte/icons";

import { SelectorSnackbar } from "src/storage/selectors/main";

declare global {
  interface Window {
    setSnackbar: (options: {
      status: "error" | "success" | "warning";
      text: string;
    }) => void;
  }
}

interface SnackbarProviderI {
  children: ReactNode;
}

const icons = {
  error: <Icon24ErrorCircleFillRed />,
  success: <Icon24CheckCircleFilledBlue />,
  warning: <Icon24ErrorCircleFillRed fill={"#FFFFFF"} />,
};

export default function SnackbarProvider({ children }: SnackbarProviderI) {
  const [state, setState] = useRecoilState(SelectorSnackbar);

  const [modal] = useRouterModal();
  const [popout] = useRouterPopout();

  useEffect(() => {
    window.setSnackbar = setState; // для API
  }, []);

  return (
    <>
      {children}

      {state && (
        <Snackbar
          before={icons[state.status]}
          onClose={() => setState(null)}
          duration={5 * 1000}
          className={popout || modal ? "popout" : "vkuiSnackbar_padding"}
        >
          {state.text}
        </Snackbar>
      )}
    </>
  );
}
