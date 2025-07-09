import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { PiSoccerBallFill } from "react-icons/pi";
import { CiBaseball } from "react-icons/ci";
import { FaSwimmer } from "react-icons/fa";
import { IoIosTennisball } from "react-icons/io";
import { GiShuttlecock } from "react-icons/gi";
import { RiPingPongFill } from "react-icons/ri";
import styles from "./RentalPage.module.css";

// 종목 아이콘
const sportOptions = [
  { name: "축구", icon: <PiSoccerBallFill size={60} /> },
  { name: "야구", icon: <CiBaseball size={60} /> },
  { name: "수영", icon: <FaSwimmer size={60} /> },
  { name: "테니스", icon: <IoIosTennisball size={60} /> },
  { name: "배드민턴", icon: <GiShuttlecock size={60} /> },
  { name: "탁구", icon: <RiPingPongFill size={60} /> },
];

// 중구
const jungFacilities = [
  {
    id: "jung-soccer1",
    name: "손기정 축구장",
    sport: "축구",
    image: "/img/중구축구장.png",
    address: "중구 손기정로 123",
    time: "09:00 - 21:00",
    capacity: "10명",
    contact: "02-1234-5678",
  },
  {
    id: "jung-tennis1",
    name: "장충테니스장",
    sport: "테니스",
    image: "/img/중구테니스장.png",
    address: "중구 장충동 12-3",
    time: "08:00 - 20:00",
    capacity: "12명",
    contact: "02-234-5678",
  },
  {
    id: "jung-badminton1",
    name: "충무스포츠센터 대체육관 배드민턴장",
    sport: "배드민턴",
    image: "/img/중구배드민턴장.png",
    address: "중구 퇴계로 345",
    time: "09:00 - 21:00",
    capacity: "6명",
    contact: "02-345-6789",
  },
  {
    id: "jung-pingpong1",
    name: "충무스포츠센터 대체육관 탁구장",
    sport: "탁구",
    image: "/img/중구탁구장.png",
    address: "중구 퇴계로 345",
    time: "09:00 - 21:00",
    capacity: "10명",
    contact: "02-456-7890",
  },
  {
    id: "jung-swim1",
    name: "충무스포츠센터 수영장",
    sport: "수영",
    image: "/img/중구수영장.png",
    address: "중구 필동로 33",
    time: "06:00 - 22:00",
    capacity: "25명",
    contact: "02-567-8901",
  },
  {
    id: "jung-swim2",
    name: "회현체육센터 수영장",
    sport: "수영",
    image: "/img/회현체육센터수영장.png",
    address: "중구 회현동로 11",
    time: "07:00 - 21:00",
    capacity: "20명",
    contact: "02-678-9012",
  },
];

// 성동구
const seongdongFacilities = [
  {
    id: "seongdong-soccer1",
    name: "중랑물재생센터 축구장",
    sport: "축구",
    image: "/img/중랑물재생센터축구장.png",
    address: "성동구 중랑물재생센터 123",
    time: "09:00 - 21:00",
    capacity: "10명",
    contact: "02-1111-2222",
  },
  {
    id: "seongdong-tennis1",
    name: "중랑물재생센터 테니스장",
    sport: "테니스",
    image: "/img/중랑물재생센터테니스장.png",
    address: "성동구 중랑물재생센터 123",
    time: "07:00 - 20:00",
    capacity: "12명",
    contact: "02-3333-4444",
  },
  {
    id: "seongdong-tennis2",
    name: "서울숲 테니스장",
    sport: "테니스",
    image: "/img/서울숲테니스장.png",
    address: "성동구 서울숲길 456",
    time: "06:00 - 21:00",
    capacity: "16명",
    contact: "02-5555-6666",
  },
  {
    id: "seongdong-badminton1",
    name: "중랑물재생센터 배드민턴장",
    sport: "배드민턴",
    image: "/img/중랑물재생센터배드민턴장.png",
    address: "성동구 중랑물재생센터 123",
    time: "08:00 - 22:00",
    capacity: "10명",
    contact: "02-7777-8888",
  },
];

// 송파구
const songpaFacilities = [
  {
    id: "songpa-soccer1",
    name: "잠실유수지 축구장",
    sport: "축구",
    image: "/img/잠실유수지축구장.png",
    address: "송파구 잠실동 123-45",
    time: "09:00 - 21:00",
    capacity: "20명",
    contact: "02-1234-5678",
  },
  {
    id: "songpa-soccer2",
    name: "탄천축구장",
    sport: "축구",
    image: "/img/탄천축구장.png",
    address: "송파구 탄천로 456",
    time: "07:00 - 22:00",
    capacity: "20명",
    contact: "02-8765-4321",
  },
  {
    id: "songpa-baseball1",
    name: "잠실유수지 리틀야구장",
    sport: "야구",
    image: "/img/잠실유수지리틀야구장.png",
    address: "송파구 잠실동 123-46",
    time: "08:00 - 20:00",
    capacity: "25명",
    contact: "02-2222-3333",
  },
  {
    id: "songpa-baseball2",
    name: "탄천야구장",
    sport: "야구",
    image: "/img/탄천야구장.png",
    address: "송파구 탄천로 457",
    time: "08:00 - 20:00",
    capacity: "25명",
    contact: "02-4444-5555",
  },
  {
    id: "songpa-tennis1",
    name: "잠실유수지 테니스장",
    sport: "테니스",
    image: "/img/잠실유수지테니스장.png",
    address: "송파구 잠실동 123-47",
    time: "06:00 - 21:00",
    capacity: "17명",
    contact: "02-3333-4444",
  },
  {
    id: "songpa-tennis2",
    name: "송파테니스장",
    sport: "테니스",
    image: "/img/송파테니스장.png",
    address: "송파구 송파동 789",
    time: "06:00 - 22:00",
    capacity: "16명",
    contact: "02-5555-6666",
  },
];

const Rental = () => {
  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedRegionId, setSelectedRegionId] = useState(null);
  const [currentFacilities, setCurrentFacilities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const id = parseInt(localStorage.getItem("selectedRegionId"));
    setSelectedRegionId(id);
    console.log("선택된 지역 ID:", selectedRegionId);

    if (id === 1) {
      setCurrentFacilities(jungFacilities);
    } else if (id === 2) {
      setCurrentFacilities(seongdongFacilities);
    } else if (id === 3) {
      setCurrentFacilities(songpaFacilities);
    } else {
      setCurrentFacilities([]);
    }
  }, []);

  const toggleSelection = (value) => {
    setSelectedSport(value === selectedSport ? null : value);
  };

  const filteredFacilities = currentFacilities.filter(
    (f) => !selectedSport || f.sport === selectedSport
  );

  return (
    <>
      <Navbar />

      <div className={styles.panelWrapper}>
        <div className={styles.sectionTitle}>종목 선택</div>
        <div className={styles.optionsRow}>
          {sportOptions.map((sport, idx) => (
            <div
              key={idx}
              className={`${styles.sportButton} ${selectedSport === sport.name ? styles.selected : ""}`}
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
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/rental/detail/${facility.id}`)}
            >
              <img src={facility.image} alt={facility.name} className={styles.image} />
              <div className={styles.content}>
                <h3>{facility.name}</h3>
                <p className={styles.info}><strong>주소 </strong>{facility.address}</p>
                <p className={styles.info}><strong>운영시간 </strong>{facility.time}</p>
                <p className={styles.info}><strong>정원 </strong>{facility.capacity}</p>
                <p className={styles.info}><strong>문의 </strong>{facility.contact}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Rental;
