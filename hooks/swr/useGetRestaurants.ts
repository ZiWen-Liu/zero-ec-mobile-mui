import useSWRInfinite from "swr/infinite";
import axios from "axios";
import { GetRestaurantsReqParams } from "@api.Restaurant";

import { useEffect } from "react";

type SWRKey = {
  url: string;
  params: GetRestaurantsReqParams;
};

const API_URL = "/ec/mkpl/restaurants";

const header = {
  authority: "api.tb1.sayweee.net",
  pragma: "no-cache",
  "cache-control": "no-cache",
  zipcode: "95134",
  "options-version": "Y",
  authorization:
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwYWQzMjBkNC1iMGJmLTRkOTMtYmU0OS1kMTViNzc4NTRhNTQiLCJ1c2VyX2lkIjoiNzYzNjI1MSIsImtpZCI6Ijg2MGViNDhjLTA0MWYtNDVhNy1hMDE5LTA2ZDc2MjQyNmE2MyIsImlzcyI6ImlzdGlvQHNheXdlZWUuY29tIiwiZXhwIjoxNjUzNDc1MzE2LCJpc19sb2dpbiI6dHJ1ZX0.M325lpxCr2jFMK1abmwBJD-bRgzZb8DubvkOHk-2Tvq0606UCAi1afqm7_DpQ_OM6XtHf2m_ByIZ9FzRF9bjE6gM12CNhEWOE1SBMKnTWr9L3jPTg2WDTnbmwLx21wXvo9C6dSPFo8LQp0JH2IjDzc7cvi7irFLvlPE3CV2HcIw",
  "landing-lang": "zh",
  lang: "zh",
  "device-id": "2392e0a6-d264-42f6-815e-187ed3786d10",
  preorder: "Y",
  "weee-session-token": "30526",
  "inner-test": "Y",
  "b-cookie": "24211",
  "user-agent":
    "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
  accept: "application/json, text/plain, */*",
  platform: "h5",
  "app-version": "null",
  origin: "https://tb1.sayweee.net",
  "sec-fetch-site": "same-site",
  "sec-fetch-mode": "cors",
  "sec-fetch-dest": "empty",
  referer: "https://tb1.sayweee.net/",
  "accept-language": "zh-CN,zh;q=0.9",
  "content-type": "application/json;charset=UTF-8",
};

const fetcher = (swrKey: SWRKey) => {
  return axios
    .post(swrKey.url, swrKey.params, {
      baseURL: "https://api.tb1.sayweee.net",
      headers: header,
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const useGetRestaurants = (params: GetRestaurantsReqParams) => {
  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite<
    any,
    Error
  >(
    (index): SWRKey | null => {
      if (!params) return null;
      const { date, wave_seq, lat, lon } = params.param;
      if (!date && !wave_seq) return null;
      if (lat === undefined || lon === undefined) return null;
      return {
        url: API_URL,
        // page从0开始
        params: { page: index, size: params.size, param: params.param },
      };
    },
    (swrKey: SWRKey) => fetcher(swrKey)
  );

  useEffect(() => {
    console.log("useGetRestaurants data: ", data);
  }, [data]);

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    !isLoadingInitialData &&
    size > 0 &&
    data &&
    typeof data[size - 1] === "undefined";
  const isRefreshing = isValidating && data && data.length === size;
  const isEnd =
    (data &&
      (!data[size - 1]?.result ||
        data[size - 1]?.object?.restaurantResponses === null)) ||
    false;

  return {
    restaruantListData: data,
    restaurantListMutate: mutate,
    listPageNumber: size,
    setSize,
    isLoadingInitialData,
    isLoadingMore,
    isRefreshing,
    isEnd,
  };
};
