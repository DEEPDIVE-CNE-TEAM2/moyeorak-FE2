import styles from './PasswordCheck.module.css';


const PasswordCheck = ({ onVerify }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>비밀번호 확인</div>
      <div className={styles.subtitle}>
        회원정보를 확인 및 수정하기전 고객님의 본인 확인을 위한 <br />비밀번호 입력을 진행해 주시길 바랍니다.
      </div>
      <input type="password" className={styles.passwordInput} />
      <button className={styles.submitButton} onClick={onVerify}>확인</button>
    </div>
  );
};

export default PasswordCheck;
