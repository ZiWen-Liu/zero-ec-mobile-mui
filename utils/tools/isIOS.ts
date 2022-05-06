import { getUa } from "./getUa";

/**
 * 是否是ios 不是ios就是安卓
 * @param ctx
 */
export const isIOS = function (ctx?: any) {
  const ua = getUa(ctx);
  if (ua) {
    return !!ua?.match(/(iPad|iPhone|iPod)/i);
  } else {
    return false;
  }
};
