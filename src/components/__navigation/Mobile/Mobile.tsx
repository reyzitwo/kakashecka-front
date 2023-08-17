import { useRouterPopout, useRouterView } from "@kokateam/router-vkminiapps";

import { Tabbar, TabbarItem } from "@vkontakte/vkui";
import navigationItems from "src/components/__navigation/items";

import "./Mobile.scss";

const MobileNavigation = () => {
  const [view, toView] = useRouterView();
  const [, toPopout] = useRouterPopout();

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

            toView(el.id);
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
