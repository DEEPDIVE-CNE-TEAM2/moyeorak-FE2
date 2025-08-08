import React, { useState } from "react";
import styles from "./AddUser.module.css";
import { createUser } from "../../../Api"; 

export default function AddUser({ onSave, onCancel }) {
  const [email, setEmail] = useState("");
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");

  const handleEmailCheck = () => {
    if (email.trim() === "") {
      alert("이메일을 입력해주세요.");
      setIsEmailChecked(false);
      return;
    }
    alert("사용할 수 있는 이메일입니다.");
    setIsEmailChecked(true);
  };

  const handleSave = async () => {
    if (
      !email ||
      !isEmailChecked ||
      !password ||
      password !== passwordConfirm ||
      !name ||
      !gender ||
      !birth ||
      !phone
    ) {
      alert("모든 항목을 올바르게 입력해주세요.");
      return;
    }

    const newUser = {
      email,
      password,
      name,
      gender,
      birth,
      phone,
    };

    try {
      const res = await createUser(newUser);
      alert("회원 신규 등록되었습니다.");
      if (onSave) onSave(res);
    } catch (error) {
      alert("회원 등록에 실패했습니다.");
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>회원 신규 등록</h2>

      {/* 이메일 입력 및 중복확인 */}
      <div className={styles.formGroup}>
        <label className={styles.label}>이메일</label>
        <div className={styles.emailCheckRow}>
          <input
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsEmailChecked(false);
            }}
            placeholder="이메일 입력"
          />
          <button
            type="button"
            className={`${styles.checkBtn} ${styles.greyBtn}`}
            onClick={handleEmailCheck}
          >
            중복확인
          </button>
        </div>
      </div>

      {/* 비밀번호 */}
      <div className={styles.formGroup}>
        <label className={styles.label}>비밀번호</label>
        <input
          type="password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호 입력"
        />
      </div>

      {/* 비밀번호 확인 */}
      <div className={styles.formGroup}>
        <label className={styles.label}>비밀번호 확인</label>
        <input
          type="password"
          className={styles.input}
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="비밀번호 확인"
        />
      </div>

      {/* 이름 */}
      <div className={styles.formGroup}>
        <label className={styles.label}>이름</label>
        <input
          type="text"
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름 입력"
        />
      </div>

      {/* 성별 */}
      <div className={styles.formGroup}>
        <label className={styles.label}>성별</label>
        <div className={styles.genderGroup}>
          <button
            type="button"
            className={`${styles.genderBtn} ${gender === "남" ? styles.selected : ""}`}
            onClick={() => setGender("남")}
          >
            남
          </button>
          <button
            type="button"
            className={`${styles.genderBtn} ${gender === "여" ? styles.selected : ""}`}
            onClick={() => setGender("여")}
          >
            여
          </button>
        </div>
      </div>

      {/* 생년월일 */}
      <div className={styles.formGroup}>
        <label className={styles.label}>생년월일</label>
        <input
          type="date"
          className={styles.input}
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
        />
      </div>

      {/* 연락처 */}
      <div className={styles.formGroup}>
        <label className={styles.label}>연락처</label>
        <input
          type="tel"
          className={styles.input}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="- 포함해서 입력"
        />
      </div>

      {/* 저장 / 취소 버튼 */}
      <div className={styles.btnGroup}>
        <button
          type="button"
          className={`${styles.saveBtn} ${styles.blueBtn}`}
          onClick={handleSave}
        >
          저장
        </button>
        <button
          type="button"
          className={`${styles.cancelBtn} ${styles.greyBtn}`}
          onClick={onCancel}
        >
          취소
        </button>
      </div>
    </div>
  );
}
