import { FC, memo } from "react";
import classNames from "classnames";
import styles from "./index.module.css";

type PaginationProps = {
  index: number;
  total: number;
  isShow?: boolean;
  className?: string;
  textStyle?: string;
};

/**
 * 轮播图的分页器
 */
// eslint-disable-next-line react/display-name
export const Pagination: FC<any> = memo(
  ({ index, total, isShow = true, className, textStyle }) => {
    return (
      isShow && (
        <div className={classNames(styles.PaginationBox, className)}>
          <span className={classNames(styles.PaginationTxt, textStyle)}>
            {index} / {total}
          </span>
        </div>
      )
    );
  },
);
