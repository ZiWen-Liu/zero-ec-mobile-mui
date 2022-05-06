import useSWR from "swr";
import axios from "axios";
import { GetOrderDatesReqParam } from "@api.Restaurant";
import { useRef } from "react";

type SWRKey = {
  url: string;
  params: GetOrderDatesReqParam;
};

const API_URL = "/ec/mkpl/order_dates/init";

const header = {
  authority: "api.tb1.sayweee.net",
  pragma: " no-cache",
  "cache-control": " no-cache",
  "weee-store": " cn",
  "inner-test": " Y",
  "b-cookie": " 305",
  authorization:
    " Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwYWQzMjBkNC1iMGJmLTRkOTMtYmU0OS1kMTViNzc4NTRhNTQiLCJ1c2VyX2lkIjoiNzYzNjI1MSIsImtpZCI6Ijg2MGViNDhjLTA0MWYtNDVhNy1hMDE5LTA2ZDc2MjQyNmE2MyIsImlzcyI6ImlzdGlvQHNheXdlZWUuY29tIiwiZXhwIjoxNjUzNDc1MzE2LCJpc19sb2dpbiI6dHJ1ZX0.M325lpxCr2jFMK1abmwBJD-bRgzZb8DubvkOHk-2Tvq0606UCAi1afqm7_DpQ_OM6XtHf2m_ByIZ9FzRF9bjE6gM12CNhEWOE1SBMKnTWr9L3jPTg2WDTnbmwLx21wXvo9C6dSPFo8LQp0JH2IjDzc7cvi7irFLvlPE3CV2HcIw",
  accept: " application/json, text/plain, */*",
  "user-agent":
    " Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
  platform: " h5",
  lang: " zh",
  "device-id": " 2392e0a6-d264-42f6-815e-187ed3786d10",
  "weee-session-token": " 13497",
  zipcode: " 95132",
  "app-version": " null",
  origin: " https://tb1.sayweee.net",
  "sec-fetch-site": " same-site",
  "sec-fetch-mode": " cors",
  "sec-fetch-dest": " empty",
  referer: " https://tb1.sayweee.net/",
  "accept-language": " zh-CN,zh;q=0.9",
};

export const useGetOrderDates = (
  zipcode: string,
  date: string,
  wave: string
) => {
  const paramsRef = useRef<any>(null);

  const changeOrderDatesParams = (params: GetOrderDatesReqParam) => {
    paramsRef.current = params;
  };

  const fetcher = (swrKey: SWRKey) => {
    return axios
      .get(swrKey.url, {
        baseURL: "https://api.tb1.sayweee.net",
        headers: header,
        params: swrKey.params,
      })
      .then(function (response) {
        return response?.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  let params = { zip_code: zipcode };
  if (date) {
    params = { ...params, ...{ date: date } };
  }
  if (wave) {
    params = { ...params, ...{ wave_seq: wave } };
  }
  if (paramsRef.current) {
    params = { ...params, ...paramsRef.current };
  }
  const swrKey: SWRKey = {
    url: API_URL,
    params: params,
  };
  const { data, error, isValidating, mutate } = useSWR<any, Error, SWRKey>(
    swrKey || null,
    fetcher
  );

  return {
    orderDatesRes: data,
    orderDatesData: data?.object,
    orderDatesError: error,
    orderDatesIsValidating: isValidating,
    orderDatesIsLoading: !error && !data,
    orderDatesMutate: mutate,
    changeOrderDatesParams: changeOrderDatesParams,
  };
};
