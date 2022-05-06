import { FC, memo, useMemo } from "react";
import classNames from "classnames";
import Trans from "next-translate/Trans";
import useTranslation from "next-translate/useTranslation";
// components
import { WeeeIcon } from "../@common/WeeeIcon";
import Swiper, { SwiperSlide } from "../@common/Swiper";
import { showLoading } from "../@common/Indicator/pageIndicator";
import { Pagination } from "../@common/NumberPagination";
// tools
import { getOrigin, isIosSupportShowTabBar } from "utils/tools";
import callAppFunction from "@/utils/bridge";
// import isEqual from "@/utils/isEqual";
import useClientTools from "@/hooks/useClientTools";
// constants
import { RICEPO } from "@/constants/restaurant";
import Constants from "@/constants/const-old";
// type
import { RicepoCouponInfo } from "@/types/restaurant";

// styles
import styles from "./index.module.css";
import isSupport, { RICEPO_VERSION } from "@/utils/isSupport";
import { CroppedImage, RTG_BANNER } from "../@common/CroppedImage";

type CouponBannerProps = {
  className?: string;
  discount: string;
  /** 是否只render优惠券Banner */
  isSingleCouponBanner?: boolean;
};
/**
 * 优惠券Banner
 */
// eslint-disable-next-line react/display-name
const CouponBanner: FC<CouponBannerProps> = memo(
  ({ className, discount, isSingleCouponBanner = false }) => {
    const { t } = useTranslation("restaurant");

    const iosSupportShowTabBarVersion = isIosSupportShowTabBar();

    const jumpToCoupon = () => {
      const origin = getOrigin();
      window.location.href = `${origin}/coupon/me?ws=rtg_top_banner`;
      iosSupportShowTabBarVersion &&
        callAppFunction("showTabBar", { isShow: false });
    };
    return (
      <div onClick={jumpToCoupon} className={classNames(className)}>
        <div className={classNames(styles.bannerConfig, styles.couponBanner)}>
          <div className={styles.bannerText}>
            <span className={styles.couponBannerDiscount}>
              {t("list.coupon_banner.take_discount_off", {
                discount: discount,
              })}
            </span>
            <span
              className={
                isSingleCouponBanner
                  ? styles.singleCouponBannerExpires
                  : styles.couponBannerExpires
              }
            >
              {t("list.coupon_banner.enjoy_before_expore")}
            </span>
            <span className={styles.couponBannerSeeDetail}>
              {t("list.coupon_banner.see_detail")}{" "}
              <WeeeIcon type="iconrightarrow" className={styles.detailIcon} />
            </span>
          </div>
        </div>
      </div>
    );
  },
);

type RicepoCouponBannerProps = {
  item: DisplayBanner;
  ricepoCouponInfo: RicepoCouponInfo;
};

// eslint-disable-next-line react/display-name
const RicepoCouponBanner: FC<RicepoCouponBannerProps> = memo(
  ({ item, ricepoCouponInfo }) => {
    // hooks start
    const { t } = useTranslation("restaurant");
    // hooks end

    const onBannerClick = () => {
      if (!item.detail || typeof item.detail !== "string") {
        return;
      }

      if (item.detail.includes("ricepo")) {
        showLoading();
        window.location.href = `${item?.detail}`;
      }
    };

    // render functions start
    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onBannerClick();
        }}
      >
        <div
          className={classNames(styles.bannerConfig, styles.ricepoCouponBanner)}
        >
          <div className={styles.bannerText}>
            <span className={styles.ricepoBannerTitle}>
              <Trans
                i18nKey={"restaurant:list.ricepo_banner.title"}
                values={{
                  amount: ricepoCouponInfo.amount,
                }}
                components={{
                  red: <span style={{ color: "#E1383A" }}></span>,
                  br: <br />,
                }}
              />
            </span>
            <span className={styles.ricepoBannerCode}>
              {ricepoCouponInfo.code}
            </span>
            <span className={styles.ricepoBannerBtn}>
              {t("list.ricepo_banner.start_now")}
            </span>
          </div>
        </div>
      </div>
    );
    // render functions end
  },
);

type BannerProps = {
  item: DisplayBanner;
  date: string;
  wave: string;
};

/**
 * 普通Banner
 */
// eslint-disable-next-line react/display-name
const Banner: FC<BannerProps> = memo(({ item, date, wave }) => {
  // 点击Banner图跳转到对应页面
  const onBannerClick = (item: any) => {
    if (!item || !item?.detail || typeof item?.detail !== "string") return;
    let linkUrl = `${item?.detail}&date=${date}&wave=${wave}`;
    // Ricepo Banner
    if (item?.detail.includes("ricepo")) {
      linkUrl = item?.detail;
    }
    showLoading();
    window.location.href = linkUrl;
  };

  return (
    <div
      className={classNames(styles.banner, "defaultBg")}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onBannerClick(item);
      }}
    >
      <CroppedImage
        url={item?.img_url as string}
        configs={RTG_BANNER}
        className={styles.bannerConfig}
      />
    </div>
  );
});

/** React.memo的propsAreEqual() */
// const equalFn = (prevProps: any, nextProps: any) => {
//   const {
//     bannerList: p_bannerList,
//     couponsInterest: p_couponsInterest,
//     ricepoSupport: p_ricepoSupport,
//     ricepoCouponInfo: p_ricepoCouponInfo,
//     date: p_date,
//     wave: p_wave,
//   } = prevProps;
//   const {
//     bannerList,
//     couponsInterest,
//     ricepoSupport,
//     ricepoCouponInfo,
//     date,
//     wave,
//   } = nextProps;
//   if (
//     isEqual(bannerList, p_bannerList) &&
//     p_ricepoSupport === ricepoSupport &&
//     p_couponsInterest === couponsInterest &&
//     isEqual(ricepoCouponInfo, p_ricepoCouponInfo) &&
//     p_date === date &&
//     p_wave === wave
//   ) {
//     return true;
//   }
// };

type DisplayBanner = {
  type: "couponBanner" | "ricepoCouponBanner" | "banner";
  detail?: string;
  img_url?: string;
};

type BannerItem = {
  detail?: string;
  img_url?: string;
  storefront?: Array<any>;
  sub_type?: string;
  type?: string;
};

type BannerCarouselProps = {
  bannerList?: Array<BannerItem>;
  /** 优惠券的优惠金额 */
  couponsInterest?: string;
  /** 当前区域是否支持Ricepo APP导流 */
  ricepoSupport: boolean;
  /** 当前是否支持ondemand */
  ondemandSupport: boolean;
  /** Ricepo优惠券信息 */
  ricepoCouponInfo?: RicepoCouponInfo | null;
  date?: string;
  wave?: string;
  scheduleSupport?: boolean;
};
/**
 * Banner轮播
 */
// eslint-disable-next-line react/display-name
export const BannerCarousel: FC<BannerCarouselProps> = memo(
  ({
    bannerList,
    couponsInterest,
    ricepoSupport,
    ricepoCouponInfo,
    ondemandSupport,
    date = "",
    wave = "",
    scheduleSupport,
  }) => {
    const tools = useClientTools();
    const { lang } = useTranslation("common");

    /** 展示的BannerList */
    const diaplayBannerList = useMemo(() => {
      const _diaplayBannerList: DisplayBanner[] = [];
      const isSupportVersion = isSupport(RICEPO_VERSION);
      // 数字越小轮播展示越靠前
      // 1 CouponBanner
      if (couponsInterest) {
        _diaplayBannerList.push({ type: "couponBanner" });
      }

      // 2 RicepoCouponBanner || RicepoBanner
      // 当前区域支持Ricepo APP导流
      if (ricepoSupport && isSupportVersion) {
        // RicepoCouponBanner
        // 有Ricepo优惠券信息
        if (ricepoCouponInfo) {
          _diaplayBannerList.push({
            type: "ricepoCouponBanner",
            detail: RICEPO.RICEPO_APP_URL,
          });
        }
        // RicepoBanner(只向RICEPO服务区域的[中文简繁]用户可见)
        const isChineseUser = [
          Constants.LANGUAGE_ZH,
          Constants.LANGUAGE_ZHT,
        ].includes(lang);
        // 没有Ricepo优惠券信息 && [中文简繁]用户 && 不支持ondemand
        // if (!ricepoCouponInfo && isChineseUser && !ondemandSupport) {
        //   _diaplayBannerList.push({ type: 'banner', detail: RICEPO.RICEPO_APP_URL, img_url: RICEPO.BANNER_IMG_URL });
        // }
        // MKPL-1645 [中文简繁]用户 && RECIPO支持OD && WEEE支持SC
        if (isChineseUser && scheduleSupport && ricepoSupport) {
          _diaplayBannerList.push({
            type: "banner",
            detail: RICEPO.RICEPO_APP_URL,
            img_url: RICEPO.BANNER_IMG_URL,
          });
        }
      }

      // 3 Banner List
      if (Array.isArray(bannerList)) {
        bannerList.forEach((item) => {
          _diaplayBannerList.push({
            type: "banner",
            detail: item.detail,
            img_url: item.img_url,
          });
        });
      }
      return _diaplayBannerList;
    }, [
      couponsInterest,
      ricepoSupport,
      ricepoCouponInfo,
      lang,
      bannerList,
      ondemandSupport,
    ]);

    const renderSingleBanner = () => {
      return (
        <div className={classNames(styles.bannerWrap, styles.singleBanner)}>
          {
            {
              couponBanner: (
                <CouponBanner
                  isSingleCouponBanner
                  discount={couponsInterest as string}
                />
              ),
              ricepoCouponBanner: (
                <RicepoCouponBanner
                  item={diaplayBannerList[0]}
                  ricepoCouponInfo={ricepoCouponInfo as RicepoCouponInfo}
                />
              ),
              banner: diaplayBannerList[0].img_url ? (
                <Banner item={diaplayBannerList[0]} date={date} wave={wave} />
              ) : (
                <></>
              ),
            }[diaplayBannerList[0].type]
          }
        </div>
      );
    };

    const renderMultiBanner = () => {
      return (
        <div className={classNames(styles.bannerWrap)}>
          {diaplayBannerList.length > 0 && (
            <Swiper
              noSwiping={false}
              autoplay
              slidesPerView={"auto"}
              loop={true}
              breakpoints={{
                750: {
                  centeredSlides: true,
                  centeredSlidesBounds: true,
                },
              }}
              navigation={true}
              spaceBetween={9}
              slidesOffsetBefore={12}
              slidesOffsetAfter={12}
            >
              {diaplayBannerList.map((item, index) => {
                return (
                  <SwiperSlide key={`banner-${index}`}>
                    {
                      {
                        couponBanner: (
                          <CouponBanner discount={couponsInterest as string} />
                        ),
                        ricepoCouponBanner: (
                          <RicepoCouponBanner
                            item={item}
                            ricepoCouponInfo={
                              ricepoCouponInfo as RicepoCouponInfo
                            }
                          />
                        ),
                        banner: item.img_url ? (
                          <Banner item={item} date={date} wave={wave} />
                        ) : (
                          <></>
                        ),
                      }[item.type]
                    }
                    <Pagination
                      index={index + 1}
                      total={diaplayBannerList.length}
                      className={styles.PaginationWrap}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>
      );
    };

    return (
      <>
        {diaplayBannerList.length > 0 && diaplayBannerList.length === 1
          ? renderSingleBanner()
          : renderMultiBanner()}
      </>
    );
  },
  // equalFn,
);
