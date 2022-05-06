import {
  METHODS,
  RTG_WAVES,
  DELIVERY_WAVES,
  ONDEMAND_WAVES,
} from "constants/restaurant";
import { checkRtgIsValid } from "./checkRtgIsValid";

/**
 * 根据orderDates接口返回的default_delivery_state数据，判断当前模式是否符合
 * @param {RtgInfoType} rtgInfo
 * @param {string} date
 * @param {string} wave
 * @param {string} type
 * @returns
 */
const checkIsMatchTypeCondition = (orderDatesData: any, type: string) => {
  const od_delivery = orderDatesData?.od_delivery || false;
  const od_pickup = orderDatesData?.od_pickup || false;
  const can_order_days = orderDatesData?.can_order_days || [];
  const default_date =
    orderDatesData?.default_delivery_state?.delivery_date || "";
  const default_wave =
    orderDatesData?.default_delivery_state?.wave?.wave_seq || "";

  const isSupportOndemandVersion = true;
  // url 为空
  const isEmptyUrl = !default_date && !default_wave;
  // url wave 无效
  const isInvalidUrlWave = ![...DELIVERY_WAVES, ...ONDEMAND_WAVES, ""].includes(
    default_wave
  );
  // url wave === 8
  const isOdDeliveryWave = default_wave === RTG_WAVES.OD_DELIVERY;
  const isSupportOdDelivery = od_delivery && isSupportOndemandVersion;
  // url  wave === 0,1,2 && 不支持scheduled
  const isScheduledWave = DELIVERY_WAVES.includes(default_wave);
  const isSupportScheduled = can_order_days.length > 0;
  // url wave === 9 && 不支持odPickup
  const isOdPickupWave = default_wave === RTG_WAVES.OD_PICKUP;
  const isSupportOdPickup = od_pickup && isSupportOndemandVersion;

  if (type === METHODS.DELIVERY_ONDEMAND) {
    return (
      isSupportOdDelivery &&
      (isOdDeliveryWave ||
        isEmptyUrl ||
        isInvalidUrlWave ||
        (isOdPickupWave && !isSupportOdPickup) ||
        ((isScheduledWave || !!default_date) && !isSupportScheduled))
    );
  }
  if (type === METHODS.PICKUP_ONDEMAND) {
    return (
      isSupportOdPickup &&
      (isOdPickupWave ||
        isEmptyUrl ||
        isInvalidUrlWave ||
        (isOdDeliveryWave && !isSupportOdDelivery) ||
        ((isScheduledWave || !!default_date) && !isSupportScheduled))
    );
  }
  if (type === METHODS.SCHEDULED) {
    return (
      isSupportScheduled &&
      (isScheduledWave ||
        isEmptyUrl ||
        isInvalidUrlWave ||
        !!default_date ||
        (isOdDeliveryWave && !isSupportOdDelivery) ||
        (isOdPickupWave && !isSupportOdPickup))
    );
  }
};

/**
 * 根据 checkIsMatchTypeCondition 的模式，获取默认的时间和波次信息
 * @param orderDatesData
 * @param type
 * @returns
 */
const getDateWaveInfoByType = (orderDatesData: any, type: string) => {
  const can_order_days = orderDatesData?.can_order_days || [];
  if (type === METHODS.DELIVERY_ONDEMAND) {
    return {
      _date: "",
      _wave: RTG_WAVES.OD_DELIVERY,
    };
  }
  if (type === METHODS.SCHEDULED) {
    return {
      _date: can_order_days[0].delivery_date,
      _wave: can_order_days[0].wave[0].wave_seq,
    };
  }
  if (type === METHODS.PICKUP_ONDEMAND) {
    return {
      _date: "",
      _wave: RTG_WAVES.OD_PICKUP,
    };
  }
};
/**
 * 餐厅列表页面 通过order_dates default_delivery_state 字段 & url date 和 wave 判断默认的可用日期和波次
 * @param {ListOrderDatesType} orderDatesData
 * @returns
 */
const handlerRtgDefaultDataWave = (orderDatesData: any) => {
  const methodList = [
    METHODS.DELIVERY_ONDEMAND,
    METHODS.SCHEDULED,
    METHODS.PICKUP_ONDEMAND,
  ];
  for (let i = 0, len = methodList.length; i < len; i++) {
    let methodItem = methodList[i];
    if (checkIsMatchTypeCondition(orderDatesData, methodItem)) {
      return getDateWaveInfoByType(orderDatesData, methodItem);
    }
  }
};

/**
 * 餐厅列表
 * 通过URL date,wave参数和order_dates返回的数据，获取有效的date,wave
 * @param { urlDate: string; urlWaveSeq: string } urlParams
 * @param { ListOrderDatesType } orderDatesData
 * @returns { _date:string, _wave:string }
 */
export const getListDateWaveParameter = (
  urlParams: { urlDate: string; urlWaveSeq: string },
  orderDatesData: any
) => {
  let _date = "";
  let _wave = "";
  const { urlDate, urlWaveSeq } = urlParams;
  const isValid = checkRtgIsValid(orderDatesData);
  if (!isValid) return { _date, _wave };

  const can_order_days = orderDatesData?.can_order_days || [];
  // 当前地址/地区是否支持 ondemand delivery
  const isSupportOndemandDelivery = orderDatesData?.od_delivery || false;
  // 当前地址/地区是否支持 ondemand pickup
  const isSupportOndemandPickup = orderDatesData?.od_pickup || false;

  // APP版本是否支持ondemand
  const isSupportOndemandVersion = true;
  // 是否是有效的sheduled 波次
  const isScheduledExistWave = can_order_days?.find((item: any) =>
    item.wave.find((value: any) => value.wave_seq === urlWaveSeq)
  );
  // 是否是有效的shceduled 日期
  const isScheduledExistDate = !!urlDate
    ? can_order_days?.find((i: any) => i?.delivery_date === urlDate)
    : false;
  // 是否是空的波次,scheduled 会存在只选择日期的情况
  const isEmptyWaveSeq = ["", "-1"].includes(urlWaveSeq);

  if (
    isSupportOndemandDelivery &&
    urlWaveSeq === RTG_WAVES.OD_DELIVERY &&
    isSupportOndemandVersion
  ) {
    _date = "";
    _wave = urlWaveSeq;
  } else if (
    isSupportOndemandPickup &&
    urlWaveSeq === RTG_WAVES.OD_PICKUP &&
    isSupportOndemandVersion
  ) {
    _date = "";
    _wave = urlWaveSeq;
  } else if (isScheduledExistDate && isScheduledExistWave) {
    _date = urlDate;
    _wave = urlWaveSeq;
  } else if (isScheduledExistWave && !isScheduledExistDate) {
    _wave = urlWaveSeq;
    _date = isScheduledExistWave.delivery_date;
  } else if (!isScheduledExistWave && isScheduledExistDate) {
    _date = urlDate;
    _wave = isEmptyWaveSeq ? "" : isScheduledExistDate.wave[0].wave_seq;
  } else {
    return handlerRtgDefaultDataWave(orderDatesData);
  }
  return { _date, _wave };
};
