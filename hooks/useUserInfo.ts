import { useEffect, useState } from "react";
import { getCookie } from "@/utils/tools";
import { USER_ID, ZIP_CODE } from "@/constants/const";
import { getSimpleAccountInfo } from "@/api/customer";
import useTranslation from "next-translate/useTranslation";

export type UserInfoType = {
  userId?: number | string; // 用户ID
  userName?: string; // 昵称
  isVip?: boolean; // vip
  vipExpireTime?: number; // vip过期时间戳
  phone?: string; // 电话
  userImageUrl?: string; // 头像
  lang?: string;
  zipcode?: string;
};

export default function useUserInfo() {
  const [userInfo, setUserInfo] = useState<UserInfoType>();
  const { lang } = useTranslation("restaurant");

  const getUserInfo = async () => {
    const res = await getSimpleAccountInfo();
    const info = res?.object || {};
    return setUserInfo({
      userName: info?.alias || "",
      userImageUrl: info?.head_img_url || "",
      userId: info?.user_id || getCookie(USER_ID) || null,
      isVip: info?.member || false,
      vipExpireTime: info?.member_expire_timestamp || null,
      phone: info?.phone_number || "",
      lang: lang || "en",
      zipcode: info?.filter?.zipcode || getCookie(ZIP_CODE) || "",
    });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return {
    ...userInfo,
  };
}
