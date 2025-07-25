import React from "react";
import { MdPlace } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { getFullImageUrl } from "../../../utils/imageUtils";
import styles from "./FacilityCard.module.css";

const cleanImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http")) {
    // 중복된 /img/ 경로 연속 제거 (예: /img//img/ -> /img/)
    return url.replace(/(\/img\/)+/g, "/img/");
  }
  // 상대경로인 경우 기존 유틸 함수 사용
  return getFullImageUrl(url);
};

const FacilityCard = ({ facility }) => {
  const imgSrc = cleanImageUrl(facility.imageUrl);

  return (
    <div className={styles.card}>
      <img
        src={imgSrc}
        alt={facility.location}
        className={styles.image}
        onError={(e) => (e.target.src = "/img/default.jpg")}
      />
      <div className={styles.info}>
        <h3 className={styles.name}>{facility.location}</h3>
        <p className={styles.detail}>
          <MdPlace className={styles.icon} />
          {facility.address}
        </p>
        <p className={styles.detail}>
          <IoMdTime className={styles.icon} />
          {facility.usageTime}
        </p>
        <p className={styles.detail}>
          <LuSquareArrowOutUpRight className={styles.icon} />
          {facility.area ? `${facility.area} m²` : "면적 정보 없음"}
        </p>
        <p className={styles.detail}>
          <IoCall className={styles.icon} />
          {facility.contact || "정보 없음"}
        </p>
      </div>
    </div>
  );
};

export default FacilityCard;
