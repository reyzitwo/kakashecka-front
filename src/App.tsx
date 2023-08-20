import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useRouterSettings } from "@kokateam/router-vkminiapps";

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

    const [, setSettings] = useRouterSettings();

    const platform = usePlatform();

    const isDesktop =
      (viewWidth && viewWidth > 3) ||
      new URLSearchParams(window.location.search).get("vk_platform") ===
        "desktop_web";

    useEffect(() => {
      bridge.subscribe(({ detail: { type } }) => {
        if (type === "VKWebAppUpdateConfig")
          bridge.send("VKWebAppSetViewSettings", {
            status_bar_style: "dark",
            action_bar_color: "#f6f7f9",
            navigation_bar_color: "#f6f7f9",
          });
      });
    }, []);

    useEffect(() => {
      getUser();

      setSettings({ isSwipeBack: false });
      updateMainCoil((prev) => ({
        ...prev,
        isDesktop,
        platform,
      }));
    }, []);

    const getUser = async () => {
      const referrer_id = Number(window.location.href.split("#")[1]);
      let userInfo = await new API().initialize(
        referrer_id ? { referrer_id: referrer_id } : undefined
      );
      setStateUser(userInfo);

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
