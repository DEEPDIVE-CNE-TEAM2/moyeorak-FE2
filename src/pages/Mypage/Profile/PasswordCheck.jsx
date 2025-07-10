import React, { useState } from 'react';
import styles from './PasswordCheck.module.css';
import { verifyPassword } from '../../../Api'; 

const PasswordCheck = ({ onVerify }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleVerify = async () => {
    try {
      const result = await verifyPassword(password);
      if (result.matched) {
        onVerify();
      } else {
        setError('비밀번호가 일치하지 않습니다.');
      }
    } catch (err) {
      setError('비밀번호 확인 중 오류가 발생했습니다.');
      console.error(err);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>비밀번호 확인</div>
      <div className={styles.subtitle}>
        회원정보를 확인 및 수정하기 전 고객님의 본인 확인을 위한 <br />
        비밀번호 입력을 진행해 주시길 바랍니다.
      </div>
      <input
        type="password"
        className={styles.passwordInput}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <div className={styles.errorMessage}>{error}</div>}
      <button className={styles.submitButton} onClick={handleVerify}>
        확인
      </button>
    </div>
  );
};

export default PasswordCheck;
