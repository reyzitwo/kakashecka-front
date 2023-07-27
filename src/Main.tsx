import { render } from "react-dom";

import { AdaptivityProvider } from "@vkontakte/vkui";
import { RouterRoot } from "@kokateam/router-vkminiapps";

import App from "./App";

import "./assets/css/global.scss";

render(
  <RouterRoot>
    <AdaptivityProvider>
      <App />
    </AdaptivityProvider>
  </RouterRoot>,
  document.getElementById("root")
);
