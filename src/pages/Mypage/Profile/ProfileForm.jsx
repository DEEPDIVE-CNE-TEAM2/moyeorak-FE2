import { useState } from 'react';
import styles from './ProfileForm.module.css';

const ProfileForm = () => {
  const [gender, setGender] = useState('남');

  return (
    <div className={styles.wrapper}>
      {/* 이름 */}
      <div className={styles.field}>
        <label className={styles.label}>이름</label>
        <input className={styles.input} type="text" />
      </div>

      {/* 성별 */}
      <div className={styles.field}>
        <label className={styles.label}>성별</label>
        <div className={styles.genderWrapper}>
          <button
            className={`${styles.genderButton} ${gender === '남' ? styles.selected : ''}`}
            onClick={() => setGender('남')}
          >
            남
          </button>
          <button
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
          <button className={styles.editButton}>수정</button>
        </div>
        <input className={styles.input} type="password" />
      </div>

      {/* 이메일 */}
      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label className={styles.label}>이메일</label>
          <button className={styles.editButton}>수정</button>
        </div>
        <input className={styles.input} type="email" />
      </div>

      {/* 휴대폰 번호 */}
      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label className={styles.label}>휴대폰 번호</label>
          <button className={styles.editButton}>수정</button>
        </div>
        <input className={styles.input} type="tel" />
      </div>

      <div className={styles.withdraw}>탈퇴하기</div>
    </div>
  );
};

export default ProfileForm;

