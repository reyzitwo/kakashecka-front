import { FC } from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { useRouterData } from "@kokateam/router-vkminiapps";

import { Alert, Button } from "src/components/__global";
import { ImgToiletPaper } from "src/assets/img";
import { Icon24MinusOutline, Icon24Add } from "@vkontakte/icons";

import { API } from "src/modules";
import { SelectorSnackbar } from "src/storage/selectors/main";
import { SelectorShopInventory } from "src/storage/selectors/shop";
import { user } from "src/storage/atoms";

import "./Buy.scss";

const Buy: FC = ({}) => {
  const data = useRouterData();

  const [count, setCount] = useState(1);
  const [state] = useState(data);
  const [, setSnackbar] = useRecoilState(SelectorSnackbar);
  const [, setItemCount] = useRecoilState(SelectorShopInventory);
  const [stateUser, setUser] = useRecoilState(user);

  const buyItem = async () => {
    let response = await new API().shopItems.buy({ count: count }, state.id);
    if (!response) {
      return setSnackbar({
        status: "error",
        text: "Недостатчно туалетной бумаги",
      });
    }

    setItemCount({ id: state.id, count: count });
    setUser({
      ...stateUser,
      toilet_paper: response.toilet_paper,
      poop_count:
        state.id === 4 ? stateUser.poop_count + count : stateUser.poop_count,
    });
    setSnackbar({ status: "success", text: "Успешно" });
  };

  return (
    <Alert id={"buy"} header={"Покупка товара"} isBack>
      <div className={"Buy-product"}>
        <div className={"Buy-product__image"}>
          <img src={state.photo_url} alt={""} />
        </div>

        <div className={"Buy-product__content"}>
          <div className={"Buy-product__info"}>
            <div>
              <div className={"Buy-product__title header"}>{state.title}</div>
              <div className={"Buy-product__description"}>
                {state.description}
              </div>
            </div>

            <Button
              after={
                <img src={ImgToiletPaper} alt={""} className={"img-after"} />
              }
              disabled
            >
              {state.price}
            </Button>
          </div>

          <div className={"Buy-product__action"}>
            <div
              onClick={() => {
                if (count === 1) return;
                setCount(count - 1);
              }}
              className={"Buy-product__Button div-center"}
            >
              <Icon24MinusOutline />
            </div>

            <div className={"Buy-product__info-count"}>
              <header className={"description"}>Количество</header>
              <span className={"header"}>{count}</span>
            </div>

            <div
              onClick={() => setCount(count + 1)}
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
        onClick={buyItem}
      >
        КУПИТЬ ЗА {((data?.price ?? 1) * count).toLocaleString("ru")}
      </Button>
    </Alert>
  );
};

export default Buy;
