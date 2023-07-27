import { Cell, Button, Header, Card } from "src/components/__global";
import ImgToiletPaper from "src/assets/png/toilet_paper.png";

import "./Shop.scss";

const Shop = () => {
  return (
    <>
      <div className={"Shop_balance-block"}>
        <Cell
          before={<img src={ImgToiletPaper} alt={""} />}
          subheader={(1234567).toLocaleString("ru")}
          className={"Shop_balance-block_balance"}
        >
          Баланс
        </Cell>

        <Button size={"large"} background={"green"}>
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
        />

        <Card
          id={2}
          image={""}
          header={"Мыло #2"}
          subheader={"Восстанавливает\n10% чистоты"}
          price={50}
        />

        <Card
          id={3}
          image={""}
          header={"Мыло #3"}
          subheader={"Восстанавливает\n10% чистоты"}
          price={50}
        />

        <Card
          id={4}
          image={""}
          header={"Мыло #4"}
          subheader={"Восстанавливает\n10% чистоты"}
          price={50}
        />
      </div>
    </>
  );
};

export default Shop;
