import { useRouterPopout, useRouterView } from "@kokateam/router-vkminiapps";

import { Tabbar, TabbarItem } from "@vkontakte/vkui";
import navigationItems from "src/components/__navigation/items";

import "./Mobile.scss";

const MobileNavigation = () => {
  const [view, toView] = useRouterView();
  const [activePopout, toPopout] = useRouterPopout();

  const customToView = (id: string) => {
    if (activePopout) window.closeAlert();
    setTimeout(
      () => {
        toView(id);
      },
      activePopout ? 300 : 0
    );
  };

  return (
    <Tabbar>
      {navigationItems.map((el, key) => (
        <TabbarItem
          onClick={() => {
            if (el.popout) {
              return toPopout(el.popout);
            }

            if (view === el.id) {
              return window.scrollTo(0, 0);
            }

            customToView(el.id);
          }}
          key={key}
          selected={view === el.id}
          text={el.title}
        >
          {el.icon}
        </TabbarItem>
      ))}
    </Tabbar>
  );
};

export default MobileNavigation;
