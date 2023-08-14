import { ModalRoot, useRouterModal } from "@kokateam/router-vkminiapps";

import * as Modals from "./";

const MainStack = () => {
  const [, toModal] = useRouterModal();

  return (
    <ModalRoot>
      <Modals.UserProfile id={"userProfile"} onClose={() => toModal(-1)} />
      <Modals.ShareStories id={"shareStories"} onClose={() => toModal(-1)} />
      <Modals.EarnPaper id={"earnPaper"} onClose={() => toModal(-1)} />
      <Modals.Bonuses id={"bonuses"} onClose={() => toModal(-1)} />
    </ModalRoot>
  );
};

export default MainStack;
