import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../../../img/아이콘최종.png';
import select from '../../../img/Select.svg';
import './PaymentPage.css';

const PaymentPage = () => {
  const navigate = useNavigate();
    const { id } = useParams();

  const popupData = {
    title: '어린이 야구교실',
    center: '마포체육센터',
    period: '2025.07.15~2025.08.31',
    time: '매주 토/일 오전',
    price: '50,000원',
  };

  const handlePayment = () => {
    navigate(`/classReservation/${id}`, {
      state: { showPopup2: true, popupData },
    });
  };

  return (
    <div className="payment-page">
      {/* 로고 + 구분선 */}
      <div className="payment-header">
        <img src={logo} alt="로고" className="payment-logo" />
        <div className="payment-divider" />
      </div>

      {/* 전체 내용 묶음 */}
      <div className="payment-content-wrapper">
        {/* 타이틀 */}
        <h1 className="payment-title">결제</h1>

        {/* 강의 정보, 결제수단, 버튼 */}
        <div className="payment-container">
          {/* 강의 정보 박스 */}
          <div className="info-box">
            <div className="info-header">강의</div>
            <div className="info-content">
              <div className="lecture-title">어린이 야구교실</div>
              <div className="lecture-price">50,000원</div>
            </div>
          </div>

          {/* 결제수단 박스 */}
          <div className="info-box">
            <div className="info-header">결제수단</div>
            <div className="info-content-column">
              {["신용/체크카드", "휴대폰", "무통장입금"].map((method, idx) => (
                <div className="payment-method" key={idx}>
                  <img src={select} alt="선택" className="method-icon" />
                  <span>{method}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 결제 버튼 */}
          <button className="pay-button" onClick={(handlePayment)}>
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

