import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import FacilityCard from "./FacilityCard";
import styles from "./SongpaFacility.module.css";

const categories = [
  "축구장", "야구장", "수영장", "테니스장", "배드민턴장", "탁구장",
];

const facilityData = {
  축구장: [
    {
      id: 1,
      name: "잠실유수지 축구장",
      location: "송파구 잠실동 123-45",
      time: "09:00 - 21:00",
      area: "7,000m²",
      contact: "02-1234-5678",
      img: "/img/잠실유수지축구장.png",
    },
    {
      id: 2,
      name: "탄천축구장",
      location: "송파구 탄천로 456",
      time: "07:00 - 22:00",
      area: "8,000m²",
      contact: "02-8765-4321",
      img: "/img/탄천축구장.png",
    },
  ],
  야구장: [
    {
      id: 3,
      name: "잠실유수지 리틀야구장",
      location: "송파구 잠실동 123-46",
      time: "08:00 - 20:00",
      area: "5,000m²",
      contact: "02-2222-3333",
      img: "/img/잠실유수지리틀야구장.png",
    },
    {
      id: 4,
      name: "탄천야구장",
      location: "송파구 탄천로 457",
      time: "08:00 - 20:00",
      area: "9,000m²",
      contact: "02-4444-5555",
      img: "/img/탄천야구장.png",
    },
  ],
  수영장: [], 
  테니스장: [
    {
      id: 5,
      name: "잠실유수지 테니스장",
      location: "송파구 잠실동 123-47",
      time: "06:00 - 21:00",
      area: "1,000m²",
      contact: "02-3333-4444",
      img: "/img/잠실유수지테니스장.png",
    },
    {
      id: 6,
      name: "송파테니스장",
      location: "송파구 송파동 789",
      time: "06:00 - 22:00",
      area: "1,200m²",
      contact: "02-5555-6666",
      img: "/img/송파테니스장.png",
    },
  ],
  배드민턴장: [], 
  탁구장: [], 
};

const districts = ["중구", "성동구", "송파구"];
const districtToPath = { 중구: "jung", 성동구: "seongdong", 송파구: "songpa" };

const SongpaFacility = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("송파구");
  const [selectedCategory, setSelectedCategory] = useState("축구장");
  const navigate = useNavigate();

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
    const path = districtToPath[district];
    if (path) navigate(`/${path}/place`);
  };

  const facilities = facilityData[selectedCategory] || [];

  return (
    <>
      <Navbar
        districts={districts}
        districtToPath={districtToPath}
        selectedDistrict={selectedDistrict}
        onDistrictChange={handleDistrictChange}
      />
      <nav className={styles.categoryNav}>
        {categories.map((category) => (
          <span
            key={category}
            className={`${styles.categoryItem} ${category === selectedCategory ? styles.active : ""}`}
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

export default SongpaFacility;
