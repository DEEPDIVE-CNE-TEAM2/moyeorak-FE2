import React from 'react';
import Navbar from '../components/Navbar/Navbar.jsx';
import PromotionBanner from "../components/PromotionBanner/PromotionBanner";
import RecommendProgramSection from '../components/RecommendProgramSection/RecommendProgramSection';
import PopupModal from '../components/popupmodal/PopupModal.jsx';

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
