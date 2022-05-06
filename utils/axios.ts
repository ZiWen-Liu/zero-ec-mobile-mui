// @ts-nocheck

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import nookies from "nookies";
import qs from "qs";
import Consts from "@/constants/const-old";

import Constants from "@/constants/const-old";
import {
  buildUrlWithOrigin,
  deleteCookie,
  getAppVersion,
  isIOS,
  isSayWeeeApp,
  isServer,
  updateSessionTokenMaxAge,
  isTiktokBrowser,
  isAlipayBrowser,
} from "@/utils/tools";

import logger from "./logger";

export interface NewAxiosRequestConfig extends AxiosRequestConfig {
  ctx?: any;
  token?: string;
  startTime?: number;
  dataVersion?: number;
}

interface NewAxiosInstance extends AxiosInstance {
  get<T = any, R = AResponse>(
    url: string,
    params?: ObjectType,
    config?: NewAxiosRequestConfig,
  ): Promise<R>;
  all?<T>(values: (T | Promise<T>)[]): Promise<T[]>;
}

/**
 * 默认异常
 */
const DEFAULT_ERROR = {
  message_id: "9999",
  result: false,
  message: "system error!",
  object: null,
};

const BROSWER_TYPE_CONDITIONS = [
  {
    judge: isTiktokBrowser,
    value: Consts.BROWSER_TYPE_MAP.TIKTOK,
  },
  {
    judge: isAlipayBrowser,
    value: "",
  },
  {
    judge: () => true,
    value: "",
  },
];

/**
 * 需要设置的cookies
 */
const ATTRS = [
  {
    attr: [Consts.B_COOKIE],
    setAttr: Consts.B_COOKIE_IN_HEADER,
    setValue: (value) => value,
  },
  {
    attr: [Consts.WEEE_SESSION_TOKEN],
    setAttr: Consts.WEEE_HEADER_SESSION_TOKEN,
    setValue: (value) => value,
  },
  {
    attr: [Consts.AUTH_TOKEN],
    setAttr: Consts.AUTH_TOKEN_IN_HEADERS,
    setValue: (value) => `Bearer ${value}`,
  },
  {
    attr: [Consts.LANG, Consts.LANGUAGE],
    setAttr: Consts.LANG,
    setValue: (value) => {
      if (value === Consts.LANGUAGE_ZHT) {
        return Consts.LANGUAGE_ZHT_ALIAS;
      }
      if (value === Consts.LANGUAGE_ZH_ALIAS) {
        return Consts.LANGUAGE_ZH;
      }
      return value;
    },
  },
  {
    attr: [Consts.WEEE_STORE],
    setAttr: Consts.WEEE_STORE,
    setValue: (value) => value,
  },
  {
    attr: [Consts.DEVICE_ID],
    setAttr: Consts.DEVICE_ID,
    setValue: (value) => value,
  },
  {
    attr: [Consts.ZIP_CODE],
    setAttr: Consts.ZIPCODE,
    setValue: (value) => value,
  },
  {
    attr: [Consts.REFERRER_ID],
    setAttr: Consts.REFERRER_ID_HEADER,
    setValue: (value) => value,
  },
  {
    attr: [Consts.LANDING_LANGUAGE],
    setAttr: Consts.LANDING_LANGUAGE_HEADER,
    setValue: (value) => value,
  },
];

const ADD_HADERS = [
  {
    setAttr: Consts.BROWSER_TYPE,
    setValue: (ctx?) => {
      return BROSWER_TYPE_CONDITIONS.find(({ judge }) => {
        return judge(ctx);
      }).value;
    },
  },
];

/**
 * 设置header
 * @param instance
 */
const addHeaderRequestFilter = (instance) => {
  instance.defaults.headers.common["Content-Type"] =
    "application/json;charset=UTF-8";
  instance.defaults.headers.common["Cache-Control"] = "no-cache";

  instance.interceptors.request.use((config) => {
    const ctx = config.ctx;
    const cookies = nookies.get(ctx) || {};
    ATTRS.forEach((item) => {
      const selected = item.attr.filter(
        (param) => !!cookies[param] || !!ctx?.req?.[param],
      );

      if (selected?.length) {
        const value = ctx?.req?.[selected[0]] || cookies[selected[0]];
        if (value) {
          config.headers = {
            ...config.headers,
            [item.setAttr]: item.setValue(value),
          };
        }
      }
    });
    //添加
    ADD_HADERS.forEach((item) => {
      const value = item.setValue(ctx);
      if (value) {
        config.headers = {
          ...config.headers,
          [item.setAttr]: value,
        };
      }
    });

    if (!config.headers.Authorization) {
      config.headers.Authorization = process.env.STATIC_TOKEN; //区分了build后的测试环境和生产环境
    }

    if (isServer) {
      config.headers["X-Forwarded-For"] = `${
        ctx?.req?.headers?.["x-forwarded-for"]?.split(",")?.[0] || ""
      }`;
      config.headers["User-Agent"] = ctx?.req?.headers?.["user-agent"];
      config.headers["X-B3-TraceId"] =
        ctx?.req?.headers?.["x-b3-traceid"] || "";
      config.headers["X-B3-SpanId"] = ctx?.req?.headers?.["x-b3-spanid"] || "";
    }
    if (isSayWeeeApp(ctx)) {
      if (isIOS(ctx)) {
        config.headers["Platform"] = "ios";
      } else {
        config.headers["Platform"] = "android";
      }
    }
    config.headers[Constants.APP_VERSION] = getAppVersion(ctx);
    delete config.ctx;
    config.startTime = new Date().getTime();
    return config;
  });
};

/**
 * 处理返回值，异常
 * @param instance
 */
const addResponseFilter = (instance) => {
  instance.interceptors.response.use(
    function (response: AxiosResponse<AResponse>) {
      const config: NewAxiosRequestConfig = response.config;
      const duration = new Date().getTime() - config.startTime;
      const data: AResponse = response.data;
      if (!isServer) {
        updateSessionTokenMaxAge();
      }
      if (isServer) {
        logger.info({
          method: response?.request?.method,
          api: `${response?.config?.baseURL}${response?.config?.url}`,
          headers: JSON.stringify(response?.config?.headers),
          params: JSON.stringify(response?.config?.data),
          response: JSON.stringify(data),
          duration: duration,
        });
      }
      return Promise.resolve(data);
    },
    function (error) {
      const status = error?.response?.status;
      if (!isServer) {
        const loginUrl = "/account/login";
        const signupUrl = "/account/signup";
        switch (status) {
          case 401:
            deleteCookie(Constants.AUTH_TOKEN);
            if (
              window.location.href.indexOf(loginUrl) < 0 &&
              window.location.href.indexOf(signupUrl) < 0
            ) {
              window.location.href = buildUrlWithOrigin(
                `/account/login?redirect_url=${encodeURIComponent(
                  window.location.href,
                )}`,
              );
            }
            break;
          default:
            try {
              if (status >= 400) {
                axios.post(
                  `${
                    process.env.API_HOST || process.env.NEXT_PUBLIC_API_HOST
                  }/ec/content/logs`,
                  {
                    method: `${error?.request?.method}`,
                    api: `${error?.config?.baseURL}${error?.config?.url}`,
                    data: JSON.stringify(error?.config?.data),
                    headers: JSON.stringify(error?.config?.headers),
                    err_msg: JSON.stringify(error?.response),
                  },
                );
              }
            } catch (error) {}

            break;
        }
      }
      if (isServer) {
        const config: NewAxiosRequestConfig = error.config || {};
        const response = error?.response || {};
        const duration = new Date().getTime() - config.startTime;
        try {
          logger.error({
            method: error?.request?.method,
            api: `${config?.baseURL}${config?.url}`,
            headers: JSON.stringify(config?.headers),
            message: `${response?.message}`,
            data: JSON.stringify(response.data || ""),
            status: `${response.status}`,
            params: JSON.stringify(config?.data),
            dataMessage: JSON.stringify(response.data?.error || ""),
            duration: duration,
          });
        } catch (error) {}
      }

      return Promise.resolve(DEFAULT_ERROR);
    },
  );
};

/**
 *  method proxy
 * @param instance
 */
const addGetMethodFilter = (instance) => {
  const _get = instance.get;
  instance.get = (url, params, config) => {
    const { cache = false, ...rest } = params || {};
    if (!isServer && cache) {
      const key = `${url}`;
      const clearCache = cache === "restore";
      const data = window[key];
      if (data && !clearCache) {
        return data;
      }

      let promise = _get(
        `${url}${qs.stringify(rest, { addQueryPrefix: true })}`,
        config,
      ).catch(() => {
        delete window[key];
      });
      window[key] = promise;
      return promise;
    }
    return _get(
      `${url}${qs.stringify(params, { addQueryPrefix: true })}`,
      config,
    );
  };
};

const createInstance = () => {
  const instance: NewAxiosInstance = axios.create({
    withCredentials: false,
    timeout: 10000,
    baseURL: process.env.API_HOST || process.env.NEXT_PUBLIC_API_HOST,
    headers: {
      Platform: "h5",
    },
  });

  addGetMethodFilter(instance);
  addHeaderRequestFilter(instance);
  addResponseFilter(instance);

  instance.all = axios.all;

  return instance;
};

export default createInstance();
