import { getAppVersionNum, isIOS, isMobile, isSayWeeeApp } from "@/utils/tools";

export const SUPPORT_HEADER_ARG = "Y";
export const NOT_SUPPORT_HEADER_ARG = "N";

// ondemand pre order --------------------------------------------------
export const ONDEMAND_PRE_ORDER_VERSION = {
  ios: ["14.3"],
  android: ["13.7"],
};

export const PRE_ORDER_ARG = "preorder";

// dish option ---------------------------------------------------------
export const DISH_OPTION_VERSION = {
  ios: ["14.1"],
  android: ["13.4"],
};

export const DISH_OPTION_HEADER_ARG = "options-version";

// ondemand ------------------------------------------------------------

export const ONDEMAND_VERSION = {
  ios: ["13.8"],
  android: ["13.1"],
};

export const ONDEMAND_ARG = "inner-test";

// 支持RICEPO导流 --------------------------------------------------------
export const RICEPO_VERSION = {
  ios: ["13.1.1"],
  android: ["12.5.2"],
};

// scheduled pickup ----------------------------------------------------
export const PICKUP_VERSION = {
  ios: ["12.6"],
  android: ["12.1"],
};

// group order ---------------------------------------------------------
export const GROUP_ORDER_VERSION = {
  ios: ["12.9"],
  android: ["12.3.1"],
};

/* Android 11.5以上，iOS<12.2.2 使用a标签而不是前端路由 给app捕获显隐app tabbar */
export const TABBAR_VERSION = {
  ios: [0, "12.2.2"],
  android: ["11.5"],
  h5: false,
  pc: false,
};

/* Android 11.5以上，iOS 12.1以上 header上搜索框在左侧 */
export const TABBAR_HEADER_VERSION = {
  ios: ["12.1"],
  android: ["11.5"],
  h5: false,
  pc: false,
};

export const NO_NATIVE_NAVIGATION_VERSION = {
  ios: ["13.4.1"],
  android: ["12.8"],
};

/** 安卓13.6及以上版本支持RTG新header */
export const RTG_HEADER_ADDRESS_VERSION = {
  android: ["13.6"],
  ios: true,
};
/**************************************************************************************** */

type versionParam = string | number;

type currentAppVersionParam = {
  majorVersion?: number;
  minorVersion?: number;
  minVersion?: number;
};

/**
 * 当版本号(current_version) >= 下临界版本号(threshold_version)
 * @param current_version 当前设备的版本号
 * @param threshold_version 下临界版本号
 */
const lowerThresholdValid = (
  threshold_version: versionParam,
  current_version: currentAppVersionParam,
) => {
  // boolean 直接返回结果，true支持，false 不支持
  if (typeof threshold_version === "boolean") return threshold_version;
  // string | number 当前设备版本号和阈值版本对比
  if (
    typeof threshold_version === "string" ||
    typeof threshold_version === "number"
  ) {
    const [major = 0, minor = 0, min = 0] =
      String(threshold_version).split(".");
    const {
      majorVersion = 0,
      minorVersion = 0,
      minVersion = 0,
    } = current_version;
    if (majorVersion > +major) return true;
    if (majorVersion === +major && minorVersion > +minor) return true;
    return (
      majorVersion === +major && minorVersion === +minor && minVersion >= +min
    );
  }
  // 其他类型阈值版本号入参，暂不支持，返回false
  return false;
};

/**
 * 当版本号(current_version) < 上临界版本号(threshold_version)
 * @param current_version 当前设备的版本号
 * @param threshold_version 上临界版本号
 */
const upperThresholdValid = (
  threshold_version: versionParam,
  current_version: currentAppVersionParam,
) => {
  // boolean 直接返回结果，true支持，false 不支持
  if (typeof threshold_version === "boolean") return threshold_version;
  // string | number 当前设备版本号和阈值版本对比
  if (
    typeof threshold_version === "string" ||
    typeof threshold_version === "number"
  ) {
    const [major = 0, minor = 0, min = 0] =
      String(threshold_version).split(".");
    const {
      majorVersion = 0,
      minorVersion = 0,
      minVersion = 0,
    } = current_version;
    if (majorVersion < +major) return true;
    if (majorVersion === +major && minorVersion < +minor) return true;
    return (
      majorVersion === +major && minorVersion === +minor && minVersion < +min
    );
  }
  // 其他类型阈值版本号入参，暂不支持，返回false
  return false;
};

/**
 * 上不包含下包含[a,b] => return value >= a && value < b ; [c] => return value >=c
 * @param threshold_version
 * @returns
 */
const thresholdValid = (
  threshold_version: Array<versionParam> | boolean,
  context?: any,
) => {
  if (typeof threshold_version === "boolean") return threshold_version;
  if (
    Object.prototype.toString.call(threshold_version) == "[object Array]" &&
    threshold_version.length > 0
  ) {
    const versionNums = getAppVersionNum(context);
    const [lower, upper] = threshold_version;
    if (threshold_version.length === 1) {
      return lowerThresholdValid(lower, versionNums);
    }
    if (+lower === 0) {
      return upperThresholdValid(upper, versionNums);
    }
    return (
      lowerThresholdValid(lower, versionNums) &&
      upperThresholdValid(upper, versionNums)
    );
  }
  return false;
};

type appVersionsParam = {
  ios?: Array<versionParam> | boolean;
  android?: Array<versionParam> | boolean;
  h5?: boolean;
  pc?: boolean;
};

/**
 * 根据平台是否可用，以及阈值版本号判断某功能是否开启
 * @param ios
 * @param android
 * @param h5
 * @param pc
 * @returns
 */
export default function isSupport(versions: appVersionsParam, context?: any) {
  const { ios = false, android = false, h5 = true, pc = true } = versions;
  const isApp = isSayWeeeApp(context);

  const isH5 = !isApp && isMobile();

  if (isApp) {
    return isIOS(context)
      ? thresholdValid(ios, context)
      : thresholdValid(android, context);
  }
  if (isH5) {
    return h5;
  }
  return pc;
}
