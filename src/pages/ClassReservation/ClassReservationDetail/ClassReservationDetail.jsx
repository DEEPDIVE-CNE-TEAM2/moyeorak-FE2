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
      title: '마포보건소 심폐소생술 교육',
      details: ['2025.07.01~2025.07.10', '2025.07.15~2025.08.31', '관내 36,200 / 관외 40,000', '제한없음'],
    },
  };

  const data = dummyData[id] || {};

  const infoLabels = ['대상', '장소', '이용장소', '접수기간', '취소기간', '요금', '정원', '문의'];
  const infoValues = [
    data.details?.[3] || null,
    null,
    null,
    data.details?.[0] || null,
    null,
    data.details?.[2] || null,
    null,
    null,
  ];

  // ✅ 결제 페이지에서 돌아왔을 때 모달2 띄우기
  useEffect(() => {
    if (location.state?.showPopup2 && location.state.popupData) {
      setPopupData(location.state.popupData);
      setShowModal2(true);
      window.history.replaceState({}, document.title); // URL 히스토리 초기화
    }
  }, [location.state]);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.title}>{data.title || '제목 없음'}</div>

        <div className={styles.contentWrapper}>
          <img className={styles.image} src={data.imageUrl} alt="클래스 이미지" />

          <div className={styles.detailBox}>
            {infoLabels.map((label, idx) => (
              <div key={idx} className={styles.detailRow}>
                <div className={styles.label}>{label}</div>
                <div className={styles.value}>{infoValues[idx] || '-'}</div>
                {idx < infoLabels.length - 1 && <div className={styles.rowLine}></div>}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.buttonWrapper}>
          <button className={styles.applyBtn} onClick={() => setShowModal(true)}>
            신청하기
          </button>
          <button className={styles.backBtn} onClick={() => navigate(-1)}>목록보기</button>
        </div>
      </div>

      <div className={styles.extraSection}>
        <div className={styles.miniSection}>
          <div className={styles.miniTitle}>준수사항</div>
          <div className={styles.miniContent}>
            <ul>
              <li>모든 서비스의 이용은 담당 기관의 규정에 따름</li>
              <li>각 관리기관의 시설물과 부대시설을 이용할 때는 담당자들의 협의 후 사용 가능</li>
              <li>각 관리기관의 사고 발생시 책임을 지지않음</li>
              <li>본 사이트와 각 관리기관의 규정을 위반할 시 시설 이용 취소 및 불허의 조치를 취할 수 있음</li>
            </ul>
          </div>
        </div>

        <div className={styles.miniSection}>
          <div className={styles.miniTitle}>주의사항</div>
          <div className={styles.miniContent}>
            <ul>
              <li>토,일 중복 신청 불가</li>
              <li>환불 기준</li>
            </ul>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.customTable}>
            <tbody>
              <tr>
                <th>취소일</th>
                <th>환불비율</th>
              </tr>
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

      {/* ✅ 기존 모달 */}
      {showModal && (
        <Popupmodal
          onClose={() => setShowModal(false)}
          id={id}
          data={{
            title: data.title,
            center: '마포체육센터',
            period: data.details?.[1],
            time: '매주 토/일 오전',
            price: data.details?.[2],
          }}
        />
      )}

      {/* ✅ 결제 후 돌아왔을 때 뜨는 Popupmodal2 */}
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
