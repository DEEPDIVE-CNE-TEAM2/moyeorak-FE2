import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PopupModal.css';

const PopupModal = ({ onConfirm }) => {
  const [selected, setSelected] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  const REGION_ID_MAP = {
    '중구': 1,
    '성동구': 2,
    '송파구': 3,
  };

  const REGION_ROUTE_MAP = {
    '중구': '/jung',
    '성동구': '/seongdong',
    '송파구': '/songpa',
  };

  const handleConfirm = () => {
    if (selected) {
      const selectedRegionId = REGION_ID_MAP[selected];
      const route = REGION_ROUTE_MAP[selected];

      // 지역 정보 넘겨주기
      onConfirm({ name: selected, id: selectedRegionId });

      // localStorage 저장
      localStorage.setItem("selectedRegionId", selectedRegionId);
      localStorage.setItem("selectedRegionName", selected);

      navigate(route);
    }
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

        <select
          className="popup-dropdown"
          value={selected}
          onChange={handleChange}
        >
          <option value="">지역을 선택하세요</option>
          <option value="중구">중구</option>
          <option value="성동구">성동구</option>
          <option value="송파구">송파구</option>
        </select>

        {selected && (
          <>
            <div className="popup-text-line4">
              {selected}의 체육시설을 이용하시겠습니까?
            </div>
            <button className="popup-confirm-button" onClick={handleConfirm}>
              확인
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PopupModal;
