import { getUa } from "./getUa";

/**
 * 判断是否app打开
 */
export const isSayWeeeApp = (ctx?: any) => {
  const ua = getUa(ctx);
  if (ua) {
    return ua.indexOf("weeeapp") > -1;
  } else {
    return false;
  }
};
