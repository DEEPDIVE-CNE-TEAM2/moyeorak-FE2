import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import { FaUser } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.container}>
      {/* 로고 */}
      <img src="/img/아이콘최종.png" alt="모여락" className={styles.logo} />

      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          // 로그인 처리 함수 추가 예정
        }}
      >
        {/* 이메일 */}
        <label className={styles.label}>이메일</label>
        <div className={styles.inputWithIcon}>
          <input
            type="email"
            name="email"
            placeholder="이메일 입력"
            value={form.email}
            onChange={handleChange}
            className={styles.input}
            autoComplete="username"
          />
          <FaUser className={styles.iconInside} />
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
            autoComplete="current-password"
          />
          <TbLockPassword className={styles.iconInside} />
        </div>

        {/* 비밀번호를 잊으셨나요? */}
        <div className={styles.forgotPassword}>
          <a href="/forgot-password">비밀번호를 잊으셨나요?</a>
        </div>

        {/* 로그인 버튼 */}
        <button type="submit" className={styles.submitBtn}>
          로그인
        </button>
      </form>

      {/* 회원가입하기 */}
      <div className={styles.signUpLink}>
        아직 계정이 없으신가요?{" "}
        <a href="/joinMembership">회원가입하기</a>
      </div>
    </div>
  );
};

export default Login;
