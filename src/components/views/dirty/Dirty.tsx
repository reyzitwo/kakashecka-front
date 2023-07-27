import { useRecoilState } from "recoil";
import { useEffect } from "react";

import { Button, Cell, Header, Spinner } from "src/components/__global";
import { Icon24UserAdd, Icon12Clock } from "@vkontakte/icons";
import ImgToiletPaper from "src/assets/png/toilet_paper.png";

import bridge from "@vkontakte/vk-bridge";
import { invited } from "src/storage/atoms";
import { api } from "src/modules";

import "./Dirty.scss";

const Dirty = () => {
  const [state, setState] = useRecoilState(invited);

  useEffect(() => {
    if (!state) {
      getUsers();
    }
  }, []);

  const getUsers = () => {
    api("users", "GET").then((data) => {
      setState(data);
    });
  };

  return (
    <>
      <Cell
        before={
          <Button disabled>
            <Icon24UserAdd height={18} width={18} />
          </Button>
        }
        subheader={"https://vk.com/ihu76gyuh12x"}
        after={
          <Button
            background={"orange"}
            onClick={() =>
              bridge.send("VKWebAppCopyText", { text: "copy successful!" })
            }
          >
            Копировать
          </Button>
        }
        className={"Dirty_referral-link"}
      >
        Реферальная ссылка
      </Cell>

      <Button
        before={<Icon12Clock height={20} width={20} />}
        size={"large"}
        stretched
        className={"Dirty_share-story mt10"}
      >
        Поделиться в истории
      </Button>

      <Header badge={10}>Приглашенные игроки</Header>

      {state ? (
        state.map((element) => (
          <Cell
            key={element.id}
            onClick={() =>
              window.open(`https://vk.com/id${element.id}`, "_href")
            }
            before={<div className={"Top-Place"}>{element.id}</div>}
            after={
              <div className={"Top-Balance"}>
                {(232332).toLocaleString("ru")}
                <img src={ImgToiletPaper} alt={""} />
              </div>
            }
            avatar={"1"}
            textSize={2}
          >
            {element.name}
          </Cell>
        ))
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Dirty;
