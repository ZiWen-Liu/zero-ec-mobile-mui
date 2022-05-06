const isServer: boolean = typeof window === "undefined";

export const getOrigin = (ctx?: any) => {
  if (isServer) {
    const req = ctx?.req;
    return `${req?.protocol}://${req?.hostname}`;
  }
  return window.location.origin;
};
