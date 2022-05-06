import { RestaurentInfoProps, RestaurantItemProps } from '@/types/restaurant';

/**
 * 使用场景：餐厅列表，餐厅详情
 * 根据餐厅信息获取餐厅是否支持ondemand,是否打烊，闭店等信息， 默认为detail页面接口数据，list页面需要传参数type = 'list'
 * @param {RestaurentInfoProps & RestaurantItemProps} info
 * @param {string} type
 * @returns
 */
export const getOndemandInfos = (info: RestaurentInfoProps & RestaurantItemProps, type = 'detail') => {
  let isSupport_ondemand = false;
  let isSupport_delivery = null;
  let isSupport_pickup = null;
  if (type === 'list') {
    isSupport_ondemand = info?.ondemand || false;
  } else {
    // @ts-ignore:next-line
    // FIXME TS
    isSupport_ondemand = info?.od_delivery || info?.od_pickup;
    isSupport_delivery = info?.od_delivery || false;
    isSupport_pickup = info?.od_pickup || false;
  }
  const isClosed = info?.business?.closed || false;
  const openTime = info?.business?.open_date_time || '';
  const meal_type_list = info?.meal_type_list || [];
  let onlyOndemand = false;
  if (type === 'list') {
    onlyOndemand = info?.ondemand_only || false;
  } else {
    onlyOndemand = (meal_type_list.length == 0 && isSupport_ondemand) || info?.ondemand_only || false;
  }
  return {
    /** 当前餐厅是否支持ondemand */
    isSupport: isSupport_ondemand,
    /** 当前餐厅是否支持 ondemand delivery */
    isSupportOdDelivery: isSupport_delivery,
    /** 当前餐厅是否支持 ondemand pickup */
    isSupportOdPickup: isSupport_pickup,
    /** 当前餐厅是只支持ondemand */
    isOnly: onlyOndemand,
    /** 餐厅是否打烊 */
    isClosed: isClosed && !!openTime,
    /** 餐厅是否闭店 */
    isClosedDown: isClosed && !openTime,
    /** 餐厅正常经营 -- 餐厅支持ondemand 并且没有歇业 */
    isBusiness: isSupport_ondemand && !(isClosed && !openTime),
    /** 餐厅正常营业，没有打烊，也没有歇业 */
    isOpen: isSupport_ondemand && !isClosed
  };
};
