import {
  UserConstant,
  ProfileConstant,
} from "src/modules/api/interfaces/constants";

export type InitializeResponse = UserConstant &
  ProfileConstant & { notifications: boolean };

export type ProfileGetResponse = ProfileConstant;

export interface ProfilePatchResponse {
  notifications: boolean;
}

export interface DirtyUsersPostResponse extends UserConstant {
  amount_of_paper: number;
  claim_available: boolean;
}

export type DirtyUsersGetResponse = Array<DirtyUsersPostResponse>;

export interface DirtyUsersClaimResponse {
  toilet_paper: number;
}

export interface TheftResponse {
  toilet_paper: number;
}

export interface ReferralsResponse {
  referrals: Array<UserConstant>;
  count: number;
}

export type ShopItemsGetResponse = Array<{
  id: number;
  title: string;
  items: Array<{
    id: number;
    title: string;
    description: string;
    price: number;
    max_count: number;
    count: number;
    photo_url: string;
  }>;
}>;

export interface ShopItemsBuyResponse {
  toilet_paper: number;
}

export type ShopItemsUseResponse = boolean;

export interface TopResponse extends UserConstant {
  toilet_paper: number;
  contamination: number;
}

export type AdsGetResponse = boolean;

export interface AdsPostResponse {
  toilet_paper: number;
}

export type BonusesGetResponse = Array<{
  id: number;
  title: string;
  description: string;
  reward: number;
  metadata: any;
  icon_url: string;
  background_url: string;
}>;

export interface BonusesPostResponse {
  toilet_paper: number;
}

export type StoriesTemplatesResponse = Array<{
  id: number;
  url: string;
}>;

export type StoriesResponse = string;
