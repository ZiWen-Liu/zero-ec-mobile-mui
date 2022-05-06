import { DeliveryMode } from "@/constants/restaurant";

type RtgSwiperImages = {
  id: number;
  product_id: number;
  image_url: string;
  rec_create_time: string;
  rec_update_time: string;
  sales_org_id: string;
  thirty_days_count: number;
  vender_id: number;
};
/**
 * 餐馆列表Item
 */
type RestaurantItem = {
  /** */
  logo_url: string;
  /**店铺图片 */
  image_url: string;
  /**店铺名 */
  title: string;
  description: string;
  tag: string[];
  free_delivery_price: number;
  shipping_free_fee_vip: number;
  shipping_free_fee: number;
  /* 可自提 */
  pickup_available?: string;
  /** 商户id*/
  vender_id: number;
  /**营业状态*/
  business_status: boolean;
  /**星期几的列表*/
  day_of_week: string[];
  /**开放时间*/
  open_day: number[];
  /** 餐厅活动促销标签 */
  tagline: string;
  /**filter ids */
  tag_id?: number[];
  /* on-demand 餐厅tags */
  ricepo_tags?: string[];
  /* VIP 返利 tag */
  reward_tip?: string;
  /**当前餐馆是否可用 */
  unavailable: boolean;
  /** 餐馆优惠活动的波次*/
  promotion_wave_seq?: string;
  product_infos_five: RtgSwiperImages[];
  ondemand: boolean;
  ondemand_only?: boolean;
  estimate: OndemandEstimateProps;
  business: OndemandBusinessProps;
  timeZone: string;
};
/**
 * 餐馆轮播Group
 */
type CarouselItemProps = {
  groupName: string;
  groupId: number;
  restaurants: RestaurantItemProps[];
};
export type ResaurantsProps = {
  restaurantResponses: RestaurantItemProps[];
  merchantTagResponse: filterTagsProps[];
  carouselGroupResponse?: CarouselItemProps[];
};

export type RestaurantItemProps = Partial<RestaurantItem>;

/**
 * 餐厅实体
 */
type RestaurentInfo = {
  id: number;
  /**店铺名*/
  title: string;
  /**店铺地址*/
  address: string;
  /**店铺描述*/
  description: string;
  /**营业状态*/
  business_status: string;
  /**店铺logo*/
  img_logo: string;
  /**店铺图片 */
  image_url: string;
  /**logo图片*/
  logo_url: string;
  /**售卖时间*/
  sale_days: Partial<{
    delivery_date: string;
    wave: WaveItemProps[];
  }>[];
  meal_type_list: Sale_Days[];
  /**下单截止时间 */
  cut_time: stirng;
  /**费运费价格*/
  free_delivery_price: number;
  shipping_free_fee_vip: number;
  shipping_free_fee: number;
  /* 可自提 */
  pickup_available?: string;
  /* VIP返利的tag  */
  reward_tip?: string;
  /**口味*/
  tag: stirng[];
  /**筛选餐厅用的tag 如[菜系id,...]  */
  tag_id?: number[];
  /* ricepo 餐厅tag信息 */
  ricepo_tags?: string[];
  /** '0‘ 有热送服务 但不在当前销售区域 ’1‘当前区域无热送服务*/
  sale_status?: string;
  od_delivery?: boolean;
  od_delivery_deal_id?: number;
  od_pickup?: boolean;
  od_pickup_deal_id?: number;
  od_delivery_price?: string; // 配送費用
  ondemand_only?: boolean;
  estimate: OndemandEstimateProps;
  business: OndemandBusinessProps;
  timeZone: string;
};
type WaveItemProps = Partial<{
  deal_id: number;
  end_time: number;
  cut_time: string;
  wave_seq: string;
  wave_name: string;
  delivery_time: string;
  seq: number;
}>;
export type RestaurentInfoProps = Partial<RestaurentInfo>;

type RestaurentMenu = {
  /**店铺名 */
  title: string;
  /**描述*/
  description: string;
  /**描述html */
  description_html: string;
  /**优惠价格 */
  price: number;
  /** 原始价格，可能为空，没有表示没做过特价活动*/
  base_price: number;
  /**会员价格*/
  member_price: number;
  /**口味*/
  tags: string[];
  /**商品图片 */
  img_url: string;
  /**商品大图 */
  img_url_big: string;
  /**可售数量*/
  quantity: number;
  /**营业状态*/
  business_status: string;
  /**售卖地区*/
  zone_id: string;
  /**商品id*/
  product_id: number;
  /**库存 */
  quantity: number;
  /**已售数量*/
  quantity_sale: number;
  /** 最大可加购数量 */
  max_order_quantity: number;
  /** ui 扩展属性*/
  cartQty: number;
  vender_id: number;
  /** 超过5，是就打折扣标签,如果不是按折扣设的特价就没有，如果没有设优惠价也没有，默认是null，null就不打标签 */
  discount_percentage: number;
  /**店铺名 */
  vender_name?: string;
  /**价格类型 */
  price_type?: string;
  source?: string;
};

export type waveProps = Partial<{
  wave_seq: string;
  wave_name: string;
  delivery_time_full: string;
  delivery_time: string;
  seq: number;
  /** 用户选择的送餐波次相关的id*/
  deal_id: number;
}>;
export type ScheduledDatesProps = {
  delivery_date: string;
  wave: null | waveProps[];
  pickup?: null | PickupDates[];
};
/**
 * 餐馆详情扩展信息, 在原类型上新增的
 */
export type Sale_Days = {
  wave_type: number;
  wave_type_name: string;
  sale_days: ScheduledDatesProps[];
};
/**
 * 餐馆自提波次类型说明
 */
export type PickupDates = {
  addr_address: null | string;
  addr_apt: null | string;
  addr_city: null | string;
  addr_country: null | number;
  addr_state: null | string;
  addr_zipcode: null | string;
  address: null | string;
  discount: null | number;
  id: number;
  menu_id: number;
  pickup_interval: string;
  pickup_time: string;
  vender_id: number;
  wave_seq: string;
  deal_id: number;
  wave_name: string;
  pickup_time_range: { end_time: string; start_time: string; id: number }[];
  pickup_time_sale_range: {
    end_time: string;
    start_time: string;
    id: number;
  }[];
};
export type RestaurentMenuProps = Partial<RestaurentMenu>;

export type filterTagsProps = {
  label: string;
  key: number;
};

export type CuisineTypes = {
  img_url: string;
  key: number;
  label: string;
};

export type categoryProps = Partial<{
  category_id: number;
  category_name: string;
  dishes: RestaurentMenuProps[];
}>;

export type OndemandBusinessProps = Partial<{
  vender: number | string;
  closed: boolean;
  closed_tip: string;
  open_date_time: string;
  pre_order_closed_tip: string;
}>;

export type OndemandEstimateProps = Partial<{
  min: number;
  max: number;
  avg: number;
  start: string;
  end: string;
}>;

export type CouponDiscountProps = Partial<{
  /**砍单进来的折扣倒计时 */
  code: string;
  percentage: string;
  current_stamptime: number;
  expiration_stamptime: number;
}>;
/**优惠券 */
export type couponsInfo = {
  code?: string;
  interest: string;
};

/* 餐馆赠品 */
export type giftInfoProps = Partial<{
  type: number /**type=0是金额满赠，1是数量满赠 */;
  gift_name: string;
  price_threshold: number;
  sku_threshold: number;
  quantity: number /**赠品数量 */;
}>;

/* 餐馆换购 */
export type promotionProps = Partial<{
  amount_threshold: number; // 满足换购条件的金额阈值
  order_promo_sku_threshold: number; // 允许的最大换购数量
  promotionProductInfos: any[]; // 可换购的商品
  sku_threshold: number; // 满足换购条件的数量阈值
  threshold_type: number; // 换购的类型：0:金额阈值换购; 1:数量阈值换购
}>;

/**缓存对象 */
export type listStorage = {
  items: ResaurantsProps;
  banner: any[];
  dates: any[];
  date: string;
  wave: string;
  filter: string;
  couponsInfo: any;
  scrollY?: number;
  pickup_open: boolean; // 当前区域是否支持自提
  ricepo_support: boolean; // 当前区域是否支持ricepo APP导流
  anyRtgSupportPickup: boolean;
};
/**优惠活动对象 */
export type ActivityTopicInfo = {
  activity_type?: number;
  discount_topic?: any;
  gift_topic?: any;
  promotion_topic?: any;
};

/* 拼单订单波次信息 */
export type groupOrderWaveInfo = {
  hotdish_wave?: string;
  hotdish_wave_time?: string;
  wave_seq?: string;
  wave_name?: string;
  wave_name_en?: string;
};

/* 拼单订单 * list页面查询接口返回的数据 */
export type GroupbuyItem = {
  delivery_date: string;
  hotdishWave: groupOrderWaveInfo;
  key: string;
  user_id: string;
  user_name: string;
  vendor_id: number;
  vendor_name: string;
  status: string;
};

/* 拼单订单 * 详情接口返回的数据 */
export type GroupOrderInfoProps = Partial<{
  vendor_id?: number;
  vendor_name?: string;
  zipcode?: string;
  user_id?: number;
  user_name?: string;
  is_creator?: boolean; //是否开团人  true/false
  status?: string; // 拼单状态 A active , L lock , F finished , C cancelled
  key?: string;
  delivery_date?: string;
  delivery_mode?: DeliveryMode; //配送方式，配送：delivery，自提：pickup
  address?: string; // 如果配送方式是：自提，地址为商家地址
  addr_address?: string;
  addr_firstname?: string;
  addr_lastname?: string;
  addr_apt?: string;
  addr_country?: string;
  addr_state?: string;
  addr_city?: string;
  addr_zipcode?: string;
  pickup_time?: string; //自提时间
  deal_id?: number;
  hotdishWave?: groupOrderWaveInfo;
  start_time?: number; //开团时间
  end_time?: number; //结团时间
}>;

export type RicepoCouponInfo = {
  /** 优惠券金额 单位:$ */
  amount: number;
  /** 优惠券代码 */
  code: string;
  expiresAt: string;
};

export type DefaultDeliveryState = {
  delivery_date: string | null;
  wave: {
    deal_id: number | null;
    delivery_time: string | null;
    delivery_time_full: string | null;
    seq: number | null;
    wave_name: string | null;
    wave_seq: string | null;
  };
};

export type ListOrderDatesType = Partial<{
  // scheduled 的可销售日期
  can_order_days: Array<ScheduledDatesProps>;
  // 是否支持ondemand delivery
  od_delivery: boolean;
  // 是否支持ondemand pickup
  od_pickup: boolean;
  // ondemand delivery deal id
  od_delivery_deal_id: number;
  // ondemand pickup deal id
  od_pickup_deal_id: number;
  // 默认选中的配送模式
  default_delivery_state: DefaultDeliveryState;
  // 是否支持ricepo
  ricepo_support: boolean;
}>;
