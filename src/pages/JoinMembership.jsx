import React, { useState } from "react";
import styles from "../styles/JoinMembership.module.css";

import { TbLockPassword } from "react-icons/tb";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";

import logo from '../img/아이콘최종.png';

const JoinMembership = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    age: "",  
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // 회원가입 처리 로직
  };

  const isPasswordMatch = form.password && form.password === form.passwordConfirm;

  return (
    <div className={styles.container}>
      {/* 로고 */}
      <img src={logo} alt="모여락" className={styles.logo} />

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* 이메일 */}
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
          <button type="button" className={styles.duplicateBtn}>
            중복확인
          </button>
        </div>

        {/* 비밀번호 */}
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

        {/* 비밀번호 확인 */}
        <label className={styles.label}>비밀번호 확인</label>
        <div className={styles.passwordConfirmRow}>
          <div className={styles.inputWithIcon}>
            <input
              type="password"
              name="passwordConfirm"
              placeholder="비밀번호 재입력"
              value={form.passwordConfirm}
              onChange={handleChange}
              className={styles.input}
              autoComplete="new-password"
              required
            />
            {form.passwordConfirm.length > 0 && !isPasswordMatch && (
              <IoMdCloseCircleOutline className={styles.passwordMismatchIcon} />
            )}
            {isPasswordMatch && (
              <FaRegCheckCircle className={styles.passwordMatchIcon} />
            )}
          </div>
        </div>

        {/* 이름 */}
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

        {/* 나이 (숫자 스피너 제거) */}
        <label className={styles.label}>나이</label>
        <input
          type="number"
          name="age"
          placeholder="나이 입력"
          value={form.age}
          onChange={handleChange}
          className={styles.input}
          min="0"
          max="120"
          required
        />

        {/* 주소 */}
        <label className={styles.label}>주소</label>
        <input
          type="text"
          name="address"
          placeholder="주소 입력"
          value={form.address}
          onChange={handleChange}
          className={styles.input}
          required
        />

        {/* 성별 */}
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

        {/* 휴대폰 번호 */}
        <label className={styles.label}>휴대폰 번호</label>
        <div className={styles.phoneRow}>
          <input
            type="tel"
            name="phone"
            placeholder="휴대폰번호 입력"
            value={form.phone}
            onChange={handleChange}
            className={styles.phoneInput}
            required
          />
          <button type="button" className={styles.duplicateBtn}>
            중복확인
          </button>
        </div>

        {/* 회원가입 버튼 */}
        <button type="submit" className={styles.submitBtn}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default JoinMembership;
