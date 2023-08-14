import { useEffect } from "react";
import { useRecoilState } from "recoil";

import {
  AppearanceProvider,
  AppRoot,
  ConfigProvider,
  usePlatform,
  withAdaptivity,
} from "@vkontakte/vkui";

import { SnackbarProvider } from "./components/__global";
import Navigation from "./Navigation";

import bridge from "@vkontakte/vk-bridge";
import { API } from "src/modules";
import { main, user } from "./storage/atoms";

const App = withAdaptivity(
  ({ viewWidth }) => {
    const [, updateMainCoil] = useRecoilState(main);
    const [, setStateUser] = useRecoilState(user);

    const platform = usePlatform();

    const isDesktop =
      (viewWidth && viewWidth > 3) ||
      new URLSearchParams(window.location.search).get("vk_platform") ===
        "desktop_web";

    useEffect(() => {
      getUser();

      updateMainCoil((prev) => ({
        ...prev,
        isDesktop,
        platform,
      }));
    }, []);

    const getUser = () => {
      bridge.send("VKWebAppGetUserInfo").then(async (res) => {
        let userInfo = await new API().initialize();
        setStateUser({ ...userInfo, user_id: res.id });
      });

      bridge.send("VKWebAppInit").then(() => console.log("VKWebAppInit"));
    };

    return (
      <ConfigProvider
        locale={"ru"}
        isWebView={false}
        appearance={"light"}
        platform={isDesktop ? "android" : platform}
      >
        <AppearanceProvider appearance={"light"}>
          <AppRoot mode="full" className={"mobile"}>
            <SnackbarProvider>
              <Navigation isDesktop={false} />
            </SnackbarProvider>
          </AppRoot>
        </AppearanceProvider>
      </ConfigProvider>
    );
  },
  {
    viewWidth: true,
  }
);

export default App;
