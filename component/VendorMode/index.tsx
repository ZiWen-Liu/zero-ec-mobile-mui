import classNames from "classnames";
import { FC, useCallback, useEffect, useState } from "react";
import styles from "./index.module.css";

const RTG_WAVE_SEQ = {
  DINNER: "0",
  BREAKFAST: "1",
  LUNCH: "2",
  PICKUP: "3",
  BREAKFAST_PICKUP: "4",
  LUNCH_PICKUP: "5",
  DINNER_PICKUP: "6",
  AFTERNOON_TEA: "7",
  DELIVERY_ONDEMAND: "8",
  PICKUP_ONDEMAND: "9",
  DEFAULT: "-1",
  EMPTY: "",
};

const METHODS = {
  DELIVERY_ONDEMAND: "delivery_ondemand",
  PICKUP_ONDEMAND: "pickup_ondemand",
  SCHEDULED: "scheduled",
  PICKUP: "pickup",
};

type DeliveryItemProps = {
  mainText: string;
  subText?: string;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
};

const DeliveryItem = (props: DeliveryItemProps) => {
  const { mainText, subText, isActive = false, className, onClick } = props;
  return (
    <div
      className={classNames(styles.item, className, {
        [styles.isActive]: isActive,
      })}
      onClick={() => {
        onClick?.();
      }}
    >
      <div className={styles.item_mainText}>{mainText}</div>
      {subText && <div className={styles.item_subText}>{subText}</div>}
    </div>
  );
};

type DeliveryMethodTabsProps = {
  rtgInfo: any;
  dateAndWave: any;
  onChange: (date: string, wave: string) => void;
  trackerCtx: any;
};

const VendorMode: FC<DeliveryMethodTabsProps> = (props) => {
  const { rtgInfo, dateAndWave, onChange, trackerCtx } = props;

  // 有效的Method数量
  const [validCount, setValidCount] = useState<number>();
  const [scheduledOpen, setScheduledOpen] = useState<boolean>(false);
  const [odDeliveryOpen, setOdDeliveryOpen] = useState<boolean>(true);
  const [odPickupOpen, setOdPickupOpen] = useState<boolean>(true);

  const [odDeliverySubText, setOdDeliverySubText] =
    useState<string>("20-40min");
  const [odPickupSubText, setOdPickupSubText] = useState<string>("");

  // const activeMethod = useMemo(() => {
  //   return dateAndWave.activeMethod;
  // }, [dateAndWave.activeMethod]);
  const activeMethod = METHODS.DELIVERY_ONDEMAND;

  useEffect(() => {
    if (dateAndWave.allSaleMethods.includes(METHODS.SCHEDULED))
      setScheduledOpen(true);
    if (dateAndWave.allSaleMethods.includes(METHODS.DELIVERY_ONDEMAND))
      setOdDeliveryOpen(true);
    if (dateAndWave.allSaleMethods.includes(METHODS.PICKUP_ONDEMAND))
      setOdPickupOpen(true);
    setValidCount(dateAndWave.allSaleMethods?.length || 0);
  }, [dateAndWave.allSaleMethods]);

  /**
   * 点击 ondemand button
   */
  const handlerOndemandButton = useCallback(
    (wave: any) => {
      if (dateAndWave?.currentWave === wave) {
        return;
      }
      onChange("", wave);
    },
    [dateAndWave.currentWave],
  );

  /**
   * 通过接口获取ondemand pre order 时间窗list
   * @param {string} type "1" 表示od_delivery "2" 表示od_pickup
   * @param {number} venderId
   * @returns
   */
  // const getPreOrderWindowData =

  /**
   * 根据ondemand的状态，获取 delieryMethod button 的subText
   */
  const getOndemandSubText = () => {
    let showText = "20-40min";

    return showText;
  };

  useEffect(() => {
    const { isSupportOdDelivery, isSupportOdPickup } = {
      isSupportOdDelivery: true,
      isSupportOdPickup: true,
    };
    if (isSupportOdDelivery) {
      setOdDeliverySubText(getOndemandSubText());
    }
    if (isSupportOdPickup) {
      setOdPickupSubText(getOndemandSubText());
    }
  }, [rtgInfo]);

  /**
   * 获取od-pickup 按钮埋点位置
   * 返回的所有结果 0, 1, 2
   * @param odDeliveryOpen 是否支持od-delivery
   * @param scheduledOpen 是否支持scheduled
   * @returns {Number}
   */
  const getPickUpButtonPos = (odDeliveryOpen: boolean) => {
    let result = 0;
    if (odDeliveryOpen) {
      result += 1;
    }
    return result;
  };

  /**
   * 获取scheduled 按钮埋点位置
   * @param odDeliveryOpen  是否支持od-delivery
   * @param odPickupOpen 是否支持od-pickup
   * @returns {Number}
   */
  const getScheduledButtonPos = (
    odDeliveryOpen: boolean,
    odPickupOpen: boolean,
  ) => {
    let result = 0;
    if (odDeliveryOpen) {
      result += 1;
    }
    if (odPickupOpen) {
      result += 1;
    }
    return result;
  };

  const MethodItems = [
    {
      method: METHODS.DELIVERY_ONDEMAND,
      element: (
        <DeliveryItem
          mainText="立即配送"
          subText={odDeliverySubText}
          isActive={
            activeMethod === METHODS.DELIVERY_ONDEMAND && validCount !== 1
          }
          onClick={() => {
            handlerOndemandButton(RTG_WAVE_SEQ.DELIVERY_ONDEMAND);
          }}
        />
      ),
      enabled: odDeliveryOpen,
    },
    {
      method: METHODS.PICKUP_ONDEMAND,
      element: (
        <DeliveryItem
          mainText="自提"
          subText={odPickupSubText}
          isActive={
            activeMethod === METHODS.PICKUP_ONDEMAND && validCount !== 1
          }
          onClick={() => {
            handlerOndemandButton(RTG_WAVE_SEQ.PICKUP_ONDEMAND);
          }}
        />
      ),
      enabled: odPickupOpen,
    },
    {
      method: METHODS.SCHEDULED,
      element: <div>ScheduledItem</div>,
      enabled: scheduledOpen,
    },
  ];

  if (validCount === 0) return null;

  return (
    <div className={styles.buttonGroups}>
      <div className={classNames(styles.tab)}>
        <div className={styles.tab_container}>
          {MethodItems.map((item, index) => {
            if (item.enabled) {
              return (
                <div
                  key={`methodItem-${index}`}
                  className={classNames(styles.tab_item, {
                    [styles.isActive]:
                      item.method === activeMethod && validCount !== 1,
                  })}
                >
                  {item.element}
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default VendorMode;
