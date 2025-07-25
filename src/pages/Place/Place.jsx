import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import FacilityCard from "./Facility/FacilityCard";
import styles from "./Place.module.css";
import { getRentalFacilitiesByRegionId } from "../../Api";

const categories = [
  "축구장", "야구장", "수영장", "테니스장", "배드민턴장", "탁구장",
];

const Place = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedCategory, setSelectedCategory] = useState("축구장");
  const [selectedRegionId, setSelectedRegionId] = useState(
    Number(new URLSearchParams(location.search).get("regionid")) ||
    Number(localStorage.getItem("selectedRegionId")) || 1
  );

  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFacilities = async () => {
      setLoading(true);
      try {
        const data = await getRentalFacilitiesByRegionId(selectedRegionId);
        
        setFacilities(data);
      } catch (err) {
        console.error("시설 목록 불러오기 실패:", err);
        setFacilities([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFacilities();
  }, [selectedRegionId]);

  const filteredFacilities = facilities.filter((f) =>
    f.location.includes(selectedCategory)
  );

  const handleDistrictChange = (districtName) => {
    const regionIdMap = {
      중구: 1,
      성동구: 2,
      송파구: 3,
    };
    const regionId = regionIdMap[districtName];
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
        {loading ? (
          <p className={styles.noData}>로딩 중...</p>
        ) : filteredFacilities.length === 0 ? (
          <p className={styles.noData}>해당 시설 정보가 없습니다.</p>
        ) : (
          filteredFacilities.map((facility) => (
            <FacilityCard
              key={facility.id}
              facility={facility}  // 전체 객체 전달
            />
          ))
        )}
      </div>
    </>
  );
};

export default Place;
