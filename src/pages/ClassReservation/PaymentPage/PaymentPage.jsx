import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../../../img/아이콘최종.png';
import select from '../../../img/Select.svg';
import './PaymentPage.css';
import { getProgramDetail, enrollProgram } from '../../../Api';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getProgramDetail(id)
      .then((res) => {
        setProgram(res);
        setError(null);
      })
      .catch(() => {
        setError('프로그램 정보를 불러오는 데 실패했습니다.');
        setProgram(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const formatFee = (data) => {
    const appliedPrice = data?.applied_price ?? data?.appliedPrice ?? null;

    if (appliedPrice != null) {
      return `${appliedPrice.toLocaleString()}원`;
    }

    return '-';
  };

  const handlePayment = async () => {
    const confirmed = window.confirm('신청하시겠습니까?');
    if (!confirmed) return;

    const classTime =
      program?.classTime?.trim() ||
      (program?.class_start_time && program?.class_end_time
        ? `${program.class_start_time.slice(0, 5)} ~ ${program.class_end_time.slice(0, 5)}`
        : null);

    if (!classTime || !classTime.includes('~')) {
      alert("강의 시간이 정확히 설정되지 않았습니다. 관리자에게 문의하세요.");
      return;
    }

    const paidAmount = program?.appliedPrice ?? program?.applied_price ?? 0;

    const enrollmentData = {
      programId: program?.id,
      programTitle: program?.title || '',
      location: program?.location || '',
      usagePeriod: program?.usagePeriod || '',
      classTime: classTime,
      paidAmount: paidAmount,
    };

    try {

      console.log('[handlePayment] enrollProgram 호출 직전:', enrollmentData);


      await enrollProgram(enrollmentData);

      alert('신청이 완료되었습니다.');

      const regionId = program?.regionId || 1;
      navigate(`/classReservation?selectedRegionId=${regionId}`);
    } catch (error) {
      alert('신청에 실패했습니다. 다시 시도해주세요.');
    }
  };

  if (loading) return <div className="payment-page">로딩 중...</div>;
  if (error) return <div className="payment-page">{error}</div>;

  return (
    <div className="payment-page">
      <div className="payment-header">
        <img src={logo} alt="로고" className="payment-logo" />
        <div className="payment-divider" />
      </div>

      <div className="payment-content-wrapper">
        <h1 className="payment-title">결제</h1>

        <div className="payment-container">
          <div className="info-box">
            <div className="info-header">강의</div>
            <div className="info-content">
              <div className="lecture-title">{program?.title || '-'}</div>
              <div className="lecture-price">{formatFee(program)}</div>
            </div>
          </div>

          <div className="info-box">
            <div className="info-header">결제수단</div>
            <div className="info-content-column">
              {['신용/체크카드', '휴대폰', '무통장입금'].map((method, idx) => (
                <div className="payment-method" key={idx}>
                  <img src={select} alt="선택" className="method-icon" />
                  <span>{method}</span>
                </div>
              ))}
            </div>
          </div>

          <button className="pay-button" onClick={handlePayment}>
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

