import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import FacilityCard from "./Facility/FacilityCard";
import styles from "./Place.module.css";

const categories = [
  "축구장", "야구장", "수영장", "테니스장", "배드민턴장", "탁구장",
];

// 지역별 시설 더미 데이터
const facilityMap = {
  1: { // 중구
    축구장: [
      {
        id: 1, name: "손기정 축구장", location: "중구 손기정로 123", time: "09:00 - 21:00",
        area: "6,000m²", contact: "02-1234-5678", img: "/img/중구축구장.png",
      },
    ],
    야구장: [],
    수영장: [
      {
        id: 2, name: "충무스포츠센터 수영장", location: "중구 충무로 45", time: "06:00 - 22:00",
        area: "800m²", contact: "02-9876-5432", img: "/img/중구수영장.png",
      },
      {
        id: 3, name: "회현체육센터 수영장", location: "중구 퇴계로12길 78", time: "06:00 - 22:00",
        area: "700m²", contact: "02-9876-5430", img: "/img/회현체육센터수영장.png",
      },
    ],
    테니스장: [
      {
        id: 4, name: "장충테니스장", location: "중구 장충단로 67", time: "07:00 - 20:00",
        area: "1,200m²", contact: "02-1122-3344", img: "/img/중구테니스장.png",
      },
    ],
    배드민턴장: [
      {
        id: 5, name: "충무스포츠센터 배드민턴장", location: "중구 충무로 45", time: "06:00 - 22:00",
        area: "500m²", contact: "02-9876-5432", img: "/img/중구배드민턴장.png",
      },
    ],
    탁구장: [
      {
        id: 6, name: "충무스포츠센터 탁구장", location: "중구 충무로 45", time: "06:00 - 22:00",
        area: "300m²", contact: "02-9876-5432", img: "/img/중구탁구장.png",
      },
    ],
  },
  2: { // 성동구
    축구장: [
      {
        id: 1, name: "중랑물재생센터 축구장", location: "성동구 중랑물재생센터 123", time: "09:00 - 21:00",
        area: "6,500m²", contact: "02-1111-2222", img: "/img/중랑물재생센터축구장.png",
      },
    ],
    야구장: [],
    수영장: [],
    테니스장: [
      {
        id: 2, name: "중랑물재생센터 테니스장", location: "성동구 중랑물재생센터 123", time: "07:00 - 20:00",
        area: "1,100m²", contact: "02-3333-4444", img: "/img/중랑물재생센터테니스장.png",
      },
      {
        id: 3, name: "서울숲 테니스장", location: "성동구 서울숲길 456", time: "06:00 - 21:00",
        area: "1,300m²", contact: "02-5555-6666", img: "/img/서울숲테니스장.png",
      },
    ],
    배드민턴장: [
      {
        id: 4, name: "중랑물재생센터 배드민턴장", location: "성동구 중랑물재생센터 123", time: "08:00 - 22:00",
        area: "400m²", contact: "02-7777-8888", img: "/img/중랑물재생센터배드민턴장.png",
      },
    ],
    탁구장: [],
  },
  3: { // 송파구
    축구장: [
      {
        id: 1, name: "잠실유수지 축구장", location: "송파구 잠실동 123-45", time: "09:00 - 21:00",
        area: "7,000m²", contact: "02-1234-5678", img: "/img/잠실유수지축구장.png",
      },
      {
        id: 2, name: "탄천축구장", location: "송파구 탄천로 456", time: "07:00 - 22:00",
        area: "8,000m²", contact: "02-8765-4321", img: "/img/탄천축구장.png",
      },
    ],
    야구장: [
      {
        id: 3, name: "잠실유수지 리틀야구장", location: "송파구 잠실동 123-46", time: "08:00 - 20:00",
        area: "5,000m²", contact: "02-2222-3333", img: "/img/잠실유수지리틀야구장.png",
      },
      {
        id: 4, name: "탄천야구장", location: "송파구 탄천로 457", time: "08:00 - 20:00",
        area: "9,000m²", contact: "02-4444-5555", img: "/img/탄천야구장.png",
      },
    ],
    수영장: [],
    테니스장: [
      {
        id: 5, name: "잠실유수지 테니스장", location: "송파구 잠실동 123-47", time: "06:00 - 21:00",
        area: "1,000m²", contact: "02-3333-4444", img: "/img/잠실유수지테니스장.png",
      },
      {
        id: 6, name: "송파테니스장", location: "송파구 송파동 789", time: "06:00 - 22:00",
        area: "1,200m²", contact: "02-5555-6666", img: "/img/송파테니스장.png",
      },
    ],
    배드민턴장: [],
    탁구장: [],
  },
};

const Place = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedCategory, setSelectedCategory] = useState("축구장");
  const [selectedRegionId, setSelectedRegionId] = useState(
    Number(new URLSearchParams(location.search).get("regionid")) ||
    Number(localStorage.getItem("selectedRegionId")) || 1
  );

  const regionData = facilityMap[selectedRegionId] || {};
  const facilities = regionData[selectedCategory] || [];

  const handleDistrictChange = (districtName) => {
    const regionId = {
      중구: 1,
      성동구: 2,
      송파구: 3,
    }[districtName];

    localStorage.setItem("selectedRegionName", districtName);
    localStorage.setItem("selectedRegionId", regionId);
    setSelectedRegionId(regionId);
    navigate(`/place?regionid=${regionId}`);
  };

  const districtName = {
    1: "중구",
    2: "성동구",
    3: "송파구",
  }[selectedRegionId];

  return (
    <>
      <Navbar
        selectedDistrict={districtName}
        onDistrictChange={handleDistrictChange}
      />

      <nav className={styles.categoryNav}>
        {categories.map((category) => (
          <span
            key={category}
            className={`${styles.categoryItem} ${
              category === selectedCategory ? styles.active : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </span>
        ))}
      </nav>

      <div className={styles.facilityList}>
        {facilities.length === 0 ? (
          <p className={styles.noData}>해당 시설 정보가 없습니다.</p>
        ) : (
          facilities.map((facility) => (
            <FacilityCard key={facility.id} facility={facility} />
          ))
        )}
      </div>
    </>
  );
};

export default Place;
