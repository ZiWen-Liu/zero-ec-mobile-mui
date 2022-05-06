export const getUa = (ctx?: any) => {
  const ua =
    typeof window === "undefined"
      ? ctx?.req?.headers?.["user-agent"]?.toLowerCase()
      : window?.navigator?.userAgent?.toLowerCase();
  return ua || "";
};
