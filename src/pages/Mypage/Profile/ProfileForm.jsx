import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Userform.module.css';
import { getUserInfo } from '../../../Api'; // 경로는 네 프로젝트에 맞게 조정

const ProfileForm = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState(''); // '남' 또는 '여'
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setName(data.name || '');
        setEmail(data.email || '');
        setPhone(data.phone || '');
        setGender(data.gender === 'MALE' ? '남' : '여');
      } catch (error) {
        console.error('회원 정보 불러오기 실패:', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className={styles.wrapper}>
      {/* 이름 */}
      <div className={styles.field}>
        <label className={styles.label}>이름</label>
        <input
          className={styles.input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* 성별 */}
      <div className={styles.field}>
        <label className={styles.label}>성별</label>
        <div className={styles.genderWrapper}>
          <button
            type="button"
            className={`${styles.genderButton} ${gender === '남' ? styles.selected : ''}`}
            onClick={() => setGender('남')}
          >
            남
          </button>
          <button
            type="button"
            className={`${styles.genderButton} ${gender === '여' ? styles.selected : ''}`}
            onClick={() => setGender('여')}
          >
            여
          </button>
        </div>
      </div>

      {/* 비밀번호 */}
      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label className={styles.label}>비밀번호</label>
          <button
            className={styles.editButton}
            onClick={() => navigate('/mypage/profile/password')}
          >
            수정
          </button>
        </div>
        <input
          className={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* 이메일 */}
      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label className={styles.label}>이메일</label>
          <button className={styles.editButton}>수정</button>
        </div>
        <input
          className={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* 휴대폰 번호 */}
      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label className={styles.label}>휴대폰 번호</label>
          <button
            className={styles.editButton}
            onClick={() => navigate('/mypage/profile/phone')}
          >
            수정
          </button>
        </div>
        <input
          className={styles.input}
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div
        className={styles.withdraw}
        onClick={() => navigate('/mypage/profile/withdraw')}
      >
        탈퇴하기
      </div>
    </div>
  );
};

export default ProfileForm;
