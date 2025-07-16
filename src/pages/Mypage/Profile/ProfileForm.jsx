import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUserInfo, updateUserInfo, checkEmailDuplicate } from '../../../Api';
import styles from './Userform.module.css';

const ProfileForm = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('남');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birth, setBirth] = useState('');
  const [regionName, setRegionName] = useState('');
  const [regionId, setRegionId] = useState(null);

  const [originalData, setOriginalData] = useState(null);
  const [emailChecked, setEmailChecked] = useState(false);
  const [emailDuplicate, setEmailDuplicate] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();

        const updatedPhone = location.state?.updatedPhone || localStorage.getItem('updatedPhone') || data.phone;

        setName(data.name || '');
        setGender(data.gender === 'MALE' ? '남' : '여');
        setEmail(data.email || '');
        setPhone(updatedPhone || '');
        setBirth(data.birth || '');

        if (location.state?.updatedRegion && location.state?.updatedRegionId !== undefined) {
          setRegionName(location.state.updatedRegion);
          setRegionId(location.state.updatedRegionId);
        } else {
          setRegionName(data.regionName || '');
          setRegionId(data.regionId || null);
        }

        setOriginalData({
          name: data.name || '',
          gender: data.gender === 'MALE' ? '남' : '여',
          email: data.email || '',
          phone: data.phone || '',
          birth: data.birth || '',
          regionName: data.regionName || '',
          regionId: data.regionId || null,
        });

        setEmailChecked(true);
        setEmailDuplicate(false);
      } catch (error) {
        console.error('회원 정보 불러오기 실패:', error);
      }
    };

    fetchUserInfo();
  }, [location.state]);

  const onEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailChecked(false);
    setEmailDuplicate(false);
  };

  const handleCheckEmail = async () => {
    if (!email.trim()) {
      alert('이메일을 입력하세요.');
      return;
    }
    try {
      const res = await checkEmailDuplicate(email);
      alert(res.isDuplicate ? '이미 사용 중인 이메일입니다.' : '사용 가능한 이메일입니다.');
      setEmailChecked(true);
      setEmailDuplicate(res.isDuplicate);
    } catch (err) {
      console.error(err);
      alert('이메일 중복 확인 중 오류가 발생했습니다.');
    }
  };

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !birth.trim() || !regionName.trim()) {
      alert('이름, 이메일, 생년월일, 휴대폰 번호, 주소는 모두 입력해야 합니다.');
      return;
    }

    if (
      originalData &&
      name === originalData.name &&
      gender === originalData.gender &&
      email === originalData.email &&
      phone === originalData.phone &&
      birth === originalData.birth &&
      regionName === originalData.regionName &&
      regionId === originalData.regionId
    ) {
      alert('수정된 정보가 없습니다.');
      return;
    }

    if (!emailChecked) {
      alert('이메일 중복 확인이 필요합니다.');
      return;
    }

    if (emailDuplicate) {
      alert('중복된 이메일이므로 다른 이메일을 사용해주세요.');
      return;
    }

    try {
      const payload = {
        email,
        name,
        phone,
        gender: gender === '남' ? 'MALE' : 'FEMALE',
        birth,
        regionName,
        regionId,
      };

      await updateUserInfo(payload);

      const updated = await getUserInfo();
      localStorage.setItem('regionId', updated.regionId);
      localStorage.removeItem('updatedPhone');

      if (email !== originalData.email) {
        alert('이메일이 변경되어 다시 로그인해야 합니다.');
        navigate('/login');
        return;
      }

      alert('회원 정보가 수정되었습니다.');
      setOriginalData({ name, gender, email, phone, birth, regionName, regionId });
      setEmailChecked(true);
      setEmailDuplicate(false);
    } catch (error) {
      console.error('회원 정보 수정 실패:', error);
      alert('회원 정보 수정 중 오류가 발생했습니다.');
    }
  };

  const handleRegionEditClick = () => {
    navigate('/mypage/profile/Region', {
      state: { currentRegion: regionName },
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.field}>
        <label className={styles.label}>이름</label>
        <input className={styles.input} type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>성별</label>
        <div className={styles.genderWrapper}>
          <button type="button" className={`${styles.genderButton} ${gender === '남' ? styles.selected : ''}`} onClick={() => setGender('남')}>남</button>
          <button type="button" className={`${styles.genderButton} ${gender === '여' ? styles.selected : ''}`} onClick={() => setGender('여')}>여</button>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>생년월일</label>
        <input className={styles.input} type="date" value={birth} onChange={(e) => setBirth(e.target.value)} />
      </div>

      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label className={styles.label}>이메일</label>
          <button type="button" className={styles.editButton2} onClick={handleCheckEmail}>중복확인</button>
        </div>
        <input className={styles.input} type="email" value={email} onChange={onEmailChange} />
      </div>

      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label className={styles.label}>휴대폰 번호</label>
          <button type="button" className={styles.editButton} onClick={() => navigate('/mypage/profile/phone')}>수정</button>
        </div>
        <input className={styles.input} type="tel" value={phone} readOnly />
      </div>

      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label className={styles.label}>주소</label>
          <button type="button" className={styles.editButton} onClick={handleRegionEditClick}>수정</button>
        </div>
        <input className={styles.input} type="text" value={regionName} readOnly />
      </div>

      <button className={styles.submitButton} onClick={handleSubmit}>확인</button>

      <div className={styles.withdraw} onClick={() => navigate('/mypage/profile/password')}>비밀번호변경</div>
      <div className={styles.withdraw} onClick={() => navigate('/mypage/profile/withdraw')}>탈퇴하기</div>
    </div>
  );
};

export default ProfileForm;
