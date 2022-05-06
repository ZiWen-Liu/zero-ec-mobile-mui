// import { isEmptyObject } from '@/utils/tool';
// import { METHODS } from '@/constants/restaurant';
// import { getOndemandInfos } from './getOndemandInfos';
// import isSupport, { ONDEMAND_PRE_ORDER_VERSION } from '../isSupport';
// import dayjs from 'dayjs';
// import utc from 'dayjs/plugin/utc';
// import timezone from 'dayjs/plugin/timezone';
// import { OndemandBusinessProps } from '@/types/restaurant';

// dayjs.extend(utc);
// dayjs.extend(timezone);

// /**
//  * 根据餐厅信息，和当前用户选择的配送方式，判断是否关店，相关业务：
//  * 1. 展示关店蒙层，及提示信息
//  * 2. 菜品不能加购
//  * @param rtgInfo
//  * @param activeMethod
//  * @param type
//  * @returns
//  */
// export const checkOndemandIsClosed = (rtgInfo, activeMethod = '', type?: string) => {
//   if (!rtgInfo || isEmptyObject(rtgInfo)) return false;
//   // 是否支持pre order
//   const isSupportPreOrder = isSupport(ONDEMAND_PRE_ORDER_VERSION);
//   const { isClosedDown, isClosed, isOnly } = getOndemandInfos(rtgInfo, type);
//   // 当前是否是ondemand模式
//   const isOndemand = isOnly || [METHODS.DELIVERY_ONDEMAND, METHODS.PICKUP_ONDEMAND].includes(activeMethod);
//   // 根据是否支持pre order 判断餐厅是否展为关店 -- 1. 不能加购；2. 展示mask 蒙层
//   const isClose = isSupportPreOrder ? isClosedDown : isClosed || isClosedDown;
//   return isClose && isOndemand;
// };

// /**
//  * 根据餐厅开店时间，判断pre order 是否是有效的，如果开店时间是7天之后，则视为无效
//  * @param {OndemandBusinessProps} openDate
//  * @returns {boolean}
//  */
// export const checkPreOrderIsValid = (business: OndemandBusinessProps, timeZone?: string) => {
//   const openDate = business?.open_date_time || '';
//   const isClosed = business?.closed || false;
//   if (!openDate || !isClosed) return false;
//   const tz = timeZone || dayjs.tz.guess();
//   // Tip: openDay是后端已经计算好的，用户对应时区的时间，不需要再计算时区
//   const openDay = dayjs(openDate).format('YYYY-MM-DD');
//   const now = dayjs().tz(tz).format('YYYY-MM-DD');
//   const diffMillisecond = dayjs(openDay).diff(dayjs(now));
//   const stepMillisecond = 8 * 24 * 60 * 60 * 1000;
//   if (diffMillisecond < 0) return false;
//   return diffMillisecond < stepMillisecond;
// };

// export const checkOndemandShopIsValid = (rtgInfo, activeMethod = '', type?: string) => {
//   const isOndemand = [METHODS.DELIVERY_ONDEMAND, METHODS.PICKUP_ONDEMAND].includes(activeMethod);
//   const { isClosed } = getOndemandInfos(rtgInfo, type);
//   return (
//     isOndemand &&
//     (checkOndemandIsClosed(rtgInfo, activeMethod, type) ||
//       (isClosed && !checkPreOrderIsValid(rtgInfo?.business || {}, rtgInfo.timeZone || '')))
//   );
// };
export {}