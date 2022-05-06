import nookies from "nookies";

export const deleteCookie = (key: string, ctx = {}) => {
  nookies.destroy(ctx, key, {
    path: "/",
    domain: process.env.DOMAIN_HOST || process.env.NEXT_PUBLIC_DOMAIN_HOST,
  });
};
