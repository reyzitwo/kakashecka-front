export interface InitializeParams {
  referrer_id?: number;
}

export interface ProfilePatchParams {
  notifications: boolean;
}

export interface DirtyUsersGetParams {}

export interface DirtyUsersPostParams {
  user_id: number;
}

export interface DirtyUsersClaimUserParams {}

export interface DirtyUsersClaimAllParams {
  hmac: string;
  ts: number;
}

export interface TheftParams {
  user_id: number;
}

export interface ReferralsParams {}

export interface ShopItemsGetParams {}

export interface ShopItemsBuyParams {
  count: number;
}

export interface ShopItemsUseParams {}

export interface TopParams {
  type: "balance" | "contamination" | "purity";
}

export interface AdsGetParams {}

export interface AdsPostParams {
  hash: string;
  hmac: string;
  ts: number;
}

export interface BonusesGetParams {}

export interface BonusesPostParams {}

export interface StoriesTemplatesParams {
  type: "referral_invite" | "referral_player";
}

export interface StoriesParams {
  template_id: number;
  user_id: number;
}
