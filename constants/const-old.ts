const LANGUAGE_ZHT_ALIAS = 'zh-Hant';
const LANGUAGE_ZHT = 'zht';
const LANGUAGE_ZH_ALIAS = 'zh-Hans';
const LANGUAGE_ZH = 'zh';
const LANGUAGE_EN = 'en';
const LANGUAGE_KO = 'ko';
const LANGUAGE_JA = 'ja';
const LANGUAGE_VI = 'vi';
const LANGUAGE_ES = 'es';
const LANGUAGE_CHINESE = 'zh';
const LANGUAGE_CHINESE_LOCALE = 'zh-cn';
const LANGUAGE_CHINESE_T = 'zht';
const LANGUAGE_CHINESE_ALTERNATE = 'zh-tw';

/**
 * cookies
 */
export default {
  AUTH_TOKEN: 'auth_token',
  AUTH_TOKEN_EXPIRED_TIME: 3600 * 24 * 30,
  AUTH_TOKEN_IN_HEADERS: 'Authorization',
  ORDER_TOKEN: 'order_token',
  HOT_DISH_DELIVERY: 'hot_delivery',
  HOT_DISH_DELIVERYWAVE: 'hotdish_deal_id',
  LANGUAGE: 'site_lang',
  LANGUAGE_EXPIRED_TIME: 3600 * 24 * 365 * 10,
  B_COOKIE: 'b_cookie',
  B_COOKIE_IN_HEADER: 'b-cookie',
  ZIP_CODE: 'NEW_ZIP_CODE',
  IS_LOGIN: 'IS_LOGIN',
  HOT_DISH_DEAL_ID: 'hotdish_deal_id',
  WEBSITE: 'Sayweee.com',
  WEBSITE_LINK: 'https://www.sayweee.com',
  WEEE_STORE: 'weee-store',
  //本字段供大数据埋点使用
  WEEE_SESSION_TOKEN: 'weee_session_token',
  WEEE_SESSION_TOKEN_MAX_AGE: 3600,
  //大数据header头名称
  WEEE_HEADER_SESSION_TOKEN: 'weee-session-token',
  WEEE_APP_TOKEN: 'weee-token',
  WEEE_APP_TOKEN_ANDROID: 'weee_token',
  CI_SESSION: 'ci_session',
  LANG: 'lang',
  DELIVERY_DATE: 'DELIVERY_DATE',
  /**辣度 */
  SPICY_ENUM: {
    /**微辣 */
    spicy1: 'spicy1',
    /**中辣 */
    spicy2: 'spicy2',
    /**重辣 */
    spicy3: 'spicy3'
  },
  IMAGE_CDN: {
    DEV: 'https://cdn01.tb1.sayweee.net',
    PROD: 'https://img01.weeecdn.com'
  },
  TRACK_ENUM: {
    PV_RESTAURANT_LIST: 'page_restaurant_list',
    PV_RESTAURANT_DETAIL: 'page_restaurant_detail',
    PV_RESTAURANT_DISH_DETAIL: 'page_restaurant_detail_dish',
    PV_RATE: 'page_hotdish_rating',
    PV_COLLECT: 'page_hotdish_rating',
    EVENT_SHARE_CLICK: 'share_popup',
    EVENT_RESTAURANTS_PAGE_BANNER: 'restaurants_page_banner',
    EVENT_RESTAURANT_COLLECT_VIEW: 'restaurant_collection_page_view',
    EVENT_RESTAURANT_LIST_VIEW: 'restaurant_list_page_view',
    EVENT_RESTAURANT_DETAIL_VIEW: 'restaurant_detail_page_view',
    EVENT_RESTAURANT_DISH_DETAIL_VIEW: 'restaurant_product_detail_page_view',
    EVENT_RESTAURANT_ITEM_IMAGE_CLICK: 'restaurant_item_picture_click',
    EVENT_RESTAURAN_ERROR_MESSAGE: 'restaurant_error_message_view',
    EVENT_RESTAURANT_SEARCH_ICON_CLICK: 'restaurant_search_icon_click',
    EVENT_RESTAURANT_SEARCH_CLICK: 'restaurant_search_click',
    EVENT_RESTAURANT_SEARCH_IMPRESSION: 'restaurant_search_impression',
    EVENT_RESTAURANT_FILTER_VIEW: 'restaurant_filter_view',
    EVENT_RESTAURANT_FILTER_CLICK: 'restaurant_filter_click',
    EVENT_RESTAURANT_LIST_CLICK: 'restaurant_list_click',
    EVENT_RESTAURANT_DETAIL_CLICK: 'restaurant_detail_click',
    EVENT_RESTAURANT_THEMED_CAROUSEL_IMPRESSION: 'restaurant_themed_carousel_impression',
    EVENT_RESTAURANT_THEMED_CAROUSEL_CLICKED: 'restaurant_themed_carousel_clicked',
    EVENT_THEMED_CAROUSEL: 'themed_carousel',
    EVENT_CART_PAGE: 'cart',
    EVENT_REORDER: 'reorder',
    EVENT_RESTAURANT_LIST_IMPRESSION: 'restaurant_list_impression',
    RTG_PAGE_SHARE_POPUP_VIEW: 'rtg_page_share_popup_view'
  },
  DETAIL_SOURCE: 'restaurant_detail',
  DISH_DETAIL_SOURCE: 'restaurant_detail_dish',
  PRODUCT_FEATURE: {
    SALE: 2,
    MEMBER: 4,
    NEW: 8
  },
  ADDRESS_CITY: 'NEW_ZIP_CITY',
  IS_SHIPPING_ORDER: 'is_shipping_order_mobile',
  IS_CHANGE_MOF: 'is_change_mof',
  IS_SHIPPING_ORDER_VAL: {
    IS: '1',
    NO: '0'
  },
  SHIPPING_FREE_FEE: 'shipping_free_fee',
  SHIPPING_FEE: 'shipping_fee',
  PANTRY_FREE_FEE: 'pantry_free_fee',
  GLOBAL_FREE_FEE: 'global_free_fee',
  PANTRY_FEE: 'pantry_fee',
  SALES_ORG_ID: 'NEW_SALES_ORG_ID',
  ALL_LANGUAGES: [
    { label: 'English', key: LANGUAGE_EN },
    { label: '简体中文', key: LANGUAGE_ZH },
    { label: '繁體中文', key: LANGUAGE_ZHT },
    { label: 'Español', key: LANGUAGE_ES },
    { label: '한국어', key: LANGUAGE_KO },
    { label: '日本語', key: LANGUAGE_JA },
    { label: 'Tiếng Việt', key: LANGUAGE_VI }
  ],
  SHARE_LANUAGES: [
    { label: 'English', key: LANGUAGE_EN },
    { label: '简', key: LANGUAGE_ZH },
    { label: '繁', key: LANGUAGE_ZHT_ALIAS },
    { label: 'Español', key: LANGUAGE_ES },
    { label: '한국어', key: LANGUAGE_KO },
    { label: '日本語', key: LANGUAGE_JA },
    { label: 'Tiếng Việt', key: LANGUAGE_VI }
  ],
  EMAIL_NOT_COLLECTED: 'show_collection_email_popup',
  IS_CHANGE_AREADY_SHIP_AREA: 'is_change_aready_ship_area',
  IS_CHANGE_SHIP_AREA: 'is_change_ship_area',
  IS_CHANGE_DELIVERY_AREA: 'is_change_delivery_area',
  LANGUAGE_ZHT_ALIAS: LANGUAGE_ZHT_ALIAS,
  LANGUAGE_ZHT: LANGUAGE_ZHT,
  LANGUAGE_ZH_ALIAS: LANGUAGE_ZH_ALIAS,
  LANGUAGE_ZH: LANGUAGE_ZH,
  LANGUAGE_EN: LANGUAGE_EN,
  LANGUAGE_KO: LANGUAGE_KO,
  LANGUAGE_JA: LANGUAGE_JA,
  LANGUAGE_VI: LANGUAGE_VI,
  LANGUAGE_ES: LANGUAGE_ES,
  LANGUAGE_CHINESE: LANGUAGE_CHINESE,
  LANGUAGE_CHINESE_LOCALE: LANGUAGE_CHINESE_LOCALE,
  LANGUAGE_CHINESE_T: LANGUAGE_CHINESE_T,
  LANGUAGE_CHINESE_ALTERNATE: LANGUAGE_CHINESE_ALTERNATE,
  LANGUAGES: [LANGUAGE_ZHT, LANGUAGE_ZH, LANGUAGE_EN, LANGUAGE_KO, LANGUAGE_JA, LANGUAGE_VI, LANGUAGE_ES],
  SEARCH_PAGE: 'restaurant_search_page',
  ORDER_SHARE_PAGE: 'order_share',
  COLLECTION_PAGE: 'collection_rtg',
  HOMEPAGE_BANNER: 'home_page_banner',
  HOMEPAGE_AD: 'home_page_ad',
  APP_SEARCH: '',
  APP_FIRST_WS: 'app_first_ws',
  APP_TAB_BAR: 'tab_bar',
  APP_CONTEXT: 'app-context',
  LANGUAGE_REGEXP_TWO: /^(\/)?(zht|zh|en|es|ko|ja|vi)?/,
  LANGUAGE_REGEXP: /^\/(zht|zh|en|es|ko|ja|vi)/,
  REGISTRATION_SUCCESS: 'registration_success',
  LOGIN_SUCCESS: 'login_success',
  STORE_THEME: 'store_theme',
  STORE_INFO: 'store_info',
  IS_SUPPORT_HOTDISH: 'is_support_hotdish',
  GUIDE_HOME_SHIP: 'GUIDE_HOME_SHIP',
  GUIDE_HOME_DELIVERY: 'GUIDE_HOME_DELIVERY',
  GUIDE_HOME_STORE: 'GUIDE_HOME_STORE',
  COOKIE_UPDATE_ADDRESS_ID: 'update_address_id',
  //checkout编辑地址返回不显示popups
  SHOW_CHECKOUT_POPS: 'show_checkout_popups',
  SELECT_ADDRESS: 'select_address',
  //登录注册邀请好友使用
  REFERRER_ID: 'referrer_id',
  REFERRER_ID_HEADER: 'Referrer-Id',
  //返利联盟使用
  REFERRAL_ID: 'referral_id',
  AFFILIATE_REFERRAL_ID: 'affiliate_referral_id',
  SHOW_HAWAII_POPUP: 'event_checkout_show_popup',
  USER_ID: 'user_id',
  IS_AFFILIATE: 'is_affiliate',
  INVITOR_ID: 'invitor_id',
  POST_TYPE: {
    VIDEO: 'video',
    REVIEW: 'review'
  },
  POST_SHORT_TYPE: {
    VIDEO: 'v',
    REVIEW: 'p'
  },
  POST_URL: {
    VIDEO: 'post',
    REVIEW: 'review'
  },
  REFERRER_SOURCE: 'referrer_source',
  LANGUAGE_CHINESE_T_ALIAS: 'zh-Hant',
  FINAL_URL: 'final_url',
  AFFILIATE_SHARE_COOKIE: 'me_affiliate_share',
  LANDING_STAMP_EXPIRES: 'landing_stamp_expires',
  WEEE_OFFICIAL_USER_ID: 5044,
  ORDER_PRODUCT_TYPE_TRADE_IN: 'trade_in',
  ORDER_PRODUCT_TYPE_GIFT: 'gift',
  META_CODE_WORKFLOW_STATUS_APPLYING: 'A',
  META_CODE_WORKFLOW_STATUS_REJECT: 'R',
  META_CODE_WORKFLOW_STATUS_FINISHED: 'F',
  META_CODE_WORKFLOW_STATUS_APPROVED: 'P',
  PDP_LANDING_STAMP_EXPIRES: 'pdp_landing_stamp_expires',
  APP_PURCHASE_REMINDER_EXPIRES: 'app_purchase_reminder_expires',
  SHOW_MORE_STORE_TOOLTIP: 'show_more_store_tooltip',
  ORDER_ID: 'ois',
  IS_NEW_PDP: 'is_new_pdp',
  //第一次访问的落地页
  LANDING_URL: 'landing_url',
  COMMON_EXPIRED_TIME: 3600 * 24 * 365 * 4,
  PRE_ORDER_ID: 'pre_order_id',
  EP_PARTNER: 'ep_partner',
  BIND_PHONE_COUPON: 'bind_phone_coupon',
  /** RTG 满折或满减 */
  ACTIVITY_FULL_DISCOUNT: 'full_discount',
  /** RTG 换购 */
  ACTIVITY_TRADE_IN: 'trade_in',
  /** RTG 满赠 */
  ACTIVITY_GIFT: 'gift',
  // promotion partner
  ACTIVITY_PROMOTION_POINT: 'promo_point',
  // tiktok live deal
  TIKTOK_LIVE_DEAL: 'tiktok_live_deal',
  APP_VERSION: 'app-version',
  PAID_W_SOURCES: [
    { value: 8, label: 'Chinese Online Ads' },
    { value: 9, label: 'Chinese Offline Ads' },
    { value: 12, label: 'Web Facebook  Ads' },
    { value: 22, label: 'Web Google Ads' },
    { value: 24, label: 'Bing' },
    { value: 26, label: 'Mediamath' },
    { value: 27, label: 'Impact' },
    { value: 28, label: 'Snapchat' },
    { value: 29, label: 'TikTok' },
    { value: 30, label: 'Chinese Display Ads' },
    { value: 31, label: 'Pinterest' }
  ],
  PUSH_TO_NATIVE: 'pushto=native',
  PUSH_TO_NATIVE_OBJECT: {
    KEY: 'pushto',
    VALUE: 'native'
  },
  IS_NEW_ONBOARDING: 'is_new_onboarding',
  IS_AGREE_PRIVACY_TERMS: 'isAgreePrivacyTerms',
  DEVICE_ID: 'device-id',
  BROWSER_TYPE: 'Browser-Type',
  BROWSER_TYPE_MAP: {
    TIKTOK: 'tiktok'
  },
  ZIPCODE: 'zipcode',
  DEAL_ID: 'deal_id',
  GOOGLEAPIKEY: 'AIzaSyBM4dygYOCBT__vB3ElckPPpz-ScRue4RY',
  IMGAGE_COMMON_ALT: 'Weee! - Groceries Delivered',
  GLOBAL_VENDERD_LIST: 'global_vender_list',
  ORDER_LIST_CACHE: 'order-list-store',
  VIEW_ID: 'view_id',
  PROFILE_INFO: 'profile_info',
  ORDER_NOTE: 'orderNote',
  REFERRER_PAGE_KEY: 'referrer_page_key',
  REFERRER_PAGE_URL: 'referrer_page_url',
  MEMBER_REBATE_PERCENT: 5,
  MEMBER_MAX_REBATE_PERCENT: 10,
  PROD_FEATURE_BIT_SALE: 2,
  GOODLIFE_SUCCESS_SHOWED: 'goodlife_success_showed',
  //是否已经微信登录过
  IS_WECHAT_LOGIN: 'is_wechat_login',
  //首页是否能够切换日期
  IS_HOME_CHANGE_DATE: 'is_home_change_date',
  //落地页的语言
  LANDING_LANGUAGE: 'landing_language',
  LANDING_LANGUAGE_HEADER: 'landing-lang',
  RTG_LIST_CACHE_STORE_KEY: 'restaruant-list-store',
  FREE_GIFT_RESULT: 'free_gift_result',
  TRADE_IN_LIMIT_AMOUNT: 68,
  MAXIMUM_TRADE_IN_PURCHASE_LIMIT: 5,
  MAXIMUM_TRADE_IN_PURCHASE_PER_ITEM_LIMIT: 1,
  COLD_PACK_CONFIG_KEY: 'package_pop_config',
  IS_INCONGNITO_MODE: 'is-incognito-mode'
};
