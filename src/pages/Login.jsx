import { useState } from "react";
import styles from "../styles/Login.module.css";
import { FaUser } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { login, getUserInfo, getAccessToken } from "../Api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // 1. 로그인 시도
    const response = await login(form.email, form.password);

    console.log("로그인 응답 accessToken:", getAccessToken());

    // 2. 로그인 성공 후 accessToken 저장됨
    const userInfo = await getUserInfo();

    const serverRegionId = Number(userInfo.regionId);
    const localRegionId = Number(localStorage.getItem("selectedRegionId"));

    console.log("서버 regionId:", serverRegionId);
    console.log("로컬 regionId:", localRegionId);

    // 3. regionId 비교
    if (serverRegionId === localRegionId) {
      alert("로그인 성공!");

      const regionMap = {
        1: "jung",
        2: "seongdong",
        3: "songpa",
      };

      const regionPath = regionMap[serverRegionId] || "";
      navigate(regionPath ? `/${regionPath}` : "/");
    } else {
      alert("선택한 지역과 회원의 등록 지역이 다릅니다.");
      navigate("/");
    }
  } catch (error) {
    console.error("로그인 실패:", error.response?.data || error.message);
    alert(
      error.response?.data?.message ||
      "로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요."
    );
  }
};



  return (
    <div className={styles.container}>
      <img src="/img/아이콘최종.png" alt="모여락" className={styles.logo} />

      <form className={styles.form} onSubmit={handleSubmit}>
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
            required
          />
          <FaUser className={styles.iconInside} />
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
            autoComplete="current-password"
            required
          />
          <TbLockPassword className={styles.iconInside} />
        </div>

        <div className={styles.forgotPassword}>
          <a href="/forgot-password">비밀번호를 잊으셨나요?</a>
        </div>

        <button type="submit" className={styles.submitBtn}>
          로그인
        </button>
      </form>

      <div className={styles.signUpLink}>
        아직 계정이 없으신가요?{" "}
        <a href="/joinMembership">회원가입하기</a>
      </div>
    </div>
  );
};

export default Login;
