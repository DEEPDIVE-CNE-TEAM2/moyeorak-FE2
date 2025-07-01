import React from 'react';
import styles from './Popupmodal.module.css';
import X from '../../../img/X.svg';

const Popupmodal = ({ onClose, data }) => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.header}>
          신청하기
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
            <div className={styles.divider}></div>
        </React.Fragment>
        ))}
        </div>

        <div className={styles.confirmText}>
          위 내용으로 신청하시겠습니까?
        </div>

        <div className={styles.buttonWrapper}>
          <button className={styles.confirmBtn} onClick={onClose}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default Popupmodal;
