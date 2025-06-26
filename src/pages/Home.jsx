import React from 'react';
import Navbar from '../components/Navbar/Navbar.jsx';
import PromotionBanner from "../components/PromotionBanner/PromotionBanner";
import RecommendProgramSection from '../components/RecommendProgramSection/RecommendProgramSection';
import PopupModal from '../component/popupmodal/PopupModal';

const Home = () => {
  return (
    <div>
      <Navbar />
      <PromotionBanner />
      <RecommendProgramSection />
      <PopupModal />
    </div>
  );
};

export default Home;
