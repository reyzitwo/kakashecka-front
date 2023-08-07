import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useRouterModal } from "@kokateam/router-vkminiapps";

import { HorizontalScroll } from "@vkontakte/vkui";
import { Button, Spinner, Cell } from "src/components/__global";
import ImgToiletPaper from "src/assets/img/toilet_paper.png";

import { top } from "src/storage/atoms";
import { api } from "src/modules";

import "./Top.scss";

const Tabs = [
  { id: 1, title: "По балансу" },
  { id: 2, title: "По чистоте" },
  { id: 3, title: "По испачканным" },
];

const Top = () => {
  const [state, setState] = useRecoilState(top);
  const [, toModal] = useRouterModal();

  const handlerSetState = (json: object) => {
    setState((prev) => ({ ...prev, ...json }));
  };

  useEffect(() => {
    if (!state.users) {
      getUsers();
    }
  }, []);

  const getUsers = () => {
    api("users", "GET").then((data) => {
      handlerSetState({ users: data });
    });
  };

  return (
    <>
      <HorizontalScroll className={"Top-Tabs"}>
        <div className={"flex Top-Tabs"}>
          {Tabs.map((element) => (
            <Button
              key={element.id}
              background={state.activeTab === element.id ? "orange" : "gray"}
              disabled={state.activeTab === element.id}
              onClick={() => handlerSetState({ activeTab: element.id })}
            >
              {element.title}
            </Button>
          ))}
        </div>
      </HorizontalScroll>

      {state.users ? (
        state.users.map((element) => (
          <Cell
            key={element.id}
            onClick={() => toModal("userProfile", element)}
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

export default Top;
