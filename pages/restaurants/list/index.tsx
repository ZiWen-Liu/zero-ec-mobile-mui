import { BannerCarousel } from "component/BannerCarousel";
import { useGetOrderDates } from "hooks/swr";
import { useGetRestaurants } from "hooks/swr/useGetRestaurants";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GetRestaurantsReqParams } from "@api.Restaurant";
import styles from "./index.module.css";
import { ShopCard } from "component/ShopCard";
import { DeliveryMethodSelector } from "component/DeliveryMethodSelector";
import Cuisines from "component/Cuisines";
import FilterTag from "component/FilterTag";
import { getListDateWaveParameter } from "utils/restaurant/getListDateWaveParameter";
import { isEmptyObject } from "utils/tools/isEmptyObject";

const PAGE_SIZE = 20;
const ZIP_CODE = "94538";
const ICON_SIZE = "20px";

export default function Home() {
  const [activeDate, setActiveDate] = useState("");
  const [activeWave, setActiveWave] = useState("");
  const [activeFilterTagId, setActiveFilterTagId] = useState<number | null>();
  const [activeCuisineId, setActiveCuisineId] = useState<number>();
  const [bannerData, setBannerData] = useState([]);
  const [isOndemandDelivery, setIsOndemandDelivery] = useState(false);
  const [isOndemandPickup, setIsOndemandPickup] = useState(false);
  const [scheduledSaleDays, setScheduledSaleDays] = useState([]);
  const [cuisineData, setCuisineData] = useState([]);
  const [filterTagData, setFilterTagData] = useState([]);

  /** 查询餐厅列表的参数 */
  const [listReqParams, setListReqParams] = useState<GetRestaurantsReqParams>({
    param: {
      zip_code: ZIP_CODE,
      date: activeDate,
      filter_tag_type: activeCuisineId || null,
      lat: 37.5042267,
      lon: -121.9643745,
      tag_id: activeFilterTagId || null,
      wave_seq: activeWave,
    },
    size: PAGE_SIZE,
    page: 1,
  });
  // hooks -start----------------------------------------------------------------------------------
  /** 餐馆列表初始化接口 */
  const {
    orderDatesRes,
    orderDatesData,
    orderDatesError,
    orderDatesIsLoading,
    orderDatesMutate,
    changeOrderDatesParams,
  } = useGetOrderDates(ZIP_CODE, activeDate, activeWave);

  /** 获取餐厅列表数据 */
  const {
    restaruantListData,
    listPageNumber,
    restaurantListMutate,
    setSize: setListPageNumber,
    isLoadingInitialData,
    isLoadingMore,
    isEnd: isReachingEnd,
  } = useGetRestaurants(listReqParams);
  // hooks -end -----------------------------------------------------------------------------------

  /** 餐厅列表数据 */
  const restaurantList = useMemo(() => {
    const _issues: any[] = [];
    restaruantListData?.forEach((_data: any) => {
      _data?.object?.restaurantResponses?.forEach((res: any) =>
        _issues.push(res),
      );
    });
    return _issues;
  }, [restaruantListData]);

  /**
   * 根据_app中的context初始化页面可用的filter
   * @returns
   */
  const initPageFilterParams = useCallback(() => {
    const ricepo_support = orderDatesData?.ricepo_support ?? false;
    const { _date, _wave }: any = getListDateWaveParameter(
      { urlDate: activeDate, urlWaveSeq: activeWave },
      orderDatesData,
    );
    return {
      availableDate: _date,
      availableWave: _wave,
      availableTagId: activeFilterTagId,
      availableCuisine: activeCuisineId,
      ricepoSupportFromRes: ricepo_support,
    };
  }, [
    activeCuisineId,
    activeDate,
    activeFilterTagId,
    activeWave,
    orderDatesData,
  ]);

  const getRestaurantList = useCallback(
    (
      date = activeDate,
      wave_seq = activeWave,
      cuisineKey = activeCuisineId || null,
      filterTagKey = activeFilterTagId || null,
      lat = 37.5042267,
      lon = -121.9643745,
      page_number?: number,
    ) => {
      const _wave = wave_seq === "-1" ? "" : wave_seq;
      setListReqParams({
        param: {
          zip_code: ZIP_CODE,
          date,
          wave_seq: _wave,
          tag_id: cuisineKey,
          filter_tag_type: filterTagKey,
          lat,
          lon,
        },
        size: PAGE_SIZE,
        page: page_number || 1,
      });
      page_number && setListPageNumber(page_number);
    },
    [
      activeCuisineId,
      activeDate,
      activeFilterTagId,
      activeWave,
      setListPageNumber,
    ],
  );

  const fetchData = useCallback(async () => {
    const { availableDate, availableWave, availableTagId, availableCuisine } =
      initPageFilterParams();
    // 调用接口完成后，再根据接口返回数据进行埋点
    getRestaurantList(
      availableDate,
      availableWave,
      availableCuisine,
      availableTagId,
      orderDatesData?.lat || 0,
      orderDatesData?.lon || 0,
      1,
    );
    // getThemedCarousel(
    //   availableDate,
    //   availableWave,
    //   availableCuisine,
    //   availableTagId,
    //   orderDatesData?.lat || 0,
    //   orderDatesData?.lon || 0
    // );
    setActiveDate(availableDate);
    setActiveWave(availableWave);
    setActiveCuisineId(availableCuisine);
    setActiveFilterTagId(availableTagId);
  }, [
    getRestaurantList,
    initPageFilterParams,
    orderDatesData?.lat,
    orderDatesData?.lon,
  ]);

  const goToSearch = () => {
    console.log("GO TO RTG Cart");
  };

  const goToGlobalCart = () => {
    window.location.href = "https://tb1.sayweee.net/cart";
  };

  const handlerFilter = useCallback(
    (item: number | null) => {
      setActiveFilterTagId(item);
      // getThemedCarousel(activeDate, activeWave, activeCuisineId, item);
      getRestaurantList(activeDate, activeWave, activeCuisineId, item);
    },
    [getRestaurantList, activeDate, activeWave, activeCuisineId],
  );

  // 点击菜系分类，进行接口请求筛选轮播及列表页数据
  const handlerCuisines = useCallback(
    (cuisine: number): void => {
      setActiveCuisineId(cuisine);
      // getThemedCarousel(activeDate, activeWave, cuisine, activeFilterTagId);
      getRestaurantList(activeDate, activeWave, cuisine, activeFilterTagId);
    },
    [getRestaurantList, activeDate, activeWave, activeFilterTagId],
  );

  // TODO update TS config
  useEffect(() => {
    if (orderDatesRes && !isEmptyObject(orderDatesRes)) {
      fetchData();
    }
    setBannerData(orderDatesData?.banner_carousel_list || []);
    setScheduledSaleDays(orderDatesData?.can_order_days || []);
    setIsOndemandDelivery(orderDatesData?.od_delivery || false);
    setIsOndemandPickup(orderDatesData?.od_pickup || false);
    setCuisineData(orderDatesData?.cuisine_types || []);
    setFilterTagData(orderDatesData?.filter_tag_list || []);
  }, [orderDatesData, fetchData, orderDatesRes]);

  return (
    <div>
      {/* <BannerCarousel data={bannerData} /> */}
      <DeliveryMethodSelector
        scheduledSaleDays={scheduledSaleDays}
        isOndemandDeliver={isOndemandDelivery}
        isOndemandPickup={isOndemandPickup}
        onclick={(date, wave) => {
          console.log(date);
          console.log(wave);

          setActiveDate(date);
          setActiveWave(wave);
          fetchData();
        }}
      />
      <Cuisines
        cuisinesData={cuisineData}
        idPrefix={"home-page-cusine"}
        onClick={handlerCuisines}
        cuisine={activeCuisineId}
      />
      <FilterTag
        filterTags={filterTagData}
        idPrefix={"home-page-filter-tag"}
        filters={activeFilterTagId}
        onClick={handlerFilter}
      />
      {restaurantList?.map((item, index) => (
        <ShopCard key={`restaurant-list-item=${index}`} item={item} />
      ))}
    </div>
  );
}
