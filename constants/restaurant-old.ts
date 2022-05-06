export enum DeliveryMode {
  DELIVERY = 'delivery',
  PICKUP = 'pickup'
}
/** 拼单订单状态 */
export enum GroupOrderStatus {
  open = 'A',
  lock = 'L',
  cancel = 'C',
  finish = 'F'
}
/** 餐馆销售模式：目前有普通模式(normal) / 拼单(groupbuy) */
export enum RtgSaleType {
  NORMAL = 'normal',
  GROUPBUY = 'groupbuy'
}

/** 餐馆日期格式化格式 */
export const RTG_DATE_FORMAT = 'ddd  M/D';

/** 拼单线上白名单 */
export const GROUPBUY_WHITE_LIST = [
  '2290945',
  '7324213',
  '7246741',
  '7628414',
  '7527490',
  '7824257',
  '7955955',
  '7636251'
];

/**
 * 主题轮播ID对应的carousel_type ==> 用于埋点
 * number: 对应的是后端数据返回的groupId
 * string: 埋点需要的string type
 * Tips: 如果后端对应Id有更改，或有新增类型需要同步更新
 */
export const CAROUSEL_TYPES = {
  /** number:string */
  NUM_STR: {
    1: 'new_on_weee',
    2: 'special_offer',
    3: 'brunch_delivery',
    4: 'pick_near_you',
    5: 'order_again',
    6: 'weee_pick',
    7: 'trending',
    8: 'on_demand_delivery_weee',
    9: 'pick_for_you',
    10: 'regional_cuisine'
  },
  /** string:number */
  STR_NUM: {
    new_on_weee: 1,
    special_offer: 2,
    brunch_delivery: 3,
    pick_near_you: 4,
    order_again: 5,
    weee_pick: 6,
    trending: 7,
    on_demand_delivery_weee: 8,
    pick_for_you: 9,
    regional_cuisine: 10
  }
} as const;

export const DEVIDER = ' • ';

/** Ricepo Args */
export const RICEPO = {
  /** Temp CDN image URL */
  BANNER_IMG_URL: 'https://cdn.sayweee.net/common/59e2c3aa76197e385afc8cf0fe0ef6b0_0x0.png',
  RICEPO_APP_URL: 'https://ricepo.app.link/openc'
};
/* RTG waves */
export const RTG_WAVE_SEQ = {
  DINNER: '0',
  BREAKFAST: '1',
  LUNCH: '2',
  PICKUP: '3',
  BREAKFAST_PICKUP: '4',
  LUNCH_PICKUP: '5',
  DINNER_PICKUP: '6',
  AFTERNOON_TEA: '7',
  DELIVERY_ONDEMAND: '8',
  PICKUP_ONDEMAND: '9',
  DEFAULT: '-1',
  EMPTY: ''
};

/* deliver scheduled waves */
export const DELIVERY_WAVES = [RTG_WAVE_SEQ.DINNER, RTG_WAVE_SEQ.BREAKFAST, RTG_WAVE_SEQ.LUNCH];

/* pickup scheduled waves */
export const PICKUP_WAVES = [
  RTG_WAVE_SEQ.PICKUP,
  RTG_WAVE_SEQ.BREAKFAST_PICKUP,
  RTG_WAVE_SEQ.LUNCH_PICKUP,
  RTG_WAVE_SEQ.DINNER_PICKUP
];

/* ondemand waves */
export const ONDEMAND_WAVES = [RTG_WAVE_SEQ.DELIVERY_ONDEMAND, RTG_WAVE_SEQ.PICKUP_ONDEMAND];

export const ONDEMAND_DEAL_ID = {
  DELIVERY: -10000,
  PICKUP: -10001
};

export const METHODS = {
  DELIVERY_ONDEMAND: 'delivery_ondemand',
  PICKUP_ONDEMAND: 'pickup_ondemand',
  SCHEDULED: 'scheduled',
  PICKUP: 'pickup'
};

export const DISH_DEFAULT_IMAGE_URL = 'https://weee-img.s3.us-west-2.amazonaws.com/2021-09/uGqvZpCRS6GfXrXKisbbaw.jpg';

/** 活动类型 字段名与后台Entity对应 */
export const ACTIVITY_TYPE = {
  /** 赠品 */
  GIFT: 0,
  /** 换购 */
  PROMOTION: 1,
  /** 满折满减 */
  DISCOUNT: 2
} as const;

/** 满折满减活动 优惠类型 */
export const ACTIVITY_DISCOUNT_PROMO_TYPE = {
  /** 满折 */
  PERCENT_OFF: 2,
  /** 满减 */
  PRICE_OFF: 3
} as const;

export const LANG_CONSTANS = {
  ZH: 'zh',
  ZHT: 'zht',
  EN: 'en'
};
