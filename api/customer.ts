import { NewAxiosRequestConfig } from "@/utils/axios";
import fetch from "@/utils/axios";

/**
 * 获取用户简要信息
 * @param params
 * @param config
 */
export const getSimpleAccountInfo = (
  config?: NewAxiosRequestConfig,
): Promise<AResponse> => {
  return fetch.get(`/ec/customer/account/info`, {}, config);
};
