import { getUa } from "./getUa";

export const isAlipayBrowser = function (ctx?: any) {
  const ua = getUa(ctx);
  return /alipay/i.test(ua);
};
