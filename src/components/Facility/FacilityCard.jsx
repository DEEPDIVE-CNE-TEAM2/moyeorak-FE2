import React from "react";
import { MdPlace } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import styles from "./FacilityCard.module.css";

const FacilityCard = ({ facility }) => {
  return (
    <div className={styles.card}>
      <img src={facility.img} alt={facility.name} className={styles.image} />
      <div className={styles.info}>
        <h3 className={styles.name}>{facility.name}</h3>
        <p className={styles.detail}>
          <MdPlace className={styles.icon} />
          {facility.location}
        </p>
        <p className={styles.detail}>
          <IoMdTime className={styles.icon} />
          {facility.time}
        </p>
        <p className={styles.detail}>
          <LuSquareArrowOutUpRight className={styles.icon} />
          {facility.area}
        </p>
        <p className={styles.detail}>
          <IoCall className={styles.icon} />
          {facility.contact}
        </p>
      </div>
    </div>
  );
};

export default FacilityCard;
