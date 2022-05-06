import { createContext, FC, useContext, useMemo } from "react";
import { isSayWeeeApp as isSayWeeeAppFunc } from "@/utils/tools";
import isSupport, {
  TABBAR_VERSION,
  TABBAR_HEADER_VERSION,
  PICKUP_VERSION,
  GROUP_ORDER_VERSION,
  ONDEMAND_VERSION,
  DISH_OPTION_VERSION,
  ONDEMAND_PRE_ORDER_VERSION,
} from "utils/isSupport";
import useUserInfo, { UserInfoType } from "./useUserInfo";

interface ToolsApi {
  isSupportTabBar: boolean;
  isSupportTabBarHeader: boolean;
  isSupportPickupVersion: boolean;
  isSupportGroupBuyVersion: boolean;
  isSupportOndemandVersion: boolean;
  isSupportDishOptionVersion: boolean;
  isSupportPreOrderVersion: boolean;
  isSayWeeeApp: boolean;
  userInfo: UserInfoType;
}

const initData = {
  isSupportTabBar: false,
  isSupportTabBarHeader: false,
  isSupportPickupVersion: false,
  isSupportGroupBuyVersion: false,
  isSupportOndemandVersion: false,
  isSupportDishOptionVersion: false,
  isSupportPreOrderVersion: false,
  isSayWeeeApp: false,
  userInfo: {},
};

const Context = createContext<ToolsApi>(initData);

const useClientTools = () => {
  const toolsApi = useContext(Context);
  return {
    ...toolsApi,
  };
};

export const ClientToolsProvider: FC<any> = ({ children }) => {
  const userInfo = useUserInfo();

  const isSupportTabBar = useMemo(() => {
    return isSupport(TABBAR_VERSION);
  }, []);

  const isSupportTabBarHeader = useMemo(() => {
    return isSupport(TABBAR_HEADER_VERSION);
  }, []);

  const isSupportPickupVersion = useMemo(() => {
    return isSupport(PICKUP_VERSION);
  }, []);

  const isSupportGroupBuyVersion = useMemo(() => {
    return isSupport(GROUP_ORDER_VERSION);
  }, []);

  const isSayWeeeApp = useMemo(() => {
    return isSayWeeeAppFunc();
  }, []);

  const isSupportOndemandVersion = useMemo(() => {
    return isSupport(ONDEMAND_VERSION);
  }, []);

  const isSupportDishOptionVersion = useMemo(() => {
    return isSupport(DISH_OPTION_VERSION);
  }, []);

  const isSupportPreOrderVersion = useMemo(() => {
    return isSupport(ONDEMAND_PRE_ORDER_VERSION);
  }, []);

  /**
   * 防止匿名对象每次都re-render
   */
  const apis = useMemo(() => {
    return {
      isSupportTabBar,
      isSupportTabBarHeader,
      isSupportPickupVersion,
      isSupportGroupBuyVersion,
      isSupportOndemandVersion,
      isSupportDishOptionVersion,
      isSupportPreOrderVersion,
      isSayWeeeApp,
      userInfo,
    };
  }, [
    isSupportTabBar,
    isSupportTabBarHeader,
    isSupportPickupVersion,
    isSupportGroupBuyVersion,
    isSupportOndemandVersion,
    isSupportDishOptionVersion,
    isSupportPreOrderVersion,
    isSayWeeeApp,
    userInfo,
  ]);

  return <Context.Provider value={apis}>{children}</Context.Provider>;
};

export default useClientTools;
