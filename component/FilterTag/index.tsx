import { FC, useEffect, useRef } from "react";
import BScroll from "@better-scroll/core";
import classNames from "classnames";
import styles from "./index.module.css";

type FilterTagsProps = {
  key: number;
  label: string;
};

type Props = {
  idPrefix: string;
  isToggleStatus?: boolean; // 点击同一tag，是否切换选中状态
  filterTags?: FilterTagsProps[];
  filters?: number | null; // 存储的filter
  onClick: (data: number | null) => void;
};

const FilterTag: FC<Props> = ({
  idPrefix,
  isToggleStatus = true,
  filterTags,
  onClick,
  filters = null,
}) => {
  const filterTagsScrollRef = useRef<any>();
  const filterTagsBScrollRef = useRef<any>(null);

  useEffect(() => {
    const activeIndex = filterTags?.findIndex((i) => i?.key === filters);
    if (idPrefix) {
      const targetElement = document.getElementById(
        `${idPrefix}-${activeIndex}`,
      );
      if (targetElement && filterTagsBScrollRef.current) {
        filterTagsBScrollRef.current.scrollToElement(targetElement, 500, true);
      }
    }
  }, [filterTags, filters, idPrefix, filterTagsBScrollRef.current]);

  useEffect(() => {
    if (filterTagsScrollRef.current) {
      filterTagsBScrollRef.current = new BScroll(filterTagsScrollRef.current, {
        scrollX: true,
        probeType: 3,
        click: false,
        useTransition: false,
        eventPassthrough: "vertical",
      });
    }
  }, [filterTags]);

  const handleClick = (tag: number) => {
    onClick(isToggleStatus && filters === tag ? null : tag);
  };

  if (!Array.isArray(filterTags) || filterTags.length === 0) return null;

  return (
    <div
      className={styles.filterContainer}
      id={idPrefix}
      ref={filterTagsScrollRef}
    >
      <div className={styles.itemGroup}>
        {filterTags?.map((item, i) => {
          return (
            <div
              id={`${idPrefix}-${i}`}
              className={classNames(styles.filterItemBox, {
                [styles.active]: item.key === filters,
              })}
              key={`filter-item-${i}_${item?.key}`}
              onClick={() => {
                handleClick(item?.key);
              }}
            >
              {item.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default FilterTag;
