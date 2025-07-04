import React from 'react';
import '../Classes/Popupmodal/Popupmodal.css';
import AlertCircle from '../../../img/AlertCircle.svg';

const Popupmodal2 = ({ title, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-box popup-box2">
        <img src={AlertCircle} alt="alert" className="popup-alert-icon" />
        <div className="popup-class-name">{title}</div>
        <div className="popup-message">
          대관 신청이 취소되었습니다.
        </div>
        <button className="popup-confirm-button" onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
};

export default Popupmodal2;