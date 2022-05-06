// @ts-nocheck
export const buildUrlWithOrigin = (path: string) => {
  const host = process.env.WEB_HOST || process.env.NEXT_PUBLIC_WEB_HOST;
  if (path.indexOf(host) === -1) {
    if (path[0] === "/") {
      return `${host}${path || ""}`;
    } else {
      return `${host}/${path || ""}`;
    }
  } else {
    return path;
  }
};
