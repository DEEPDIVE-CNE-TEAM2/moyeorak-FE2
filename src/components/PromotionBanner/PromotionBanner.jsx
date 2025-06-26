import styles from './PromotionBanner.module.css';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";

const PromotionBanner = () => {
  return (
    <div className={styles.banner}>
      <img src="/img/요가.png" alt="요가 배너" className={styles.image} />
      <div className={styles.arrows}>
        <IoIosArrowDropleftCircle className={styles.arrowIcon} />
        <IoIosArrowDroprightCircle className={styles.arrowIcon} />
      </div>
    </div>
  );
};

export default PromotionBanner;
