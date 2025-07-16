import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUserInfo, updateUserInfo } from '../../../Api';
import Navbar from '../../../components/Navbar/Navbar.jsx';
import styles from './Userform.module.css';

const regionMap = {
  '중구': 1,
  '성동구': 2,
  '송파구': 3,
};

const ChangeRegion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentRegion = location.state?.currentRegion || '';

  const [regionName, setRegionName] = useState(currentRegion);

  const handleSubmit = async () => {
    if (!regionName.trim()) {
      alert('주소를 입력하세요.');
      return;
    }

    const regionId = regionMap[regionName] || null;

    try {
      const currentUser = await getUserInfo();

      const payload = {
        email: currentUser.email,
        name: currentUser.name,
        phone: currentUser.phone,
        gender: currentUser.gender,
        birth: currentUser.birth,
        regionName,
        regionId,
      };

      await updateUserInfo(payload);

      alert('주소가 수정되었습니다.');

      navigate('/mypage/profile');
    } catch (error) {
      console.error('주소 업데이트 실패:', error);
      alert('주소 변경 중 오류가 발생했습니다.');
    }
  };

  const handleCancel = () => {
    navigate('/mypage/profile');
  };

  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>주소 변경</div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>주소 변경</label>
          <input
            className={styles.input}
            type="text"
            value={regionName}
            onChange={(e) => setRegionName(e.target.value)}
          />
        </div>

        <button className={styles.submitButton} onClick={handleSubmit}>
          확인
        </button>

        <button
          className={styles.submitButton}
          style={{ backgroundColor: '#888', marginTop: '10px' }}
          onClick={handleCancel}
        >
          취소
        </button>
      </div>
    </>
  );
};

export default ChangeRegion;
