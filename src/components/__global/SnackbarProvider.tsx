import { ReactNode } from "react";
import { useRecoilState } from "recoil";

import { Snackbar } from "@vkontakte/vkui";
import {
  Icon24ErrorCircleFillRed,
  Icon24CheckCircleFilledBlue,
} from "@vkontakte/icons";

import { SelectorSnackbar } from "src/storage/selectors/main";

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

  return (
    <>
      {children}

      {state && (
        <Snackbar
          before={icons[state.status]}
          onClose={() => setState(null)}
          duration={60 * 1000}
        >
          {state.text}
        </Snackbar>
      )}
    </>
  );
}
