/**
 * 获取设备DPI
 * @param defaultDevicePixelRatio 默认DPI（如果取不到设备DPI，则使用这个）
 */
type GetDevicePixelRatio = (defaultDevicePixelRatio?: number) => number;

export const getDevicePixelRatio: GetDevicePixelRatio = defaultDevicePixelRatio => {
  const _defaultDevicePixelRatio = defaultDevicePixelRatio ?? 2;
  return globalThis?.devicePixelRatio ?? _defaultDevicePixelRatio;
};
