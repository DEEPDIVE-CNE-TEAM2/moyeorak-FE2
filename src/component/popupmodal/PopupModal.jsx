import React, { useState } from 'react';
import './PopupModal.css';

const PopupModal = () => {
  const [selected, setSelected] = useState('');

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  return (
    <div className="popup-backdrop">
      <div className="popup-container">
        <div className="popup-text-box">
          <div className="popup-text-line1">공공체육시설 통합 플랫폼</div>
          <div className="popup-text-line2">
            <span className="blue">모여락</span>
            <span>에 오신 걸 환영해요!🏋️</span>
          </div>
          <div className="popup-text-line3">
            원활한 이용을 위해 지역을 선택해주세요!
          </div>
        </div>

        <select className="popup-dropdown" value={selected} onChange={handleChange}>
          <option value="">지역을 선택하세요</option>
          <option value="강남구">강남구</option>
          <option value="강서구">강서구</option>
          <option value="강북구">강북구</option>
        </select>

        {selected && (
          <>
            <div className="popup-text-line4">
              {selected}의 체육시설을 이용하시겠습니까?
            </div>
            <button className="popup-confirm-button">확인</button>
          </>
        )}
      </div>
    </div>
  );
};

export default PopupModal;


