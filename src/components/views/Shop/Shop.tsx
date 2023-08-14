import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useRouterHooks } from "@kokateam/router-vkminiapps";

import {
  Balance,
  Button,
  Header,
  Card,
  Spinner,
} from "src/components/__global";
import { PopoutBuy } from "src/components/__popouts";

import { shop, user } from "src/storage/atoms";
import { API } from "src/modules";

import "./Shop.scss";

const Shop = () => {
  const [state, setState] = useRecoilState(shop);
  const { toModal, toPopout } = useRouterHooks();

  const userInfo = useRecoilValue(user);

  useEffect(() => {
    if (state) return;
    getShopItems();
  }, []);

  const getShopItems = async () => {
    let items = await new API().shopItems.get();
    setState(items);
  };

  return (
    <>
      <div className={"Shop_balance-block"}>
        <Balance balance={userInfo.toilet_paper} />

        <Button
          size={"large"}
          background={"green"}
          onClick={() => toModal("earnPaper")}
        >
          Заработать
        </Button>
      </div>

      {state ? (
        state.map((element) => (
          <>
            <Header badge={4}>{element.title}</Header>
            <div className={"Shop_markets"}>
              {element.items.map((element2) => (
                <Card
                  key={element2.id}
                  id={element2.id}
                  image={element2.photo_url}
                  header={element2.title}
                  subheader={element2.description}
                  price={element2.price}
                  onClick={() => toPopout(<PopoutBuy />, element2)}
                />
              ))}
            </div>
          </>
        ))
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Shop;
