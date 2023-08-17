import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useRouterModal } from "@kokateam/router-vkminiapps";

import { Button, Spinner, Cell } from "src/components/__global";
import ImgToiletPaper from "src/assets/img/toilet_paper.webp";

import { top } from "src/storage/atoms";
import { API } from "src/modules";

import "./Top.scss";

const Tabs = [
  { id: "balance", title: "По балансу" },
  { id: "contamination", title: "По чистоте" },
  { id: "purity", title: "По испачканным" },
];

const Top = () => {
  const [state, setState] = useRecoilState(top);
  const [, toModal] = useRouterModal();

  const handlerSetState = (json: object) => {
    setState((prev) => ({ ...prev, ...json }));
  };

  useEffect(() => {
    getUsers(state.activeTab);
  }, []);

  const getUsers = async (type: "balance" | "contamination" | "purity") => {
    if (state[type]) return;
    let users = await new API().top({ type: type });
    handlerSetState({ [type]: users });

    // balance, contamination, purity
  };

  return (
    <>
      <div className={"flex Top-Tabs"}>
        {Tabs.map((element) => (
          <Button
            key={element.id}
            background={state.activeTab === element.id ? "orange" : "gray"}
            disabled={state.activeTab === element.id}
            onClick={() => {
              handlerSetState({ activeTab: element.id });
              // @ts-ignore
              getUsers(element.id);
            }}
          >
            {element.title}
          </Button>
        ))}
      </div>

      {state[state.activeTab] ? (
        // @ts-ignore, сверху проверка на null
        state[state.activeTab].map((element, index) => (
          <Cell
            key={element.id}
            onClick={() => toModal("userProfile", element)}
            before={<div className={"Top-Place"}>{index + 1}</div>}
            after={
              <div className={"Top-Balance"}>
                {element.toilet_paper.toLocaleString("ru")}
                <img src={ImgToiletPaper} alt={""} />
              </div>
            }
            avatar={element.avatar}
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

export default Top;
