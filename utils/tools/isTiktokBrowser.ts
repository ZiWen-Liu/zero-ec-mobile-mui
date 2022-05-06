import { getUa } from "./getUa";

/**
 * 判断是否在抖音客户端打开
 */
export function isTiktokBrowser(ctx?: any) {
  const ua = getUa(ctx);
  return /musical|trill/i.test(ua);
}
