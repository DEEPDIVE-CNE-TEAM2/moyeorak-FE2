import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "../styles/JoinMembership.module.css";

import { TbLockPassword } from "react-icons/tb";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";

import logo from '../img/아이콘최종.png';
import { signup, checkEmailDuplicate, checkPhoneDuplicate, getRegionList } from '../Api';

const JoinMembership = () => {
  const navigate = useNavigate();
  const [regionOptions, setRegionOptions] = useState([]);

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    birth: "",
    gender: "",
    phone: "",
    regionId: "",
  });

  // 중복확인 여부 상태 추가
  const [emailChecked, setEmailChecked] = useState(false);
  const [phoneChecked, setPhoneChecked] = useState(false);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const regions = await getRegionList();
        setRegionOptions(regions);
      } catch (err) {
        console.error('지역 불러오기 실패', err);
      }
    };
    fetchRegions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // 이메일/전화번호 변경 시 중복확인 상태 초기화
    if (name === "email") setEmailChecked(false);
    if (name === "phone") setPhoneChecked(false);
  };

  const handleGenderSelect = (gender) => {
    setForm((prev) => ({ ...prev, gender }));
  };

  const handleCheckEmail = async () => {
    if (!form.email.trim()) {
      alert("이메일을 입력해주세요.");
      return;
    }
    try {
      const res = await checkEmailDuplicate(form.email);
      alert(res.isDuplicate ? "이미 사용 중인 이메일입니다." : "사용 가능한 이메일입니다.");
      setEmailChecked(!res.isDuplicate); // 중복 아니면 true
    } catch (err) {
      console.error(err);
      alert("이메일 중복 확인 중 오류가 발생했습니다.");
      setEmailChecked(false);
    }
  };

  const handleCheckPhone = async () => {
    if (!form.phone.trim()) {
      alert("휴대폰 번호를 입력해주세요.");
      return;
    }
    try {
      const res = await checkPhoneDuplicate(form.phone);
      alert(res.isDuplicate ? "이미 사용 중인 번호입니다." : "사용 가능한 번호입니다.");
      setPhoneChecked(!res.isDuplicate); // 중복 아니면 true
    } catch (err) {
      console.error(err);
      alert("휴대폰 중복 확인 중 오류가 발생했습니다.");
      setPhoneChecked(false);
    }
  };

  const isPasswordMatch = form.password && form.password === form.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 빈 값 확인
    if (
      !form.email.trim() ||
      !form.password.trim() ||
      !form.confirmPassword.trim() ||
      !form.name.trim() ||
      !form.birth.trim() ||
      !form.gender.trim() ||
      !form.phone.trim() ||
      !form.regionId.trim()
    ) {
      alert("모든 항목을 빠짐없이 입력해주세요.");
      return;
    }

    // 중복확인 여부 검사
    if (!emailChecked) {
      alert("이메일 중복 확인이 필요합니다.");
      return;
    }

    if (!phoneChecked) {
      alert("휴대폰 번호 중복 확인이 필요합니다.");
      return;
    }

    if (!isPasswordMatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const genderMap = { 남: "MALE", 여: "FEMALE" };
    const genderForApi = genderMap[form.gender] || "";

    const payload = {
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword,
      name: form.name,
      birth: form.birth,
      gender: genderForApi,
      phone: form.phone,
      regionId: form.regionId,
    };

    console.log("회원가입 요청 데이터:", payload);

    try {
      await signup(payload);
      alert("회원가입 성공!");
      navigate('/login');
    } catch (err) {
      console.error("회원가입 에러 전체:", err);
      console.error("서버 응답 데이터:", err.response?.data);
      alert("회원가입 실패: " + (err.response?.data?.message || JSON.stringify(err.response?.data) || err.message));
    }
  };

  return (
    <div className={styles.container}>
      <img src={logo} alt="모여락" className={styles.logo} />
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>이메일</label>
        <div className={styles.emailRow}>
          <input
            type="email"
            name="email"
            placeholder="이메일 입력"
            value={form.email}
            onChange={handleChange}
            className={styles.emailInput}
            required
          />
          <button type="button" className={styles.duplicateBtn} onClick={handleCheckEmail}>
            중복확인
          </button>
        </div>

        <label className={styles.label}>비밀번호</label>
        <div className={styles.inputWithIcon}>
          <input
            type="password"
            name="password"
            placeholder="비밀번호 입력"
            value={form.password}
            onChange={handleChange}
            className={styles.input}
            autoComplete="new-password"
            required
          />
          <TbLockPassword className={styles.iconInside} />
        </div>

        <label className={styles.label}>비밀번호 확인</label>
        <div className={styles.passwordConfirmRow}>
          <div className={styles.inputWithIcon}>
            <input
              type="password"
              name="confirmPassword"
              placeholder="비밀번호 재입력"
              value={form.confirmPassword}
              onChange={handleChange}
              className={styles.input}
              autoComplete="new-password"
              required
            />
            {form.confirmPassword.length > 0 && !isPasswordMatch && (
              <IoMdCloseCircleOutline className={styles.passwordMismatchIcon} />
            )}
            {isPasswordMatch && (
              <FaRegCheckCircle className={styles.passwordMatchIcon} />
            )}
          </div>
        </div>

        <label className={styles.label}>이름</label>
        <input
          type="text"
          name="name"
          placeholder="이름 입력"
          value={form.name}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <label className={styles.label}>생일</label>
        <input
          type="date"
          name="birth"
          placeholder="생일 입력"
          value={form.birth}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <label className={styles.label}>주소</label>
        <select
          name="regionId"
          value={form.regionId}
          onChange={handleChange}
          className={styles.input}
          required
        >
          <option value="">지역 선택</option>
          {regionOptions.map(region => (
            <option key={region.id} value={region.id}>
              {region.name}
            </option>
          ))}
        </select>

        <label className={styles.label}>성별</label>
        <div className={styles.genderWrapper}>
          <button
            type="button"
            className={`${styles.genderBtn} ${form.gender === "남" ? styles.genderSelected : ""}`}
            onClick={() => handleGenderSelect("남")}
          >
            남
          </button>
          <button
            type="button"
            className={`${styles.genderBtn} ${form.gender === "여" ? styles.genderSelected : ""}`}
            onClick={() => handleGenderSelect("여")}
          >
            여
          </button>
        </div>

        <label className={styles.label}>휴대폰 번호</label>
        <div className={styles.phoneRow}>
          <input
            type="tel"
            name="phone"
            placeholder="xxx-xxxx-xxxx"
            value={form.phone}
            onChange={handleChange}
            className={styles.phoneInput}
            required
          />
          <button type="button" className={styles.duplicateBtn} onClick={handleCheckPhone}>
            중복확인
          </button>
        </div>

        <button type="submit" className={styles.submitBtn}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default JoinMembership;
