import { FC } from "react";

import { ModalCard } from "@vkontakte/vkui";
import { Header, Banner, Button } from "src/components/__global";

import Props from "../modal.interface";

import "./EarnPaper.scss";

const EarnPaper: FC<Props> = ({ id, onClose }) => {
  return (
    <ModalCard id={id} onClose={onClose}>
      <Header size={"medium"} className={"EarnPaper-Header"}>
        Заработать
      </Header>

      <Banner
        header={"Посмотреть рекламу"}
        subheader={"+200 🧻 за рекламный\nролик 15-30 сек"}
        actions={
          <Button size={"small"} className={"EarnPaper-Button"}>
            Заработать
          </Button>
        }
        className={"EarnPaper-Banner"}
      />

      <Banner
        header={"Пригласить друзей"}
        subheader={"+200 🧻 за\nприглашенного друга"}
        actions={
          <Button size={"small"} className={"EarnPaper-Button"}>
            Заработать
          </Button>
        }
        className={"EarnPaper-Banner"}
      />

      <Banner
        header={"Пачкай других"}
        subheader={"Испачканые вами игроки будут\nприносить 🧻"}
        actions={
          <Button size={"small"} className={"EarnPaper-Button"}>
            Заработать
          </Button>
        }
        className={"EarnPaper-Banner"}
      />
    </ModalCard>
  );
};

export default EarnPaper;
