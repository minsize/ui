import {
  MODAL_REFERAL_URL,
  MODAL_USER_LEVEL,
  MODAL_USER_SLAVE,
  PAGE_ADS,
  PAGE_AUCTION,
  PAGE_RATING,
  PAGE_SHOP,
} from "router"
import { RatingType } from "state"

export const url_app = "https://t.me/empire_gamebot/app"

export const support_chat = "https://t.me/empiregamesuppport"

export const ads_block_id = "971"

export const max_level = 100

export const task_buttons = [
  {
    type: "slave_counter",
    pageId: PAGE_AUCTION,
  },
  {
    type: "guild_join",
    pageId: PAGE_RATING,
    params: { tab: RatingType.Clans },
  },
  {
    type: "level_up",
    modalId: MODAL_USER_LEVEL,
  },
  {
    type: "referral_invite",
    modalId: MODAL_REFERAL_URL,
  },
  {
    type: "daily_referral_invite",
    modalId: MODAL_REFERAL_URL,
  },
  {
    type: "weekly_hire_worker",
    pageId: PAGE_AUCTION,
  },
  {
    type: "weekly_collection_tribute",
    back: true,
  },
  {
    type: "daily_tribute",
    back: true,
  },
  {
    type: "weekly_up_level_worker",
    modalId: MODAL_USER_SLAVE,
    params: { user: 0, is_upgrade: true },
  },
  {
    type: "weekly_buy_product",
    pageId: PAGE_SHOP,
    params: { tab: "EMP" },
  },
  {
    type: "main_buy_currency",
    pageId: PAGE_SHOP,
    params: { tab: "XTR" },
  },
  {
    type: "weekly_fire_worker",
    modalId: MODAL_USER_SLAVE,
    params: { user: 0 },
  },
  {
    type: "daily_speed_up_level_worker",
    modalId: MODAL_USER_SLAVE,
    params: { user: 0 },
  },
  {
    type: "daily_show_ads",
    pageId: PAGE_ADS,
    params: { type: "tasks" },
  },
]

export const task_promo = ["promo"]
