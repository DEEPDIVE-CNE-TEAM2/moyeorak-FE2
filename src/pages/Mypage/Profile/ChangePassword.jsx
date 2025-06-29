import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

import Navbar from '../../../components/Navbar/Navbar.jsx';
//import styles from './ChangePassword.module.css';
import styles from './Userform.module.css';
import lock from '../../../img/ic_outline-lock-person.svg';

const ChangePassword = () => {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      // 실제 백엔드 연결 시
      /*
      await axios.post('/api/change-password', {
        currentPassword,
        newPassword,
      });
      */

      // 임시 성공 처리
      console.log('가짜 비밀번호 변경 요청 실행됨');
      setTimeout(() => {
        alert('비밀번호가 성공적으로 변경되었습니다.');
        navigate('/mypage/profile');
      }, 500);

    } catch (error) {
      console.error(error);
      alert('비밀번호 변경에 실패했습니다.');
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        {/* 타이틀 */}
        <div className={styles.titleWrapper}>
          <img src={lock} alt="lock icon" className={styles.icon} />
          <div className={styles.title}>비밀번호 변경</div>
        </div>

        {/* 현재 비밀번호 */}
        <div className={styles.field}>
          <label className={styles.label}>현재 비밀번호</label>
          <input
            className={styles.input}
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>

        {/* 새 비밀번호 */}
        <div className={styles.field}>
          <label className={styles.label}>새 비밀번호</label>
          <input
            className={styles.input}
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        {/* 새 비밀번호 확인 */}
        <div className={styles.field}>
          <label className={styles.label}>새 비밀번호 확인</label>
          <input
            className={styles.input}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* 버튼 */}
        <button className={styles.submitButton} onClick={handleSubmit}>
          확인
        </button>
      </div>
    </>
  );
};

export default ChangePassword;
