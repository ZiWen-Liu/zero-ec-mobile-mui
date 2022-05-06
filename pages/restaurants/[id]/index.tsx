import VendorBillboard from "component/VendorBillboard";
import { VendorInfo } from "component/VendorInfo";
import VendorMenu from "component/VendorMenu";
import VendorMode from "component/VendorMode";
import { useVendorInfo } from "data/hooks/useVendorInfo";
import { useGetVendorInfo } from "hooks/swr/useGetVendorInfo";
import styles from "./index.module.css";

const dateAndWave = {
  cartSubTitle: "fake title",
  allSaleMethods: ["fake allSaleMethods"],
  validSaleMethods: ["fake validSaleMethods"],
  activeMethod: "fake activeMethod",
  currentDate: "fake currentDate",
  currentWave: "fake currentWave",
  currentWaveInfo: "fake currentWaveInfo",
  currentDealId: 464309,
  odDelieryData: {
    date: "fake date",
    wave_seq: "fake wave_seq",
    deal_id: -10000,
  },
  odPickupData: {
    date: "fake date",
    wave_seq: "fake wave_seq",
    deal_id: -10000,
  },
  initOrderDates: () => "fake initOrderDates",
  updateOrderDates: () => "fake updateOrderDates",
  updateCurrentData: () => "fake updateCurrentData",
  /** scheduled 可销售的所有日期 */
  allDays: ["2022-04-28"],
  /** scheduled 可销售日期对应的波次 */
  dateToWave: { "2022-04-28": "0" },
  /** scheduled 每个波次对应的可销售日期 */
  waveToDate: { "0": "2022-04-28" },
  /** 接口返回的scheduled可销售日期信息的原始数据 */
  deliveryDates: [
    {
      delivery_date: "2022-04-28",
      wave: ["0"],
    },
  ],
};
const trackerCtx = {
  date: 1,
  wave_seq: 2,
  wave_name: 3,
  zip_code: 4,
};

export default function BlogPost(props: any) {
  /*
   we use Framework7 router and its features
  */
  const { id, f7route } = props;

  // const { vendorInfo } = useGetVendorInfo("94538", id);
  // const {image_url = '', logo_url = '', title = '', tag = []} = vendorInfo || {};

  const { vendorInfo, isLoading, isError } = useVendorInfo(123);
  const {
    image_url = "",
    logo_url = "",
    title = "",
    tag = [],
  } = vendorInfo || {};

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!!!</div>;

  return (
    <div>
      <VendorBillboard
        bgImage={image_url}
        logoImage={logo_url}
        title={title}
        tags={tag}
      />
      <VendorMode
        trackerCtx={trackerCtx}
        rtgInfo={vendorInfo}
        dateAndWave={dateAndWave}
        onChange={() => console.log("VendorMode onChange")}
      />
      <VendorMenu />
    </div>
  );
}
