// Jung.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import PromotionBanner from '../../components/PromotionBanner/PromotionBanner';
import RecommendProgramSection from '../../components/RecommendProgramSection/RecommendProgramSection';

const districtToPath = {
  "중구": "jung",
  "송파구": "songpa",
  "성동구": "seongdong",
};

const districtToRentalPath = {
  "중구": "/rental/jung",
  "송파구": "/rental/songpa",
  "성동구": "/rental/seongdong",
};

const Jung = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("중구");
  const navigate = useNavigate();

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
    const path = districtToPath[district];
    if (path) {
      navigate(`/${path}`);
    }
  };

  const districts = ["중구", "성동구", "송파구"];

  return (
    <div>
      <Navbar
        selectedDistrict={selectedDistrict}
        onDistrictChange={handleDistrictChange}
        districts={districts}
        districtToPath={districtToPath}
        districtToRentalPath={districtToRentalPath}
      />
      <PromotionBanner />
      <RecommendProgramSection />
    </div>
  );
};

export default Jung;
