import React from "react";
import { MdPlace } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import styles from "./FacilityCard.module.css";

const FacilityCard = ({ facility }) => {

  return (
    <div className={styles.card}>
      <img src={facility.imageUrl} alt={facility.location} className={styles.image} />
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
        {/* 면적 정보 추가 */}
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
