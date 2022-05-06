// import { PICKUP_WAVES, METHODS, RTG_WAVE_SEQ, DELIVERY_WAVES } from '@/constants/restaurant';

// /**
//  * check当前list选中的是那种deliver method
//  * @param date 日期
//  * @param wave 波次
//  * @returns
//  */
// export const checkActiveMethod = (date: string, wave: string) => {
//   if ([...PICKUP_WAVES].includes(wave)) {
//     return METHODS.PICKUP;
//   }
//   if (RTG_WAVE_SEQ.PICKUP_ONDEMAND === wave) {
//     return METHODS.PICKUP_ONDEMAND;
//   }
//   if (wave === RTG_WAVE_SEQ.DELIVERY_ONDEMAND) {
//     return METHODS.DELIVERY_ONDEMAND;
//   }
//   if (DELIVERY_WAVES.includes(wave) || date) {
//     return METHODS.SCHEDULED;
//   }
//   return '';
// };
export {}