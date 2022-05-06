import VendorTags from "../VendorTags";
import styles from "./index.module.css";

type VendorInfos = {
  bgImage: string;
  logoImage: string;
  title: string;
  tags: string[];
};

const VendorBillboard = ({ bgImage, logoImage, title, tags }: VendorInfos) => {
  return (
    <div className={styles.shopInfo}>
      <div className={styles.bg}>
        {bgImage && (
          <div
            className={styles.bgImg}
            style={{ backgroundImage: `url(${bgImage})` }}
          />
        )}
        {logoImage && (
          <img src={logoImage} className={styles.logoImg} alt={title} />
        )}
      </div>
      <div className={styles.text}>
        <div className={styles.shopTitle}>{title}</div>
        <VendorTags className={styles.labels} tags={tags} />
      </div>
    </div>
  );
};

export default VendorBillboard;
