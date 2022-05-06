import { getUa } from "./getUa";

export const getAppVersionNum = (ctx?: any) => {
  const ua = getUa(ctx);
  const version = ua?.match(/weeeapp ((\d+.){4})/i)?.[1];
  const [majorVersion = 0, minorVersion = 0, minVersion = 0] = (version || "")
    .trim()
    .slice(0, -5)
    .split(".");
  return {
    majorVersion: +majorVersion,
    minorVersion: +minorVersion,
    minVersion: +minVersion,
  };
};
