import nookies from "nookies";

// @ts-nocheck

export const setCookie = (
  key: string,
  value: string,
  ctx?: any,
  config?: any,
) => {
  config = config ?? {};
  const cookies =
    nookies.set(ctx || {}, key, value, {
      ...config,
      path: "/",
      domain: process.env.DOMAIN_HOST || process.env.NEXT_PUBLIC_DOMAIN_HOST,
    }) || ({} as any);
  return cookies[key];
};
