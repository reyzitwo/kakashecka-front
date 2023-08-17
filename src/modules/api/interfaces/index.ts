import * as Params from "src/modules/api/interfaces/params";
import * as Response from "src/modules/api/interfaces/response";

interface APIProfile {
  get(): Promise<Response.ProfileGetResponse>;
  patch(
    params: Params.ProfilePatchParams
  ): Promise<Response.ProfilePatchResponse>;
}

interface APIDirtyUsers {
  get(): Promise<Response.DirtyUsersGetResponse>;
  dirty(
    params: Params.DirtyUsersPostParams
  ): Promise<Response.DirtyUsersPostResponse>;
  dirtyUsers(
    params: Params.DirtyUsersClaimUserParams,
    query_value: number
  ): Promise<Response.DirtyUsersClaimResponse>;
  dirtyUsersClaimAll(
    params: Params.DirtyUsersClaimAllParams
  ): Promise<Response.DirtyUsersClaimResponse>;
}

interface APIShopItems {
  get(): Promise<Response.ShopItemsGetResponse>;
  buy(
    params: Params.ShopItemsBuyParams,
    query_value: number
  ): Promise<Response.ShopItemsBuyResponse>;
  use(
    params: Params.ShopItemsUseParams,
    query_value: number
  ): Promise<Response.ShopItemsUseResponse>;
}

interface APIAds {
  get(): Promise<Response.AdsGetResponse>;
  watch(params: Params.AdsPostParams): Promise<Response.AdsPostResponse>;
}

interface APIBonuses {
  get(): Promise<Response.BonusesGetResponse>;
  claim(
    params: Params.BonusesPostParams,
    value: number
  ): Promise<Response.BonusesPostResponse>;
}

interface APIStories {
  get(
    params: Params.StoriesTemplatesParams
  ): Promise<Response.StoriesTemplatesResponse>;
  post(params: Params.StoriesParams): Promise<Response.StoriesResponse>;
}

export default interface APIProps {
  initialize(
    params?: Params.InitializeParams
  ): Promise<Response.InitializeResponse>;
  profile: APIProfile;
  dirtyUsers: APIDirtyUsers;
  theft(params: Params.TheftParams): Promise<Response.TheftResponse>;
  referrals(): Promise<Response.ReferralsResponse>;
  shopItems: APIShopItems;
  top(params: Params.TopParams): Promise<Response.TopResponse>;
  ads: APIAds;
  bonuses: APIBonuses;
  stories: APIStories;
}
