import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import styles from './ClassReservationDetail.module.css';
import { getProgramDetail } from '../../../Api';
import { getFullImageUrl } from '../../../utils/imageUtils';

const ClassReservationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getProgramDetail(id)
      .then((res) => {
        setData(res);
        setError(null);
      })
      .catch(() => {
        setError('데이터를 불러오는데 실패했습니다.');
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const infoLabels = [
    '대상',
    '장소',
    '강의기간',
    '강의시간',
    '접수기간',
    '취소기간',
    '요금',
    '정원',
    '문의',
  ];

  const usagePeriodDateOnly = data?.usagePeriod
    ? data.usagePeriod.split('~').map((s) => s.trim()).join(' ~ ')
    : '-';

  const classTime =
    data?.classTime && data.classTime.trim() !== ''
      ? data.classTime.trim()
      : '-';

  const feeString = data
    ? (() => {
        const inPrice = data.inPrice;
        const outPrice = data.outPrice;
        const appliedPrice = data.appliedPrice;

        if (inPrice != null && outPrice != null)
          return `${inPrice.toLocaleString()}원(관내) / ${outPrice.toLocaleString()}원(관외)`;
        if (inPrice != null)
          return `${inPrice.toLocaleString()}원(관내)`;
        if (outPrice != null)
          return `${outPrice.toLocaleString()}원(관외)`;
        if (appliedPrice != null)
          return `${appliedPrice.toLocaleString()}원`;
        return '-';
      })()
    : '-';

  const infoValues = data
    ? [
        data.target || '-',
        data.location || '-',
        usagePeriodDateOnly,
        classTime,
        data.registrationPeriod || '-',
        data.cancelEndDate || '-',
        feeString,
        data.capacity ? `${data.capacity}명` : '-',
        data.contact || '-',
      ]
    : Array(infoLabels.length).fill('-');

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.title}>{data?.title || '제목 없음'}</h2>

        <div className={styles.infoSection}>
          <img
            src={getFullImageUrl(data?.imageUrl) || '/img/default.jpg'}
            alt="클래스 이미지"
            className={styles.image}
            onError={(e) => (e.target.src = '/img/default.jpg')}
          />

          <div className={styles.infoWrapper}>
            <table className={styles.infoTable}>
              <tbody>
                {infoLabels.map((label, idx) => (
                  <tr key={label}>
                    <th>{label}</th>
                    <td>{infoValues[idx]}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className={styles.buttonGroup}>
              <button
                className={styles.applyBtn}
                onClick={() => {
                  const token = localStorage.getItem("accessToken");
                  if (!token) {
                    alert("로그인이 필요합니다.");
                    navigate("/login");
                    return;
                  }

                  const confirmMessage = `
강의: ${data.title}
장소: ${infoValues[1]}
강의기간: ${infoValues[2]}
강의시간: ${infoValues[3]}
수강료: ${infoValues[6]}

위 내용으로 신청하시겠습니까?
                  `.trim();

                  if (window.confirm(confirmMessage)) {
                    navigate(`/classreservation/payment/${id}`);
                  }
                }}
              >
                신청하기
              </button>
              <button className={styles.backBtn} onClick={() => navigate(-1)}>
                목록보기
              </button>
            </div>
          </div>
        </div>

        <div className={styles.noticeSection}>
          <h3>준수사항</h3>
          <p>
            • 모든 서비스의 이용은 담당 기관의 규정에 따름
            <br />
            • 각 관리기관의 시설물과 부대시설을 이용할 때는 담당자들의 협의 후 사용 가능
            <br />
            • 각 관리기관의 사고 발생시 책임을 지지 않음
            <br />
            • 본 사이트와 각 관리기관의 규정을 위반할 시 시설 이용 취소 및 불허의 조치를 취할 수 있음
          </p>

          <h3>주의사항</h3>
          <p>• 환불 기준은 아래와 같습니다</p>

          <table className={styles.refundTable}>
            <thead>
              <tr>
                <th>취소일</th>
                <th>환불비율</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>취소기간까지</td>
                <td>환불수수료 10% 공제</td>
              </tr>
              <tr>
                <td>취소기간 이후</td>
                <td>환불 불가</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ClassReservationDetail;
