import { getUa } from "./getUa";

/**
 * 获取app的版本
 * @param ctx
 * @returns
 */
export const getAppVersion = (ctx?: any): string => {
  const ua = getUa(ctx);
  let appVersion = (ua?.match(/weeeapp ((\d+.){4})/i)?.[1] || "").trim() || "";
  return appVersion.split(".").slice(0, -1).join(".") || null;
};
