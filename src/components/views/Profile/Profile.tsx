import { useEffect, useState, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useRouterView, useRouterModal } from "@kokateam/router-vkminiapps";

import { Avatar, Placeholder, Title } from "@vkontakte/vkui";
import { Group, Button, Cell, Badge, Spinner } from "src/components/__global";
import { Icon24Gift, Icon24Add } from "@vkontakte/icons";
import { ImgToiletPaper } from "src/assets/img";
import ImgPoors from "./img/poors.webp";
import * as Icons from "./svg";

import { user, shop, dirtyUsers } from "src/storage/atoms";
import { SelectorShopInventory } from "src/storage/selectors/shop";
import { SelectorSnackbar, getIsDesktop } from "src/storage/selectors/main";
import { API, generateHash, sleep, declOfNum } from "src/modules";
import bridge, { EAdsFormats } from "@vkontakte/vk-bridge";

import Base64 from "crypto-js/enc-base64";
import hmacSHA512 from "crypto-js/hmac-sha512";

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
  const itemsInventoryRefs = useRef<HTMLDivElement[]>([]);
  const waveRef = useRef<HTMLDivElement>();
  const isDesktop = useRecoilValue(getIsDesktop);

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
    if (!response) return;

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
  };

  const animationImageItem = async (index: number) => {
    const item = itemsInventoryRefs.current[index];

    const imageItem = item.getElementsByTagName("img")[0];
    const titleItem = item.getElementsByClassName(
      "Profile-Inventory__title"
    )[0] as HTMLDivElement;

    if (!avatarRef.current) return;
    setAnimateImg(true);

    const imageItemRect = imageItem.getBoundingClientRect();
    const avatarRect = avatarRef.current.getBoundingClientRect();

    const delta = {
      x: avatarRect.left - imageItemRect.left + 20,
      y: avatarRect.top - imageItemRect.top + 20,
    };

    imageItem.style.position = "fixed";
    titleItem.style.marginTop = `${imageItemRect.height + 8}px`;
    imageItem.style.transition = `transform 500ms ease-in-out`;
    imageItem.style.transform = `translate(${delta.x}px, ${delta.y}px)`;
    await sleep(500);

    imageItem.style.transition = `transform 250ms ease-in-out`;
    imageItem.style.transform = `translate(${delta.x - 40}px, ${delta.y}px)`;
    await sleep(250);

    imageItem.style.transform = `translate(${delta.x + 40}px, ${delta.y}px)`;
    await sleep(250);

    imageItem.style.transition = `transform 500ms ease-in-out`;
    imageItem.style.transform = "translate(0, -8px)";

    await sleep(500);

    titleItem.style.marginTop = "0";
    imageItem.style.transition = "none";
    imageItem.style.transform = "none";
    imageItem.style.position = "initial";

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

    bridge
      .send("VKWebAppShowNativeAds", {
        ad_format: EAdsFormats.REWARD,
      })
      .then(async () => {
        const hash = await generateHash();
        let response = await api.ads.watch(hash);

        if (!response) return;
        snackbarEarn(response.toilet_paper);
      })
      .catch(() =>
        setSnackbar({ status: "error", text: "Нет доступной рекламы" })
      );
  };

  const calcHeightWave = (arrayPx: number[], percentage: number) => {
    if (percentage === 0) {
      return arrayPx[0];
    } else if (percentage === 25) {
      return arrayPx[1];
    } else if (percentage === 50) {
      return arrayPx[2];
    } else if (percentage === 75) {
      return arrayPx[3];
    } else if (percentage === 100) {
      return arrayPx[4];
    } else {
      if (percentage > 0 && percentage < 25) {
        // Линейная интерполяция между 0% и 25%.
        return arrayPx[0] + (percentage / 50) * (arrayPx[1] - arrayPx[0]);
      } else if (percentage > 25 && percentage < 50) {
        // Линейная интерполяция между 25% и 50%.
        return arrayPx[1] + (percentage / 50) * (arrayPx[2] - arrayPx[1]);
      } else if (percentage > 50 && percentage < 75) {
        // Линейная интерполяция между 50% и 75%.
        return arrayPx[2] + (percentage / 50) * (arrayPx[3] - arrayPx[2]);
      } else {
        // Линейная интерполяция между 75% и 100%.
        return (
          arrayPx[3] + ((percentage - 50) / 50) * (arrayPx[4] - arrayPx[3])
        );
      }
    }
  };

  const claimAllPaper = async () => {
    if (!stateDirty) return;

    bridge
      .send("VKWebAppShowNativeAds", {
        ad_format: EAdsFormats.REWARD,
      })
      .then(async () => {
        const ts = Math.floor(Date.now() / 1000);
        const hmac = Base64.stringify(
          hmacSHA512(
            `${window.location.href
              .slice(window.location.href.indexOf("?") + 1)
              .split("#")[0]
              .slice(7)}-${ts}`,
            String(stateUser.user_id)
          )
        );

        let response = await api.dirtyUsers.dirtyUsersClaimAll({
          hmac: hmac,
          ts: ts,
        });

        if (response) {
          setDirty(
            [...stateDirty].map((el) => ({ ...el, claim_available: false }))
          );
          snackbarEarn(response.toilet_paper);
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
      <div className={"Profile"}>
        <Avatar src={stateUser.avatar} size={80} getRef={avatarRef} />
        <Title level={"2"}>
          Вы грязный <br /> на {stateUser.contamination}%
        </Title>

        <img
          src={ImgPoors}
          alt={""}
          style={{
            bottom: `${calcHeightWave(
              isDesktop
                ? [-400, -370, -265, -170, 0]
                : [-312, -290, -200, -100, 0],
              stateUser.contamination
            )}px`,
          }}
          className={"Profile__kakash"}
        />

        <div
          //@ts-ignore
          ref={waveRef}
          style={{
            height: calcHeightWave(
              [0, 120, 240, 332, 425],
              stateUser.contamination
            ),
          }}
          className={"Profile__kakash-background"}
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
            onClick={() => {
              const indexElement = stateInventory.findIndex(
                (item: { sectionId: number }) => item.sectionId === 1
              );

              if (indexElement === -1) {
                return setSnackbar({
                  status: "error",
                  text: "У вас нет вещей чтобы помыться",
                });
              }

              useItem({ id: stateInventory[indexElement].id }, indexElement);
            }}
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
        classNameContent={"hide-scrollbar"}
      >
        {stateInventory ? (
          <>
            {/* @ts-ignore */}
            {stateInventory.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => el && (itemsInventoryRefs.current[index] = el)}
                onClick={() => useItem(item, index)}
                className={"Profile-Inventory__Item"}
              >
                <Badge color={"blue"} className={"Profile-Inventory__badge"}>
                  {item.count}
                </Badge>

                <img src={item.photo_url} alt={""} />
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

      <div className={"Profile__buttons hide-scrollbar"}>
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
          onClick={() => toModal("earnPaper", watchAd)}
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
            stateDirty.map((element, index) => (
              <Cell
                key={element.id}
                after={
                  <Button
                    disabled={!element.claim_available}
                    background={"green"}
                    onClick={async () => {
                      let response = await api.dirtyUsers.dirtyUsers(
                        {},
                        element.user_id
                      );
                      if (response) {
                        const arrayUsers = [...stateDirty];
                        arrayUsers[index] = {
                          ...element,
                          claim_available: false,
                        };

                        setDirty(arrayUsers);
                        snackbarEarn(response.toilet_paper);
                      }
                    }}
                    className={
                      !element.claim_available ? "button-disabled" : ""
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
