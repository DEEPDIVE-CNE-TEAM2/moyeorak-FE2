import { useState, useEffect } from "react";
import styles from "./PromotionBanner.module.css";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import { useLocation } from "react-router-dom"; // 현재 경로 확인

const bannerData = {
  jung: [
    {
      image: "/img/중구체육시설.png",
      text: (
        <>
          중구 공공 체육시설 예약 서비스에<br />
          오신 것을 환영합니다!
        </>
      ),
    },
    {
      image: "/img/수영강습2.png",
      text: "수영 초급반 접수 중!",
    },
    {
      image: "/img/탁구강의홍보.png",
      text: "요가 초급반 10월 개강 확정",
    },
  ],
  songpa: [
    {
      image: "/img/송파구체육시설.png",
      text: (
        <>
          송파구 공공 체육시설 예약 서비스에<br />
          오신 것을 환영합니다!
        </>
      ),
    },
    {
      image: "/img/어린이야구강습.png",
      text: "어린이 야구 강습 신청 가능!",
    },
    {
      image: "/img/테니스강습.png",
      text: "테니스 초급반 10월 개강 확정",
    },
  ],
  seongdong: [
    {
      image: "/img/성동구체육시설.png",
      text: (
        <>
          성동구 공공 체육시설 예약 서비스에<br />
          오신 것을 환영합니다!
        </>
      ),
    },
    {
      image: "/img/어린이축구강습.png",
      text: "어린이 축구 강습 접수 중!",
    },
    {
      image: "/img/배드민턴강습.png",
      text: "배드민턴 중급반 신규 오픈",
    },
  ],
};

const PromotionBanner = () => {
  const location = useLocation();
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const path = location.pathname;
    let district = "";

    if (path.includes("/jung")) district = "jung";
    else if (path.includes("/songpa")) district = "songpa";
    else if (path.includes("/seongdong")) district = "seongdong";

    setBanners(bannerData[district] || []);
    setCurrentIndex(0);
  }, [location]);

  if (banners.length === 0) return null;

  const prevIndex = (currentIndex - 1 + banners.length) % banners.length;
  const nextIndex = (currentIndex + 1) % banners.length;

  const handlePrev = () => setCurrentIndex(prevIndex);
  const handleNext = () => setCurrentIndex(nextIndex);

  return (
    <div className={styles.fullWidthWrapper}>
      <div className={styles.sliderWrapper}>
        <img
          src={banners[prevIndex].image}
          alt="이전 배너"
          className={`${styles.sideImage} ${styles.left}`}
        />
        <div className={styles.banner}>
          <img
            src={banners[currentIndex].image}
            alt="현재 배너"
            className={styles.image}
          />
          <div className={currentIndex === 0 ? styles.welcomeText : styles.bannerText}>
            {banners[currentIndex].text}
          </div>
          <div className={styles.arrows}>
            <IoIosArrowDropleftCircle className={styles.arrowIcon} onClick={handlePrev} />
            <IoIosArrowDroprightCircle className={styles.arrowIcon} onClick={handleNext} />
          </div>
        </div>
        <img
          src={banners[nextIndex].image}
          alt="다음 배너"
          className={`${styles.sideImage} ${styles.right}`}
        />
      </div>
    </div>
  );
};

export default PromotionBanner;
