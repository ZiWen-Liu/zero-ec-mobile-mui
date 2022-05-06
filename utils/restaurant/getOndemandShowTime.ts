import { METHODS } from '@/constants/restaurant';
import { Translate } from 'next-translate';

/**
 * 根据餐厅详情的接口返回，获取ondemand 开店时Deliver ASAP  button子标题文案 - ETA时间
 * @param {string} type 区分 ondemand delivery 还是 ondemand pickup
 * @param {any} rtgInfo
 * @param {string} t
 * @returns
 */

// FIXME TS
export const getOndemandEtaTime = (rtgInfo: any, type: string, t: Translate) => {
  let showTime = '';
  if (type === METHODS.DELIVERY_ONDEMAND) {
    const min = rtgInfo?.estimate?.min || 0;
    const max = rtgInfo?.estimate?.max || 0;
    if (max > 0 && min > 0 && max >= min) {
      showTime = t('detail.delivery_method.eta', { min, max });
    }
  }

  return showTime;
};
