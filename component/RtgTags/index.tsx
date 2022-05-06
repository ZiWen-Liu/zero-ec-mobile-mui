import { useMemo, memo, useCallback, CSSProperties } from "react";
import useTranslation from "next-translate/useTranslation";
import classNames from "classnames";
import styles from "./index.module.css";
import { METHODS } from "constants/restaurant";
import { DEVIDER } from "constants/const";
import { getOndemandInfos } from "utils/restaurant/getOndemandInfos";
import utils from "utils/tools/typeJudgment";

export enum RtgTagMode {
  LIST = "list",
  DETAIL = "detail",
}

type TagItemType = {
  text: string;
  type: string;
  enabled: boolean;
};

type TagProps = {
  rtgInfo: any;
  mode?: RtgTagMode;
  activeMethod?: string;
  isVip?: boolean; // 是否是VIP
  className?: string;
  style?: CSSProperties;
};

const RtgTags = (props: TagProps) => {
  const { t } = useTranslation("restaurant");
  const {
    rtgInfo,
    isVip = false,
    mode = RtgTagMode.DETAIL,
    activeMethod = "",
    className,
    style,
  } = props;

  /** 普通用户配送免于费门槛 */
  const shipping_free_fee = rtgInfo?.shipping_free_fee || 0;
  /** VIP配送免运费门槛 */
  const shipping_free_fee_vip = rtgInfo?.shipping_free_fee_vip || 0;
  /** VIP返利文案  */
  const reward_tip = rtgInfo?.reward_tip || "";
  /** 餐厅的自定义tag */
  const tag = rtgInfo?.tag || [];
  /** 餐厅ondemand 配送的ETA */
  const estimate = rtgInfo?.estimate?.avg || 0;

  const {
    isOpen,
    isSupport: isSupportOd = false,
    isOnly,
    isSupportOdDelivery,
  } = getOndemandInfos(rtgInfo, mode);

  /** check 免运费门槛，eta时间等数字类型的tag值是否有效 */
  const checkIsValidValue = useCallback((value: number) => {
    if (utils.isNumber(value) && value > 0) return true;
    if (value && utils.isString(value)) return true;
    return false;
  }, []);

  /** 是否展示ondemand ETA tag
   * ondemand开店 && ETA时间有效 && activeMethod === ondemand
   */
  const showOndemandEta = useMemo(() => {
    return (
      isOpen &&
      [METHODS.DELIVERY_ONDEMAND, METHODS.PICKUP_ONDEMAND].includes(
        activeMethod,
      ) &&
      checkIsValidValue(estimate)
    );
  }, [isOpen, estimate, activeMethod]);

  /**
   * 是否展示配送门槛
   */
  const showDeliveryPrice = useMemo(() => {
    const price = isVip ? shipping_free_fee_vip : shipping_free_fee;
    const priceTagValid = checkIsValidValue(price);
    let isShow = true;
    if (mode === RtgTagMode.LIST) {
      isShow = true;
    } else if (
      [METHODS.DELIVERY_ONDEMAND, METHODS.PICKUP_ONDEMAND].includes(
        activeMethod,
      ) &&
      !isSupportOdDelivery
    ) {
      isShow = false;
    } else {
      isShow = true;
    }
    return isShow && priceTagValid;
  }, [
    isVip,
    shipping_free_fee_vip,
    shipping_free_fee,
    isSupportOdDelivery,
    mode,
    activeMethod,
  ]);

  const tagItems = useMemo(() => {
    const normalTags =
      tag?.map((item: string) => {
        return {
          text: item,
          type: "normal-tag",
          enabled: true,
        };
      }) || [];

    return [
      {
        type: "ondemand-ETA", // ondemand 配送时间
        text: t("tags.ondemand_eta", { min: estimate }),
        enabled: showOndemandEta,
      },
      {
        type: "delivery-price", // 配送费用
        text: t("tags.free_delivery_price", {
          price: isVip ? shipping_free_fee_vip : shipping_free_fee,
        }),
        enabled: showDeliveryPrice,
      },
      {
        type: "",
        text: reward_tip,
        enabled: !!reward_tip,
      },
      ...normalTags,
    ];
  }, [
    tag,
    reward_tip,
    estimate,
    isVip,
    shipping_free_fee_vip,
    shipping_free_fee,
    showOndemandEta,
    showDeliveryPrice,
  ]);

  const availableTagItems = useMemo(() => {
    const availableArr: TagItemType[] = [];
    tagItems?.forEach((item) => {
      if (item.enabled) {
        availableArr.push(item);
      }
    });

    return availableArr;
  }, [tagItems]);

  return (
    <div className={classNames(styles.rtgTags, className)} style={style}>
      {availableTagItems?.map((item, i) => {
        return (
          <span className={styles.tagItem} key={`rtg-tag-${item}-${i}`}>
            {i !== 0 && DEVIDER} {item.text}
          </span>
        );
      })}
    </div>
  );
};

export default memo(RtgTags);
