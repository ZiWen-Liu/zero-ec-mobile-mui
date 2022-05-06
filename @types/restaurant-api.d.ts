declare module "@api.Restaurant" {
  import * as T from "@/types/restaurant";

  type AResponse<T = any> = {
    /** 优惠券金额 单位:$ */
    amount: number;
    /** 优惠券代码 */
    code: string;
    expiresAt: string;
  };

  type GetRicepoCouponInfoResObj = {
    /** 优惠券金额 单位:$ */
    amount: number;
    /** 优惠券代码 */
    code: string;
    expiresAt: string;
  };

  // RICEPO逻辑(minimum maximum 相关判断逻辑):
  // minimum == 0 && maximum > 0 最多选max个
  // minimum > 0 && maximum == 0 最少选min个
  // minimum > 0 && maximum == minimum 一定要选择min个，不能少也不能多（必选）
  // minimum > 0 && maximum > minimum 选择 minimum ～ maximum 个 不能少于min也不能多于max
  type GetDishOptionResObj = {
    product_id: number;
    id: number;
    ref_id: string;
    merchant_product_extra_id: number;
    name_zh: string;
    name: string;
    name_en: string;
    name_zht: string;
    minimum: number;
    seq: number;
    maximum: number;
    option_required: boolean;
    option_single: boolean;
    rec_create_time: Date;
    rec_update_time: Date;
    /** 加购金额限制 为null不限制 */
    minimum_price: number | null;
    items: {
      id: number;
      ref_id: string;
      merchant_id: number;
      name_zh: string;
      name_en: string;
      name_zht: string;
      name: string;
      price: number;
      popularity: number | null;
      seq: number;
      /** 是否可选 */
      available: boolean;
      rec_create_time?: any;
      rec_update_time?: any;
    }[];
  }[];

  // type 1 表示on delivery; 2 表示on pickup
  type GetOndemandPreOrderWindowReqObj = {
    type: string;
    venderId: number;
    zip_code: string;
    productIdList?: Array<number>;
  };

  // RICEPO 优惠券 -----------------------------------------------------------------
  type GetRicepoCouponsResObj = {
    amount: number;
    expiresAt: string;
    code: string;
  };

  // RTG 优惠券 --------------------------------------------------------------------
  type GetCouponsInfoResObj = {
    amount: number;
    code: string;
    interest: string;
  };

  // Banner carousel -------------------------------------------------------------
  interface BannerCarouselItem {
    img_url: string;
    detail: string;
    type: string;
    sub_type: string;
    storefront: any[];
  }

  type GetBannerCarouselResObj = {
    carousels: BannerCarouselItem[];
    _CORE_COST_: number;
  };

  // share info ------------------------------------------------------------------
  type GetShareInfoReqParam = {
    type: string;
    product_id: string;
  };

  type ShareInfoItem = {
    id: number;
    lang: string;
    link_url: string;
    share_img_url: string;
    share_text: string;
    title: string;
    type: string;
  };

  type GetShareInfoResObj = {
    type: string;
    name_en?: any;
    name?: any;
    vender_name?: any;
    txt?: any;
    logo_url?: any;
    image_url?: any;
    share_info: ShareInfoItem[];
    restaurant_detail_share_info?: any;
    rebate_info?: any;
    invitor_info?: any;
    user_ids: string[];
  };

  // 更改hotdish date 调用接口 -------------------------------------------------------
  type ChangeHotdishDateReqParam = {
    // 配送日期
    delivery_pickup_date: string;
    // 是否直接强制删除购物车失效商品，设置为true时不会返回失效商品 s
    force: boolean;
    // 1=列表页, 2=详情页, 3=(具体作用不详)
    type: number;
    // 餐厅ID,列表页面传null
    vendor_id: number | null;
    deal_id?: number;
  };

  // 餐厅列表主题轮播 ---------------------------------------------------------------
  type GetThemedCarouselsReqParams = {
    zip_code: string;
    date: string;
    wave_seq: string;
    // 经度
    lon: number;
    // 纬度
    lat: number;
    // 菜系id
    tag_id?: number | null;
    // 小标签类型
    filter_tag_type?: number | null;
  };

  type GetThemedCarouselsResObj = {
    groupName: string;
    groupId: number;
    restaurants: {
      title: string;
      vender_id: number;
      address: string;
      description?: any;
      businessStatus: string;
      logo_url: string;
      image_url: string;
      open_day?: any;
      tag: string[];
      business_hours?: any;
      free_delivery_price: number;
      restaurant_pos: number;
      priority: number;
      rec_create_time?: any;
      tagline?: any;
      tag_id: number[];
      unavailable?: any;
      top: boolean;
      top_ranking: number;
      default_wave_seq?: any;
      product_infos_five?: any;
      pickup_available: string;
      ricepo_tags?: any;
      out_url?: any;
      ondemand: boolean;
      ondemand_only: boolean;
      business: T.OndemandBusinessProps;
      estimate?: T.OndemandEstimateProps;
      ref_id?: any;
      shipping_free_fee: number;
      shipping_free_fee_vip: number;
      reward_tip: string;
    }[];
  }[];

  // 餐厅列表数据 ------------------------------------------------------------------
  type GetRestaurantsReqParams = {
    page: number;
    size: number;
    param: {
      zip_code: string;
      date: string;
      // 纬度
      lat: number;
      // 经度
      lon: number;
      wave_seq: string;
      // 菜系tag
      tag_id?: number | null;
      // 小标签tag
      filter_tag_type?: number | null;
    };
  };

  type GetRestaurantsResObj = {
    restaurantResponses: {
      title: string;
      vender_id: number;
      address: string;
      description?: any;
      businessStatus: string;
      logo_url: string;
      image_url: string;
      open_day?: any;
      tag: string[];
      business_hours?: any;
      free_delivery_price: number;
      restaurant_pos: number;
      priority: number;
      rec_create_time?: any;
      tagline?: any;
      tag_id: number[];
      unavailable?: any;
      top: boolean;
      top_ranking: number;
      default_wave_seq?: any;
      product_infos_five?: any;
      pickup_available: string;
      ricepo_tags?: any;
      out_url?: any;
      ondemand: boolean;
      ondemand_only: boolean;
      business: T.OndemandBusinessProps;
      estimate: T.OndemandEstimateProps;
      ref_id?: any;
      shipping_free_fee: number;
      shipping_free_fee_vip: number;
      reward_tip: string;
    }[];
    merchantTagResponse: {
      id: number;
      tag_name?: any;
      tag_name_zht?: any;
      tag_name_en?: any;
      filter_status: boolean;
      filter_level?: any;
      type?: any;
      ref_key?: any;
      rec_create_time?: any;
      rec_update_time?: any;
      name: string;
    }[];
    carouselGroupResponse?: any;
    tag_id?: number | null;
    window?: any;
  };

  // order dates 接口 -----------------------------------------------------------

  type GetOrderDatesReqParam = {
    zip_code: string;
    date?: string;
    wave_seq?: string;
    lat?: number;
    lon?: number;
  };

  type GetOrderDatesResObj = {
    show_wave: boolean;
    // 当前zipcode 是否支持scheduled picop -- 当前scheduled pickup 已下线
    pickup_open: boolean;
    // 当前zipcode 是否支持on业务  -- 这个字段当前代码工程中未使用
    ondemand_open: boolean;
    // 当前是否支持od_delivery
    od_delivery: boolean;
    // 当前是否支持od_pickup
    od_pickup: boolean;
    // od_delivery 的帖子ID
    od_delivery_deal_id: number;
    // od_pickup 的帖子ID
    od_pickup_deal_id: number;
    // 当前zipcode是否支持ricepo
    ricepo_support: boolean;
    // 默认选中的模式 schedule / on_demand
    default_delivery_state: T.defaultDeliveryState;
    // 当前zipcode scheduled 可销售的日期
    can_order_days: T.ScheduledDatesProps[];
    // 第一页的列表数据
    restaurant_list: T.RestaurantItemProps[];
    // 根据当前用户的信息获取的经度
    lon: number;
    // 根据当前用户的信息获取的纬度
    lat: number;
    // 菜系list
    cuisine_types: Array<T.CuisineTypes>;
    // filter tag list
    filter_tag_list: Array<T.filterTagsProps>;
  };
}
