import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import testimg from '../../../img/testimg.jpg';
import Popupmodal from '../Popupmodal/Popupmodal';
import Popupmodal2 from '../Popupmodal/Popupmodal2';
import styles from './ClassReservationDetail.module.css';

const ClassReservationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [popupData, setPopupData] = useState(null);

  const dummyData = {
    1: {
      imageUrl: testimg,
      title: '중구보건소 심폐소생술 교육',
      details: [
        '제한없음',                  // 0: 대상
        '중구보건소 3층 강당',         // 1: 장소
        '2025.08.01 - 2025.08.10',       // 2: 강의기간
        '2025.07.01 - 2025.07.31',    // 3: 접수기간
        '이용일 하루 전까지',        // 4: 취소기간
        '관내 36,200 / 관외 40,000', // 5: 요금
        '20명',                 // 6: 정원
        '02-123-4567',              // 7: 문의
      ],
    },
  };

  const data = dummyData[id] || {};
  const infoLabels = ['대상', '장소', '강의기간', '접수기간', '취소기간', '요금', '정원', '문의'];
  const infoValues = data.details || Array(8).fill('-');

  useEffect(() => {
    if (location.state?.showPopup2 && location.state.popupData) {
      setPopupData(location.state.popupData);
      setShowModal2(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.title}>{data.title || '제목 없음'}</h2>

        <div className={styles.infoSection}>
          <img src={data.imageUrl} alt="클래스 이미지" className={styles.image} />

          <div className={styles.infoWrapper}>
            <table className={styles.infoTable}>
              <tbody>
                {infoLabels.map((label, idx) => (
                  <tr key={label}>
                    <th>{label}</th>
                    <td>{infoValues[idx] || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className={styles.buttonGroup}>
              <button className={styles.applyBtn} onClick={() => setShowModal(true)}>신청하기</button>
              <button className={styles.backBtn} onClick={() => navigate(-1)}>목록보기</button>
            </div>
          </div>
        </div>

        <div className={styles.noticeSection}>
          <h3>준수사항</h3>
          <p>
            • 모든 서비스의 이용은 담당 기관의 규정에 따름<br />
            • 각 관리기관의 시설물과 부대시설을 이용할 때는 담당자들의 협의 후 사용 가능<br />
            • 각 관리기관의 사고 발생시 책임을 지지 않음<br />
            • 본 사이트와 각 관리기관의 규정을 위반할 시 시설 이용 취소 및 불허의 조치를 취할 수 있음
          </p>

          <h3>주의사항</h3>
          <p>
            • 토,일 중복 신청 불가<br />
            • 환불 기준은 아래와 같습니다
          </p>

          <table className={styles.refundTable}>
            <thead>
              <tr>
                <th>취소일</th>
                <th>환불비율</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>수업 개시 전</td>
                <td>환불수수료 10% 공제</td>
              </tr>
              <tr>
                <td>수업 개시 후</td>
                <td>환불 불가</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <Popupmodal
          onClose={() => setShowModal(false)}
          id={id}
          data={{
            title: data.title,
            center: data.details?.[1] || '', // 장소
            period: '',                      // 필요 시 수업기간 추가 가능
            time: '매주 토/일 오전',
            price: data.details?.[5],
          }}
        />
      )}

      {showModal2 && popupData && (
        <Popupmodal2
          onClose={() => setShowModal2(false)}
          data={popupData}
        />
      )}
    </>
  );
};

export default ClassReservationDetail;
