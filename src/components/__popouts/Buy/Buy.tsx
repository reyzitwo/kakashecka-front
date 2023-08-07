import { FC } from "react";
import { useState } from "react";
import { useRouterData } from "@kokateam/router-vkminiapps";

import { Alert, Button } from "src/components/__global";
import { ImgToiletPaper } from "src/assets/img";
import { Icon24MinusOutline, Icon24Add } from "@vkontakte/icons";

import "./Buy.scss";

const Buy: FC = ({}) => {
  const [amount, setAmount] = useState(1);
  const data = useRouterData();

  return (
    <Alert header={"Покупка товара"}>
      <div className={"Buy-product"}>
        <div className={"Buy-product__image"}>
          <img src={""} alt={""} />
        </div>

        <div className={"Buy-product__content"}>
          <div className={"Buy-product__info"}>
            <div>
              <div className={"Buy-product__title header"}>
                {data?.title ?? "title"}
              </div>
              <div className={"Buy-product__description"}>
                {data?.description ?? "description\ndescription"}
              </div>
            </div>

            <Button
              after={
                <img src={ImgToiletPaper} alt={""} className={"img-after"} />
              }
              disabled
            >
              {data?.price ?? 1}
            </Button>
          </div>

          <div className={"Buy-product__action"}>
            <div
              onClick={() => {
                if (amount === 1) return;
                setAmount(amount - 1);
              }}
              className={"Buy-product__Button div-center"}
            >
              <Icon24MinusOutline />
            </div>

            <div className={"Buy-product__info-count"}>
              <header className={"description"}>Количество</header>
              <span className={"header"}>{amount}</span>
            </div>

            <div
              onClick={() => setAmount(amount + 1)}
              className={"Buy-product__Button div-center"}
            >
              <Icon24Add />
            </div>
          </div>
        </div>
      </div>

      <Button
        stretched
        after={<img src={ImgToiletPaper} alt={""} className={"img-after"} />}
      >
        КУПИТЬ ЗА {((data?.price ?? 1) * amount).toLocaleString("ru")}
      </Button>
    </Alert>
  );
};

export default Buy;
