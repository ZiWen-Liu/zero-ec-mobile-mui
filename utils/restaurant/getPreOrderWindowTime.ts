import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Translate } from 'next-translate';

dayjs.extend(utc);
dayjs.extend(timezone);
/**
 * 根据preOrder 时间窗，展示最早窗口的起始时间
 * @param {number} start 开始时间
 * @param {number} end 结束时间
 * @param {Translate} t 多语言翻译方法
 * @param {string} lang 当前语言
 * @param {string} timeZone  时区
 * @returns {string}
 */

/**
 *   判断日期是否为今天，参数为时间戳，需要给出对应的时区，默认按照浏览器解析的设备时区
 * @param compareDate
 * @param timeZone
 * @returns
 */
const isToday = (compareDate: number, timeZone = '') => {
  if (!dayjs(compareDate).isValid()) return;
  if (!timeZone) {
    timeZone = dayjs.tz.guess();
  }
  let date = dayjs(compareDate).tz(timeZone).format('YYYY-MM-DD');
  let now = dayjs().tz(timeZone).format('YYYY-MM-DD');

  return date === now;
};

/**
 *   判断日期是否为明天，参数为时间戳，需要给出对应的时区，默认按照浏览器解析的设备时区
 * @param compareDate
 * @param timeZone
 * @returns
 */
const isTomorrow = (compareDate: number, timeZone = '') => {
  if (!dayjs(compareDate).isValid()) return;
  if (!timeZone) {
    timeZone = dayjs.tz.guess();
  }
  let date = dayjs(compareDate).tz(timeZone).format('YYYY-MM-DD');
  let tomorrow = dayjs().tz(timeZone).add(1, 'day').format('YYYY-MM-DD');

  return date === tomorrow;
};

export const getPreOrderWindowTime = (start: number, end: number, t: Translate, lang: string, timeZone?: string) => {
  if (!dayjs(start).isValid()) return;
  if (!dayjs(end).isValid()) return;
  // 获取转换时间的时区
  if (!timeZone) {
    timeZone = dayjs.tz.guess();
  }
  // 将语言转换为 dayjs 可以识别的本地化格式
  const locale = lang === 'zh' ? 'zh-cn' : lang === 'zht' ? 'zh-tw' : lang;

  const startDate = dayjs(start).tz(timeZone);
  const endDate = dayjs(end).tz(timeZone);

  const date = startDate.locale(locale).format('ddd');

  const startTime = startDate.format('h:mm A');
  const endTime = endDate.format('h:mm A');

  let showTime = '';
  if (isToday(start, timeZone)) {
    // showTime = isValidEndDate ? `${startTime} - ${endTime}` : startTime;
    showTime = endTime;
  } else if (isTomorrow(start, timeZone)) {
    // showTime = `${t('tomorrow')}, ${startTime}`;
    showTime = `${date}, ${endTime}`;
  } else {
    showTime = `${date}, ${endTime}`;
  }
  return showTime;
};
