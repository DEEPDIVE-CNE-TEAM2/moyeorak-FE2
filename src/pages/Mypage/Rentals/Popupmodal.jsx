import React, { useState } from 'react';
import '../Classes/Popupmodal/Popupmodal.css';
import X_black from '../../../img/X_black.svg';
import Popupmodal2 from './Popupmodal2';

const Popupmodal = ({ onClose, data }) => {
  const [showSecondModal, setShowSecondModal] = useState(false);

  if (showSecondModal) {
    return <Popupmodal2 title={data.location} onClose={onClose} />;
  }

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <div className="popup-title">대관 취소</div>
          <img src={X_black} alt="닫기" className="popup-close" onClick={onClose} />
        </div>

        <div className="popup-info">
          <div className="popup-row">
            <div className="label">시설</div>
            <div className="value">{data.facilityType}</div>
          </div>
          <div className="popup-divider" />
          <div className="popup-row">
            <div className="label">장소</div>
            <div className="value">{data.location}</div>
          </div>
          <div className="popup-divider" />
          <div className="popup-row">
            <div className="label">사용기간</div>
            <div className="value">{data.period}</div>
          </div>
          <div className="popup-divider" />
          <div className="popup-row">
            <div className="label">시간</div>
            <div className="value">{data.time}</div>
          </div>
          <div className="popup-divider" />
        </div>

        <div className="popup-confirm-text">
          대관 신청을 취소하시겠습니까?
        </div>

        <button
          className="popup-confirm-button"
          onClick={() => setShowSecondModal(true)}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default Popupmodal;
