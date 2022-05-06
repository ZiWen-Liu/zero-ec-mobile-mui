import { FC, memo, useEffect, useState } from "react";
import classNames from "classnames";

import Constants from "constants/const-old";
import { RtgSaleType } from "constants/restaurant-old";

import EllipsesText from "../EllipsesText";
import { categoryProps, RestaurentMenuProps } from "types/restaurant-old";

import listViewStyles from "./index.module.css";
import styles from "./cate.module.css";
import { useMenus } from "data/hooks/useMenus";

const MenuListView = ({
  commonItems,
  venderId,
  date,
  filter,
  categoryId,
  wave,
  ws = Constants.TRACK_ENUM.EVENT_RESTAURANT_DETAIL_VIEW,
  orderKey,
  saleType = RtgSaleType.NORMAL,
  idPrefix,
  addDisabled = false,
  trackerCtx,
}: {
  commonItems: categoryProps & { subTitle?: string };
  venderId: number;
  categoryId: number;
  date: string;
  wave: string;
  filter: string;
  ws?: string;
  orderKey?: string;
  saleType?: RtgSaleType;
  idPrefix?: string;
  addDisabled?: boolean;
  trackerCtx: any;
}) => {
  const [isPc, setIsPc] = useState<boolean>(false);

  useEffect(() => {
    setIsPc(document.documentElement.clientWidth >= 750);
  }, []);

  return (
    <div className={styles.moreWrapper} id={`category-${categoryId}`}>
      <div className={styles.itemTitle}>
        <div className={styles.title}>{commonItems?.category_name}</div>
        {commonItems.subTitle ? (
          <div className={styles.subTitle}>{commonItems.subTitle}</div>
        ) : null}
      </div>
      <div className={`${styles.more} ${listViewStyles.more}`}>
        {Array.isArray(commonItems?.dishes) && commonItems.dishes.length > 0
          ? commonItems.dishes.map((item, index) => (
              <CommonItem
                date={date}
                key={`common-item-${item.product_id}`}
                data={item}
                venderId={venderId}
                filter={filter}
                wave={wave}
                orderKey={orderKey}
                saleType={saleType}
                ws={ws}
                categoryId={categoryId}
                idPrefix={"rtg"}
                addDisabled={addDisabled}
                isShowBottomLine={true}
                index={index}
                trackerCtx={trackerCtx}
              />
            ))
          : null}
      </div>
      {isPc && (
        <div
          style={{
            width: "100%",
            height: "10px",
            borderBottom: "1px solid rgba(242, 242, 242, 1)",
          }}
        ></div>
      )}
    </div>
  );
};

export type CommonItemProps = {
  data: Partial<RestaurentMenuProps & { is_options: boolean }>;
  date: string;
  filter: string;
  wave: string;
  venderId: number;
  categoryId: number;
  idPrefix: string;
  ws?: string;
  orderKey?: string;
  saleType?: RtgSaleType;
  addDisabled?: boolean;
  isShowBottomLine?: boolean;
  index: number;
  trackerCtx: any;
};

export enum SoldStatus {
  SOLD_OUT = "sold_out",
  AVAILABLE = "available",
}

const MenuListViewItemWithMemo: FC<CommonItemProps> = ({
  data,
  venderId,
  idPrefix = "rtg",
  isShowBottomLine,
}) => {
  const onImageShow = () => {
    console.log("onImageShow");
  };

  return (
    <div
      className={listViewStyles.moredish}
      id={`${idPrefix}_${venderId}_${data.product_id}`}
    >
      <div className={listViewStyles.dishInfoContainer}>
        <div
          className={classNames(
            "defaultBg",
            listViewStyles.listViewDefaultBg,
            listViewStyles.moreheader,
          )}
          id={data.product_id + ""}
        >
          {data?.img_url && (
            <div className={styles.moreHotDishImg} onClick={onImageShow}>
              <img className={styles.itemImg} src={data?.img_url} />
            </div>
          )}
        </div>
        <div
          className={classNames(styles.moreContent, listViewStyles.moreContent)}
        >
          <div className={styles.contentTop}>
            <EllipsesText
              overLines={3}
              style={{ fontSize: "15px", lineHeight: "20px" }}
              onlyShowPoint
              pointPosition={{ right: "40px" }}
            >
              <div
                className={classNames(
                  styles.moreTitle,
                  listViewStyles.moreTitle,
                )}
              >
                <span>{data.title}</span>
              </div>
            </EllipsesText>
            <div className={classNames(styles.prices, listViewStyles.prices)}>
              <span className={classNames(styles.price, listViewStyles.price)}>
                {data.price}
              </span>
              {data?.base_price && data?.base_price > 0 && (
                <span
                  className={classNames(
                    styles.originPrice,
                    listViewStyles.originPrice,
                  )}
                >
                  {data.base_price}
                </span>
              )}
            </div>
          </div>
          {isShowBottomLine ? (
            <div className={listViewStyles.bottomLine}></div>
          ) : null}
        </div>
      </div>
      {data?.quantity === 0 && (
        <div
          className={classNames(
            styles.soldOutModal,
            listViewStyles.soldOutModal,
          )}
        >
          sold out
        </div>
      )}
      {/**加购按钮 */}
      {/* {data?.quantity !== 0 && (
                <div className={classNames(styles.addToCart, listViewStyles.moreCart)} onClick={stopClickEvent}>
                <AddCart
                    className={styles.centerCart}
                    soldStatus="available"
                    data={{ ...data, img: data.img_url, maxPerOrder: data.max_order_quantity, vender_id: data.vender_id }}
                    cartbtnType={'fold'}
                    cartbtnSize={'small'}
                    saleType={saleType}
                    disabled={addDisabled}
                    trackerCtx={trackerCtx}
                    cartActionTrackerOptions={{
                    co: {
                        prod_pos: index,
                        prod_id: data.product_id
                    },
                    mod_nm: RtgModName.itemList,
                    mod_pos: 1,
                    sec_nm: null,
                    sec_pos: null
                    }}
                />
                </div>
            )} */}
    </div>
  );
};

const VendorMenu = () => {
  const { menus } = useMenus(123);

  return (
    <>
      {menus?.category?.map((item: any, i: any) => {
        // const props = {
        //   commonItems: item,
        //   date: "2022-04-28",
        //   venderId: 3366,
        //   categoryId: item?.category_id,
        //   filter: "",
        //   wave: "",
        // };
        return (
          <MenuListView
            key={`category-item-${item?.category_id}-${i}`}
            trackerCtx="track"
            categoryId={item?.category_id}
            commonItems={item as any}
            date={"2022-04-28"}
            filter={""}
            venderId={3366}
            wave={""}
            // {...props}
          />
        );
      })}
    </>
  );
};

export const CommonItem = memo(MenuListViewItemWithMemo);

export default VendorMenu;
