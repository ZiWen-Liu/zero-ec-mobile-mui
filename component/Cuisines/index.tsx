import { memo, useEffect, useRef, FC } from "react";
import classNames from "classnames";
import BScroll from "@better-scroll/core";
import styles from "./index.module.css";

type CuisinesData = {
  img_url: string;
  label: string;
  key: number;
};

type CuisinesProps = {
  idPrefix: string;
  cuisinesData: CuisinesData[];
  onClick: (data: number) => void;
  pilotShow?: boolean;
  cuisine?: number | null;
};

const Cuisines: FC<CuisinesProps> = ({
  idPrefix,
  cuisinesData,
  onClick,
  pilotShow,
  cuisine,
}) => {
  const cuisineScrollRef = useRef<any>();
  const cuisineBScrollRef = useRef<any>();

  useEffect(() => {
    const activeIndex = cuisinesData?.findIndex((i) => i?.key === cuisine);
    if (idPrefix) {
      const targetElement = document.getElementById(
        `${idPrefix}-${activeIndex}`,
      );
      if (targetElement && cuisineBScrollRef.current) {
        cuisineBScrollRef.current.scrollToElement(targetElement, 500, true);
      }
    }
  }, [cuisinesData, cuisine, idPrefix, cuisineBScrollRef.current]);

  useEffect(() => {
    if (cuisineScrollRef.current) {
      cuisineBScrollRef.current = new BScroll(cuisineScrollRef.current, {
        scrollX: true,
        probeType: 3,
        useTransition: false,
        eventPassthrough: "vertical",
      });
    }
  }, [cuisinesData]);

  const renderCuisines = () => {
    return cuisinesData.map((item, index) => {
      return (
        <div
          key={item?.key}
          id={`${idPrefix}-${index}`}
          className={styles.cuisines_item}
          onClick={() => {
            handleClick(item?.key);
          }}
        >
          <div
            className={classNames(styles.cuisines_item_icon, {
              [styles.iconactive]: cuisine === item.key,
            })}
          >
            <img
              src={item.img_url}
              alt={`weee_${item.label}`}
              className={styles.cuisines_item_image}
            />
          </div>
          <div
            className={classNames(
              { [styles.cuisines_item_text_white]: pilotShow },
              { [styles.cuisines_item_text]: !pilotShow },
              { [styles.textactive]: cuisine === item.key },
            )}
          >
            {item.label}
          </div>
        </div>
      );
    });
  };
  const handleClick = (id: number): void => {
    onClick(id);
  };

  if (Array.isArray(cuisinesData) && cuisinesData.length > 0) {
    return (
      <div className={styles.container} id={idPrefix} ref={cuisineScrollRef}>
        <div className={styles.item_group}>{renderCuisines()}</div>
      </div>
    );
  } else {
    return null;
  }
};

export default memo(Cuisines);
