import { isSayWeeeApp } from "./isSayWeeeApp";
import { isIOS } from "./isIOS";
import { getAppVersionNum } from "./getAppVersionNum";

// ios 12.2.2 及其以上版本支持 ShowTabBar jscall
export function isIosSupportShowTabBar(ctx?: any) {
  const isWeeeIosApp = isSayWeeeApp(ctx) && isIOS(ctx);
  const { majorVersion, minorVersion, minVersion } = getAppVersionNum(ctx);
  const versionValid =
    isWeeeIosApp &&
    ((majorVersion === 12 && minorVersion >= 3) ||
      (majorVersion === 12 && minorVersion === 2 && minVersion >= 2) ||
      majorVersion >= 13);
  return versionValid;
}
