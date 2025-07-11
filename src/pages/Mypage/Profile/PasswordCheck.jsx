import { useState } from "react";
import { verifyPassword } from "../../../Api";
import styles from './PasswordCheck.module.css';

const PasswordCheck = ({ onVerify }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async () => {
    try {
      const result = await verifyPassword(password);
      console.log("인증 결과:", result);

      if (result.matched) {
        onVerify(); // 인증 성공 시 부모에 알림
      } else {
        setError("비밀번호가 올바르지 않습니다.");
      }
    } catch (err) {
      console.error("인증 실패:", err);
      setError("서버 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>비밀번호 확인</div>
      <div className={styles.subtitle}>
        회원정보를 확인 및 수정하기 전 고객님의 본인 확인을 위한 <br />
        비밀번호 입력을 진행해 주시길 바랍니다.
      </div>
      <input
        type="password"
        className={styles.passwordInput}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setError("");
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleVerify();
          }
        }}
      />
      <button className={styles.submitButton} onClick={handleVerify}>
        확인
      </button>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default PasswordCheck;
