import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar"; 
import FacilityCard from "./FacilityCard"; 
import styles from "./JungFacility.module.css";

const categories = [
  "축구장", "야구장", "수영장", "테니스장", "배드민턴장", "탁구장",
];

const facilityData = {
  축구장: [
    {
      id: 1,
      name: "손기정 축구장",
      location: "중구 손기정로 123",
      time: "09:00 - 21:00",
      area: "6,000m²",
      contact: "02-1234-5678",
      img: "/img/중구축구장.png",
    },
  ],
  야구장: [],
  수영장: [
    {
      id: 2,
      name: "충무스포츠센터 수영장",
      location: "중구 충무로 45",
      time: "06:00 - 22:00",
      area: "800m²",
      contact: "02-9876-5432",
      img: "/img/중구수영장.png",
    },
    {
      id: 6,
      name: "회현체육센터 수영장",
      location: "중구 퇴계로12길 78",
      time: "06:00 - 22:00",
      area: "700m²",
      contact: "02-9876-5430",
      img: "/img/회현체육센터수영장.png",
    },
  ],
  테니스장: [
    {
      id: 3,
      name: "장충테니스장",
      location: "중구 장충단로 67",
      time: "07:00 - 20:00",
      area: "1,200m²",
      contact: "02-1122-3344",
      img: "/img/중구테니스장.png",
    },
  ],
  배드민턴장: [
    {
      id: 4,
      name: "충무스포츠센터 대체육관 배드민턴장",
      location: "중구 충무로 45",
      time: "06:00 - 22:00",
      area: "500m²",
      contact: "02-9876-5432",
      img: "/img/중구배드민턴장.png",
    },
  ],
  탁구장: [
    {
      id: 5,
      name: "충무스포츠센터 대체육관 탁구장",
      location: "중구 충무로 45",
      time: "06:00 - 22:00",
      area: "300m²",
      contact: "02-9876-5432",
      img: "/img/중구탁구장.png",
    },
  ],
};

const districts = ["중구", "성동구", "송파구"];
const districtToPath = { 중구: "jung", 성동구: "seongdong", 송파구: "songpa" };

const JungFacility = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("중구");
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

export default JungFacility;
