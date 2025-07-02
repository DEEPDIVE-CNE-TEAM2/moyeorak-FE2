import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Popupmodal.module.css';
import X from '../../../img/X.svg';

const Popupmodal2 = ({ onClose, data, id }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate(`/classReservation`);
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal2}>
        <div className={styles.header}>
          신청완료
          <img
            src={X}
            alt="닫기"
            className={styles.closeIcon}
            onClick={onClose}
          />
        </div>

        <div className={styles.content}>
          {[
            { label: '강좌명', value: data?.title },
            { label: '센터', value: data?.center || '-' },
            { label: '이용기간', value: data?.period || '-' },
            { label: '이용시간', value: data?.time || '-' },
            { label: '수강료', value: data?.price || '-' },
          ].map((item, idx, arr) => (
            <React.Fragment key={idx}>
              <div className={styles.row}>
                <div className={styles.left}>{item.label}</div>
                <div className={styles.right}>{item.value}</div>
              </div>
              {idx !== arr.length - 1 && <div className={styles.divider}></div>}
            </React.Fragment>
          ))}
        </div>

        <div className={styles.buttonWrapper}>
          <button className={styles.confirmBtn} onClick={handleConfirm}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default Popupmodal2;

