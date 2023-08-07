import { useRouterHooks } from "@kokateam/router-vkminiapps";

import { Balance, Button, Header, Card } from "src/components/__global";
import { PopoutBuy } from "src/components/__popouts";

import "./Shop.scss";

const Shop = () => {
  const { toModal, toPopout } = useRouterHooks();

  return (
    <>
      <div className={"Shop_balance-block"}>
        <Balance balance={1234567} />

        <Button
          size={"large"}
          background={"green"}
          onClick={() => toModal("earnPaper")}
        >
          Заработать
        </Button>
      </div>

      <Header badge={4}>Помыться</Header>
      <div className={"Shop_markets"}>
        <Card
          id={1}
          image={""}
          header={"Мыло"}
          subheader={"Восстанавливает\n10% чистоты"}
          price={50}
          onClick={() => toPopout(<PopoutBuy />, "hello")}
        />

        <Card
          id={2}
          image={""}
          header={"Мыло #2"}
          subheader={"Восстанавливает\n10% чистоты"}
          price={50}
          onClick={() => toPopout(<PopoutBuy />, "hello")}
        />

        <Card
          id={3}
          image={""}
          header={"Мыло #3"}
          subheader={"Восстанавливает\n10% чистоты"}
          price={50}
          onClick={() => toPopout(<PopoutBuy />, "hello")}
        />

        <Card
          id={4}
          image={""}
          header={"Мыло #4"}
          subheader={"Восстанавливает\n10% чистоты"}
          price={50}
          onClick={() => toPopout(<PopoutBuy />, "hello")}
        />
      </div>
    </>
  );
};

export default Shop;
