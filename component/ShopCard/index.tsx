import { FC } from "react";
import * as T from "../../types/restaurant";
import styles from "./index.module.css";

type RestaurantItem = {
  title: string;
  vender_id: number;
  address: string;
  description?: any;
  businessStatus: string;
  logo_url: string;
  image_url: string;
  open_day?: any;
  tag: string[];
  business_hours?: any;
  free_delivery_price: number;
  restaurant_pos: number;
  priority: number;
  rec_create_time?: any;
  tagline?: any;
  tag_id: number[];
  unavailable?: any;
  top: boolean;
  top_ranking: number;
  default_wave_seq?: any;
  product_infos_five?: any;
  pickup_available: string;
  ricepo_tags?: any;
  out_url?: any;
  ondemand: boolean;
  ondemand_only: boolean;
  business: T.OndemandBusinessProps;
  estimate: T.OndemandEstimateProps;
  ref_id?: any;
  shipping_free_fee: number;
  shipping_free_fee_vip: number;
  reward_tip: string;
};

type ShopCardProps = {
  item: RestaurantItem;
};

export const ShopCard: FC<ShopCardProps> = ({ item }) => {
  return (
    <a href={`/restaurants/${item.vender_id}`}>
      <div className={styles.shopCard}>
        <div
          className={styles.shopCard_image}
          style={{ backgroundImage: `url(${item.image_url})` }}
        ></div>
        <div className={styles.shopCard_title}>{item.title}</div>
      </div>
    </a>
  );
};
