import { atom } from "recoil";
import { StoriesTemplatesResponse } from "src/modules/api/interfaces/response";

interface storiesI {
  active: number;
  templates: {
    referral_invite: StoriesTemplatesResponse | null;
    referral_player: StoriesTemplatesResponse | null;
  };
}

const _ = atom<storiesI>({
  key: "storiesStorage",
  default: {
    active: 0,
    templates: {
      referral_invite: null,
      referral_player: null,
    },
  },
});

export default _;
