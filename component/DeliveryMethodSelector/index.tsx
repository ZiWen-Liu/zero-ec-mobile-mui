import classNames from "classnames";
import { METHODS, RTG_WAVES } from "constants/restaurant";
import {
  CSSProperties,
  FC,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./index.module.css";

type DeliveryMethodItemProps = {
  text: string | ReactNode;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
};

const DeliveryMethodItem: FC<DeliveryMethodItemProps> = ({
  text,
  prefixIcon,
  suffixIcon,
}) => {
  return (
    <div className={styles.selectorItem}>
      {!!prefixIcon && prefixIcon}
      <div
        className={classNames(styles.selectorItem_text, {
          [styles.prefix]: !!prefixIcon,
          [styles.suffix]: !!suffixIcon,
        })}
      >
        {text}
      </div>
      {!!suffixIcon && suffixIcon}
    </div>
  );
};

type DeliveryMethodSelectorProps = {
  scheduledSaleDays: any;
  isOndemandDeliver: boolean;
  isOndemandPickup: boolean;
  onclick?: (date: string, wave: string) => void;
};

export const DeliveryMethodSelector: FC<DeliveryMethodSelectorProps> = ({
  scheduledSaleDays,
  isOndemandDeliver,
  isOndemandPickup,
  onclick,
}) => {
  const [activeMethod, setActiveMethod] = useState(METHODS.DELIVERY_ONDEMAND);
  const [activeBgStyle, setActiveBgStyle] = useState<CSSProperties>();
  const activeItemRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setActiveBgStyle({
      width: `${activeItemRef.current?.offsetWidth}px`,
      transform: `translateX(${activeItemRef.current?.offsetLeft}px)`,
    });
  }, [activeItemRef.current]);

  const handlerMethodItem = (method: string) => {
    if (method === METHODS.DELIVERY_ONDEMAND) {
      onclick?.("", RTG_WAVES.OD_DELIVERY);
    }
    if (method === METHODS.PICKUP_ONDEMAND) {
      onclick?.("", RTG_WAVES.OD_PICKUP);
    }
    if (method === METHODS.SCHEDULED) {
      onclick?.(
        scheduledSaleDays?.[0]?.delivery_date || "",
        scheduledSaleDays?.[0]?.wave?.[0]?.wave_seq || "",
      );
    }
    setActiveMethod(method);
  };

  const deliveryItems = [
    {
      method: METHODS.DELIVERY_ONDEMAND,
      element: <DeliveryMethodItem text={"Deliver ASAP"} />,
      enabled: isOndemandDeliver,
    },
    {
      method: METHODS.SCHEDULED,
      element: (
        <DeliveryMethodItem
          text={"Scheduled"}
          // suffixIcon={<Icon f7="chevron_down" size={"14px"} />}
        />
      ),
      enabled: scheduledSaleDays.length > 0,
    },
    {
      method: METHODS.PICKUP_ONDEMAND,
      element: <DeliveryMethodItem text={"Pickup"} />,
      enabled: isOndemandPickup,
    },
  ];
  return (
    <div className={styles.selector}>
      {deliveryItems.map((item, index) => {
        if (item.enabled) {
          return (
            <div
              className={styles.selector_item}
              key={`deliver-method-selector-item-${index}`}
              ref={activeMethod === item.method ? activeItemRef : null}
              onClick={() => {
                handlerMethodItem(item.method);
              }}
            >
              {item.element}
            </div>
          );
        }
      })}
      <div className={styles.selector_item_active} style={activeBgStyle}></div>
    </div>
  );
};
