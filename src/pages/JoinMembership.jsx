import React, { useState } from "react";
import styles from "../styles/JoinMembership.module.css";

import { TbLockPassword } from "react-icons/tb";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";

import logo from '../img/아이콘최종.png';
import { signup, checkEmailDuplicate, checkPhoneDuplicate } from '../Api';

const JoinMembership = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    birth: "",
    address: "",
    gender: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderSelect = (gender) => {
    setForm((prev) => ({ ...prev, gender }));
  };

  const handleCheckEmail = async () => {
    try {
      const res = await checkEmailDuplicate(form.email);
      alert(res.isDuplicate ? "이미 사용 중인 이메일입니다." : "사용 가능한 이메일입니다.");
    } catch (err) {
      console.error(err);
      alert("이메일 중복 확인 중 오류가 발생했습니다.");
    }
  };

  const handleCheckPhone = async () => {
    try {
      const res = await checkPhoneDuplicate(form.phone);
      alert(res.isDuplicate ? "이미 사용 중인 번호입니다." : "사용 가능한 번호입니다.");
    } catch (err) {
      console.error(err);
      alert("휴대폰 중복 확인 중 오류가 발생했습니다.");
    }
  };

  const isPasswordMatch = form.password && form.password === form.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPasswordMatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const genderMap = { 남: "MALE", 여: "FEMALE" };
    const genderForApi = genderMap[form.gender] || "";

    const payload = {
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword, // ✅ 필드명 맞춤
      name: form.name,
      birth: form.birth,
      address: form.address,
      gender: genderForApi,
      phone: form.phone,
    };

    console.log("회원가입 요청 데이터:", payload);

    try {
      await signup(payload);
      alert("회원가입 성공!");
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
        <input
          type="text"
          name="address"
          placeholder="xx시 xx구"
          value={form.address}
          onChange={handleChange}
          className={styles.input}
          required
        />

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
            placeholder="휴대폰 번호 입력"
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
