import { SplitCol, SplitLayout } from "@vkontakte/vkui";
import { Epic, View, useRouterPopout } from "@kokateam/router-vkminiapps";

import { PageConstructor } from "src/components/__global";
import { MobileNavigation } from "./components/__navigation";

import { Top, Dirty, Shop } from "src/components/views";
import MainStack from "./components/__modals/MainStack";

interface NavigationI {
  isDesktop: boolean;
}

const Navigation = ({ isDesktop }: NavigationI) => {
  const { popout } = useRouterPopout();

  return (
    <SplitLayout className={"jcc"} modal={<MainStack />} popout={popout}>
      <SplitCol
        animate={!isDesktop}
        spaced={isDesktop}
        width={isDesktop ? "650px" : "100%"}
        maxWidth={isDesktop ? "650px" : "100%"}
      >
        <Epic tabbar={<MobileNavigation />}>
          <View id="top">
            <PageConstructor id={"top"} header="Топ игроков">
              <Top />
            </PageConstructor>
          </View>

          <View id="dirty">
            <PageConstructor id={"dirty"} header="Испачкать">
              <Dirty />
            </PageConstructor>
          </View>

          <View id="shop">
            <PageConstructor id={"shop"} header="Магазин" paddingLevel={2}>
              <Shop />
            </PageConstructor>
          </View>
        </Epic>
      </SplitCol>
    </SplitLayout>
  );
};

export default Navigation;
