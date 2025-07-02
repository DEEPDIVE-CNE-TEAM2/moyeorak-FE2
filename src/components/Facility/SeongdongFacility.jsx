import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import FacilityCard from "./FacilityCard";
import styles from "./SeongdongFacility.module.css";

const categories = [
  "축구장", "야구장", "수영장", "테니스장", "배드민턴장", "탁구장",
];

const facilityData = {
  축구장: [
    {
      id: 1,
      name: "중랑물재생센터 축구장",
      location: "성동구 중랑물재생센터 123",
      time: "09:00 - 21:00",
      area: "6,500m²",
      contact: "02-1111-2222",
      img: "/img/중랑물재생센터축구장.png",
    },
  ],
  야구장: [],
  수영장: [],
  테니스장: [
    {
      id: 2,
      name: "중랑물재생센터 테니스장",
      location: "성동구 중랑물재생센터 123",
      time: "07:00 - 20:00",
      area: "1,100m²",
      contact: "02-3333-4444",
      img: "/img/중랑물재생센터테니스장.png",
    },
    {
      id: 3,
      name: "서울숲 테니스장",
      location: "성동구 서울숲길 456",
      time: "06:00 - 21:00",
      area: "1,300m²",
      contact: "02-5555-6666",
      img: "/img/서울숲테니스장.png",
    },
  ],
  배드민턴장: [
    {
      id: 4,
      name: "중랑물재생센터 배드민턴장",
      location: "성동구 중랑물재생센터 123",
      time: "08:00 - 22:00",
      area: "400m²",
      contact: "02-7777-8888",
      img: "/img/중랑물재생센터배드민턴장.png",
    },
  ],
  탁구장: [],
};

const districts = ["중구", "성동구", "송파구"];
const districtToPath = { 중구: "jung", 성동구: "seongdong", 송파구: "songpa" };

const SeongdongFacility = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("성동구");
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

export default SeongdongFacility;
