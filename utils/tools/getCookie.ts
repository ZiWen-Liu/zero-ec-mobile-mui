import nookies from "nookies";

/**
 * 获取cookies
 * @param key
 * @param ctx client端为空
 */
export const getCookie = (key: string, ctx?: any) => {
  const cookies = nookies.get(ctx || {}) || {};
  return cookies[key];
};
