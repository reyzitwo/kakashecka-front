import { FC, useEffect } from "react";
import { useRecoilState } from "recoil";

import { ModalCard, Placeholder } from "@vkontakte/vkui";
import { Header, Banner, Button, Spinner } from "src/components/__global";

import { API } from "src/modules";
import { bonuses, user } from "src/storage/atoms";

import Props from "../modal.interface";
import { BonusesGetResponse } from "src/modules/api/interfaces/response";

import "./Bonuses.scss";
import bridge from "@vkontakte/vk-bridge";

const EarnPaper: FC<Props> = ({ id, onClose }) => {
  const [state, setState] = useRecoilState(bonuses);
  const [stateUser, setUser] = useRecoilState(user);

  useEffect(() => {
    getBonuses();
  }, []);

  const getBonuses = async () => {
    let response = await new API().bonuses.get();
    setState(response);
  };

  const getBonus = async (item: BonusesGetResponse[0], index: number) => {
    if (item.metadata.type === "subscription") {
      await bridge.send("VKWebAppJoinGroup", {
        group_id: item.metadata.group_id,
      });

      let response = await new API().bonuses.claim({}, item.id);
      setUser({
        ...stateUser,
        toilet_paper: response.toilet_paper,
      });

      if (!state) return;
      let bonuses = [...state];
      bonuses.splice(index, 1);
      setState(bonuses);
    }
  };

  return (
    <ModalCard id={id} onClose={onClose}>
      <Header size={"medium"} className={"EarnPaper-Header"}>
        Заработать
      </Header>

      {state ? (
        state.length === 0 ? (
          <Placeholder>Бонусов нет</Placeholder>
        ) : (
          state.map((el, index) => (
            <Banner
              key={el.id}
              header={el.title}
              subheader={el.description}
              background={
                <div
                  style={{
                    backgroundImage: `url(${el.background_url})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              }
              actions={
                <Button
                  size={"small"}
                  background={"white"}
                  onClick={() => getBonus(el, index)}
                  className={"EarnPaper-Button"}
                >
                  Заработать
                </Button>
              }
              className={"Bonuses__banner"}
            />
          ))
        )
      ) : (
        <Spinner />
      )}
    </ModalCard>
  );
};

export default EarnPaper;
