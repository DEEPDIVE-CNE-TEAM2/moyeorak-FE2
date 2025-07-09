import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { PiSoccerBallFill } from "react-icons/pi";
import { CiBaseball } from "react-icons/ci";
import { FaSwimmer } from "react-icons/fa";
import { IoIosTennisball } from "react-icons/io";
import { GiShuttlecock } from "react-icons/gi";
import { RiPingPongFill } from "react-icons/ri";
import { getRentalFacilitiesByRegion } from "../../Api";
import styles from "./RentalPage.module.css";

// 종목 아이콘 목록
const sportOptions = [
  { name: "축구", icon: <PiSoccerBallFill size={60} /> },
  { name: "야구", icon: <CiBaseball size={60} /> },
  { name: "수영", icon: <FaSwimmer size={60} /> },
  { name: "테니스", icon: <IoIosTennisball size={60} /> },
  { name: "배드민턴", icon: <GiShuttlecock size={60} /> },
  { name: "탁구", icon: <RiPingPongFill size={60} /> },
];

// regionId -> regionName 역매핑 객체
const regionNameMap = {
  1: "jung",
  2: "seongdong",
  3: "songpa",
};

const Rental = () => {
  const [selectedSport, setSelectedSport] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFacilities = async () => {
      const regionId = parseInt(localStorage.getItem("selectedRegionId"), 10);
      if (!regionId) return;

      try {
        const data = await getRentalFacilitiesByRegion(regionId);
        setFacilities(data);
      } catch (error) {
        console.error("시설 정보를 불러오는 중 오류 발생:", error);
      }
    };

    fetchFacilities();
  }, []);

  const toggleSelection = (value) => {
    setSelectedSport(value === selectedSport ? null : value);
  };

  const filteredFacilities = facilities.filter(
    (f) => !selectedSport || f.sport === selectedSport
  );

  // 현재 지역 이름 얻기
  const regionId = parseInt(localStorage.getItem("selectedRegionId"), 10);
  const regionName = regionNameMap[regionId] || "jung"; // 기본값 jung

  return (
    <>
      <Navbar />

      <div className={styles.panelWrapper}>
        <div className={styles.sectionTitle}>종목 선택</div>
        <div className={styles.optionsRow}>
          {sportOptions.map((sport, idx) => (
            <div
              key={idx}
              className={`${styles.sportButton} ${
                selectedSport === sport.name ? styles.selected : ""
              }`}
              onClick={() => toggleSelection(sport.name)}
            >
              <div
                className={styles.icon}
                style={{ color: selectedSport === sport.name ? "#3096E6" : "#555" }}
              >
                {sport.icon}
              </div>
              <div
                className={styles.label}
                style={{ color: selectedSport === sport.name ? "#3096E6" : "#333" }}
              >
                {sport.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.cardContainer}>
        {filteredFacilities.length === 0 ? (
          <p className={styles.noInfo}>해당 시설 정보가 없습니다.</p>
        ) : (
          filteredFacilities.map((facility) => (
            <div
              key={facility.id}
              className={styles.card}
              onClick={() => navigate(`/${regionName}/${facility.id}`)}
              style={{ cursor: "pointer" }}
            >
              <img src={facility.imageUrl} alt={facility.location} className={styles.image} />
              <div className={styles.content}>
                <h3>{facility.location}</h3>
                <p className={styles.info}>
                  <strong>주소 </strong>
                  {facility.address}
                </p>
                <p className={styles.info}>
                  <strong>운영시간 </strong>
                  {facility.usageTime}
                </p>
                <p className={styles.info}>
                  <strong>정원 </strong>
                  {facility.capacity}명
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Rental;
