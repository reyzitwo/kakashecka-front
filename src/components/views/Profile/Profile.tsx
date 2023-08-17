import { useEffect, useState, useRef } from "react";
import { useRecoilState } from "recoil";
import { useRouterView, useRouterModal } from "@kokateam/router-vkminiapps";

import { Avatar, Placeholder, Title } from "@vkontakte/vkui";
import { Group, Button, Cell, Badge, Spinner } from "src/components/__global";
import { Icon24Gift, Icon24Add } from "@vkontakte/icons";
import { ImgToiletPaper } from "src/assets/img";
import * as Icons from "./svg";

import { user, shop, dirtyUsers } from "src/storage/atoms";
import { SelectorShopInventory } from "src/storage/selectors/shop";
import { SelectorSnackbar } from "src/storage/selectors/main";
import { API, generateHash, sleep, declOfNum } from "src/modules";
import bridge, { EAdsFormats } from "@vkontakte/vk-bridge";

import "./Profile.scss";

const api = new API();

const Profile = () => {
  const [, toView] = useRouterView();
  const [, toModal] = useRouterModal();

  const [stateUser, setUser] = useRecoilState(user);
  const [shopState, setShopState] = useRecoilState(shop);
  const [stateInventory, setInventory] = useRecoilState(SelectorShopInventory);
  const [stateDirty, setDirty] = useRecoilState(dirtyUsers);
  const [, setSnackbar] = useRecoilState(SelectorSnackbar);

  const [animateImg, setAnimateImg] = useState(false);

  const avatarRef = useRef<HTMLImageElement>(null);
  const itemsInventoryRefs = useRef<HTMLImageElement[]>([]);
  const waveRef = useRef<HTMLImageElement>();

  useEffect(() => {
    if (shopState || stateUser.name === "") return;
    getShopItems();
  }, [stateUser.name]);

  useEffect(() => {
    if (stateDirty || stateUser.name === "") return;
    getDirtyUsers();
  }, [stateUser.name]);

  const getShopItems = async () => {
    let items = await api.shopItems.get();
    setShopState(items);
  };

  const getDirtyUsers = async () => {
    let items = await api.dirtyUsers.get();
    setDirty(items);
  };

  const useItem = async (item: { id: number }, index: number) => {
    if (animateImg) return;
    let response = await api.shopItems.use({}, item.id);

    if (response) {
      await animationImageItem(index);

      waveRef.current!.style.animation = "wave 4s linear";

      const contamination = stateUser.contamination - item.id * 10;
      setUser({
        ...stateUser,
        contamination: contamination < 0 ? 0 : contamination,
      });

      setTimeout(() => {
        waveRef.current!.style.animation = "none";
      }, 4000);

      setInventory({ id: item.id, count: -1 });
    } else {
      setSnackbar({ status: "error", text: "Вы и так чистый" });
    }
  };

  const animationImageItem = async (index: number) => {
    if (!avatarRef.current) return;
    setAnimateImg(true);

    const imageItemRect =
      itemsInventoryRefs.current[index].getBoundingClientRect();
    const avatarRect = avatarRef.current.getBoundingClientRect();

    const delta = {
      x: avatarRect.left - imageItemRect.left + 20,
      y: avatarRect.top - imageItemRect.top + 20,
    };

    itemsInventoryRefs.current[
      index
    ].style.transform = `translate(${delta.x}px, ${delta.y}px)`;
    await sleep(500);

    itemsInventoryRefs.current[
      index
    ].style.transition = `transform 250ms ease-in-out`;
    itemsInventoryRefs.current[index].style.transform = `translate(${
      delta.x - 40
    }px, ${delta.y}px)`;
    await sleep(250);

    itemsInventoryRefs.current[index].style.transform = `translate(${
      delta.x + 40
    }px, ${delta.y}px)`;
    await sleep(250);

    itemsInventoryRefs.current[
      index
    ].style.transition = `transform 500ms ease-in-out`;
    itemsInventoryRefs.current[index].style.transform = "translate(0, 0)";

    await sleep(500);

    setAnimateImg(false);
    return true;
  };

  const watchAd = async () => {
    let is_can_watch = await api.ads.get();
    if (!is_can_watch) {
      return setSnackbar({
        status: "error",
        text: "Попробуйте позже",
      });
    }

    await bridge
      .send("VKWebAppShowNativeAds", {
        ad_format: EAdsFormats.REWARD,
      })
      .catch(() =>
        setSnackbar({ status: "error", text: "Нет доступной рекламы" })
      );

    const hash = await generateHash();
    let response = await api.ads.watch(hash);

    if (response) {
      snackbarEarn(response.toilet_paper);
    } else {
      setSnackbar({
        status: "error",
        text: "Попробуйте позже",
      });
    }
  };

  const calculateHeightInPx = (percentage: number) => {
    if (percentage === 0) {
      return 35;
    } else if (percentage === 50) {
      return 240;
    } else if (percentage === 100) {
      return 462;
    } else {
      if (percentage > 0 && percentage < 50) {
        // Линейная интерполяция между 0% и 50%.
        return 35 + (percentage / 50) * (240 - 35);
      } else if (percentage > 50 && percentage < 100) {
        // Линейная интерполяция между 50% и 100%.
        return 240 + ((percentage - 50) / 50) * (462 - 240);
      }
    }
  };

  const claimAllPaper = async () => {
    bridge
      .send("VKWebAppShowNativeAds", {
        ad_format: EAdsFormats.REWARD,
      })
      .then(async () => {
        const hash = await generateHash();
        let response = await api.dirtyUsers.dirtyUsersClaimAll({
          hmac: hash.hmac,
          ts: hash.ts,
        });

        if (response) {
          snackbarEarn(response.toilet_paper);
        } else {
          setSnackbar({ status: "error", text: "Попробуйте позже" });
        }
      })
      .catch(() =>
        setSnackbar({ status: "error", text: "Нет доступной рекламы" })
      );
  };

  const snackbarEarn = (toilet_paper: number) => {
    setSnackbar({
      status: "success",
      text: `Вы заработали ${declOfNum(toilet_paper - stateUser.toilet_paper, [
        "туалетную бумагу",
        "туалетные бумаги",
        "туалетных бумаг",
      ])}`,
    });

    setUser({ ...stateUser, toilet_paper: toilet_paper });
  };

  return (
    <>
      <div className="ocean">
        <div className="wave"></div>
      </div>

      <div className={"Profile"}>
        <Avatar src={stateUser.avatar} size={80} getRef={avatarRef} />
        <Title level={"2"}>
          Вы грязный <br /> на {stateUser.contamination}%
        </Title>

        <div
          //@ts-ignore
          ref={waveRef}
          style={{ height: calculateHeightInPx(stateUser.contamination) }}
          className={"Profile__kakash"}
        />

        <div className={"Profile__action"}>
          <Cell before={<img src={ImgToiletPaper} alt={""} />}>
            {stateUser.toilet_paper.toLocaleString("ru")}
          </Cell>

          <Button
            before={
              <img
                src={"https://storage.nbalin.dev/kakashka-app/2.png"}
                alt={""}
              />
            }
          >
            Помыться
          </Button>

          <Cell
            after={
              <img
                src={"https://storage.nbalin.dev/kakashka-app/4.png"}
                alt={""}
              />
            }
          >
            {stateUser.poop_count.toLocaleString("ru")}
          </Cell>
        </div>
      </div>

      <Group
        header={{ text: "Инвентарь", mode: "left", background: "orange" }}
        className={`Profile-Inventory ${
          !stateInventory ? "Profile-Inventory__loading" : ""
        }`}
      >
        {stateInventory ? (
          <>
            {/* @ts-ignore */}
            {stateInventory.map((item, index) => (
              <div
                key={item.id}
                onClick={() => useItem(item, index)}
                className={"Profile-Inventory__Item"}
              >
                <Badge color={"blue"} className={"Profile-Inventory__badge"}>
                  {item.count}
                </Badge>

                <img
                  src={item.photo_url}
                  ref={(el) => el && (itemsInventoryRefs.current[index] = el)}
                  alt={""}
                />
                <div className={"Profile-Inventory__title"}>{item.title}</div>
              </div>
            ))}

            <div
              onClick={() => toView("shop")}
              className={"Profile-Inventory__Item Profile-Inventory__Add"}
            >
              <Icon24Add />
            </div>
          </>
        ) : (
          <Spinner />
        )}
      </Group>

      <div className={"Profile__buttons"}>
        <Button
          before={<Icons.IconUsers />}
          background={"white"}
          onClick={() => toView("dirty")}
        >
          Испачкать друзей
        </Button>

        <Button
          before={<Icons.IconLive />}
          background={"white"}
          onClick={() => toModal("earnPaper")}
        >
          Заработать рулоны
        </Button>

        <Button
          before={<Icons.IconVideoAdvertisement />}
          background={"white"}
          onClick={() => watchAd()}
        >
          Посмотреть рекламу
        </Button>
      </div>

      <Button
        before={<Icon24Gift />}
        background={"green"}
        stretched
        onClick={() => toModal("bonuses")}
        className={"Profile__bonuses"}
      >
        Бонусы
      </Button>

      <Group
        header={{ text: "Вы испачкали", mode: "left", background: "blue" }}
        className={"Profile__Group-Users"}
      >
        <Button
          background={"gray"}
          disabled={!stateDirty || stateDirty.length === 0}
          onClick={claimAllPaper}
          className={"DirtyUsers__button-claim-all"}
        >
          Собрать все <Badge color={"blue"}>AD</Badge>
        </Button>

        {stateDirty ? (
          stateDirty.length === 0 ? (
            <Placeholder>У вас нет испачканных пользователей</Placeholder>
          ) : (
            stateDirty.map((element) => (
              <Cell
                key={element.id}
                after={
                  <Button
                    disabled={!element.claim_available}
                    background={"green"}
                    onClick={async () => {
                      let response = await api.dirtyUsers.dirtyUsers(
                        {},
                        element.id
                      );
                      if (response) {
                        snackbarEarn(response.toilet_paper);
                      } else {
                        setSnackbar({
                          status: "error",
                          text: "Попробуйте позже",
                        });
                      }
                    }}
                    className={
                      !element.claim_available ? "DirtyUser__disabled" : ""
                    }
                  >
                    {element.amount_of_paper}{" "}
                    <img src={ImgToiletPaper} alt={""} /> /час
                  </Button>
                }
                avatar={element.avatar}
                textSize={2}
              >
                {element.name}
              </Cell>
            ))
          )
        ) : (
          <Spinner />
        )}
      </Group>
    </>
  );
};

export default Profile;
