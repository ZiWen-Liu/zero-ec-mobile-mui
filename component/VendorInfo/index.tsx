import RtgTags from "component/RtgTags";
import { FC } from "react";
import styles from "./index.module.css";

type Wave = {
  deal_id: number;
  end_time: number;
  cut_time?: any;
  wave_seq: string;
  wave_name: string;
  delivery_time: string;
  delivery_time_full: string;
  seq: number;
};

type SaleDay = {
  delivery_date: string;
  wave: Wave[];
  pickup?: any;
};

type MealTypeList = {
  wave_type: number;
  wave_type_name: string;
  sale_days: SaleDay[];
};

type Estimate = {
  merchantId: number;
  min: number;
  max: number;
  avg: number;
  start: string;
  end: string;
  deadline: Date;
};

type Business = {
  vender_id?: any;
  merchant_id: number;
  open_date_time: string;
  closed: boolean;
  closeType: number;
  closed_tip: string;
  pre_order_closed_tip: string;
};

type VendorInfo = {
  id: number;
  status?: any;
  sales_org: string;
  title: string;
  pickup_address: string;
  pickup_open: boolean;
  phone_number: string;
  email_address: string;
  description: string;
  image_url: string;
  logo_url: string;
  cut_time?: any;
  business_status: string;
  free_delivery_price: number;
  shipping_free_fee: number;
  shipping_free_fee_vip: number;
  tag: string[];
  sale_days: SaleDay[];
  meal_type_list: MealTypeList[];
  sale_status?: any;
  support_group_order: boolean;
  pickup_available: string;
  reward_tip?: any;
  od_delivery: boolean;
  od_pickup: boolean;
  ondemand_only: boolean;
  od_delivery_deal_id: number;
  od_pickup_deal_id: number;
  od_delivery_price: number;
  os_delivery_price: number;
  estimate: Estimate;
  business: Business;
  timeZone: string;
};

type VendorInfoProps = {
  data: VendorInfo;
};

export const VendorInfo: FC<VendorInfoProps> = ({ data }) => {
  return (
    <div className={styles.vendorInfo}>
      <div
        className={styles.vendorInfo_image}
        style={{ backgroundImage: `url(${data?.image_url})` }}
      >
        <img className={styles.vendorInfo_logo} src={data?.logo_url} />
      </div>
      <div className={styles.vendorInfo_text}>
        <div className={styles.vendorInfo_title}>{data?.title}</div>
        <RtgTags rtgInfo={data} />
      </div>
    </div>
  );
};
