import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../../../components/Navbar/Navbar.jsx';
import styles from './Userform.module.css';

const ChangePhoneNumber = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleVerifyClick = () => {
    if (!phone.trim()) {
      alert('휴대폰 번호를 입력해주세요.');
      return;
    }
    setIsCodeSent(true);
    alert('인증번호가 전송되었습니다.');
  };

  const handleSubmit = () => {
    if (!code.trim()) {
      alert('인증번호를 입력해주세요.');
      return;
    }

    alert('번호가 변경되었습니다.');

    localStorage.setItem('updatedPhone', phone);
    navigate('/mypage/profile', { state: { updatedPhone: phone } });
  };

  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>번호 변경</div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>번호 변경</label>
          <div className={styles.inputWithButton}>
            <input className={styles.input} value={phone} onChange={(e) => setPhone(e.target.value)} />
            <button className={styles.verifyButton} onClick={handleVerifyClick}>
              인증
            </button>
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>인증번호</label>
          <input
            className={styles.input}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={!isCodeSent}
          />
        </div>

        <button className={styles.submitButton} onClick={handleSubmit}>
          확인
        </button>
      </div>
    </>
  );
};

export default ChangePhoneNumber;
