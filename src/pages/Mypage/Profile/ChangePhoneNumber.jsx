import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar.jsx';
import styles from './Userform.module.css';

const ChangePhoneNumber = () => {
  const navigate = useNavigate();
  const [newPhone, setNewPhone] = useState('');
  const [verifyCode, setVerifyCode] = useState('');

  const handleVerifyClick = () => {
    if (!newPhone.trim()) {
      alert('휴대폰 번호를 입력해주세요.');
      return;
    }

    alert('번호인증이 완료되었습니다.');
  };

  const handleSubmit = () => {
    if (!verifyCode.trim()) {
      alert('인증번호를 입력해주세요.');
      return;
    }

    alert('번호가 변경되었습니다.');
    navigate('/mypage/profile', { state: { updatedPhone: newPhone } });
  };

  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>번호 변경</div>
        </div>

        {/* 번호 입력 */}
        <div className={styles.field}>
          <label className={styles.label}>번호 변경</label>
          <div className={styles.inputWithButton}>
            <input
              className={styles.input}
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              placeholder="010-0000-0000"
            />
            <button className={styles.verifyButton} onClick={handleVerifyClick}>
              인증
            </button>
          </div>
        </div>

        {/* 인증번호 입력 */}
        <div className={styles.field}>
          <label className={styles.label}>인증번호</label>
          <input
            className={styles.input}
            value={verifyCode}
            onChange={(e) => setVerifyCode(e.target.value)}
            placeholder="인증번호 입력"
          />
        </div>

        {/* 확인 버튼 */}
        <button className={styles.submitButton} onClick={handleSubmit}>
          확인
        </button>
      </div>
    </>
  );
};

export default ChangePhoneNumber;
