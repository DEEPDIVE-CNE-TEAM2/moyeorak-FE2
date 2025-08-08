import { useState } from "react";
import styles from "./Login.module.css"; 
import { FaUser } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { adminLogin, getAdminInfo } from "../../Api";
import logo from "../../img/아이콘최종.png"; // <-- import 방식으로 수정

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await adminLogin(form.email, form.password);
      const userInfo = await getAdminInfo();

      if (userInfo?.role === "ADMIN" || userInfo?.isSuperUser) {
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        navigate("/");
      } else {
        alert("관리자 권한이 없습니다.");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다. 관리자 계정을 확인해주세요.");
    }
  };

  return (
    <div className={styles.container}>
      <img src={logo} alt="모여락" className={styles.logo} /> {/* import된 이미지 사용 */}

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>이메일</label>
        <div className={styles.inputWithIcon}>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="이메일 입력"
            className={styles.input}
            required
          />
          <FaUser className={styles.iconInside} />
        </div>

        <label className={styles.label}>비밀번호</label>
        <div className={styles.inputWithIcon}>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="비밀번호 입력"
            className={styles.input}
            required
          />
          <TbLockPassword className={styles.iconInside} />
        </div>

        <button type="submit" className={styles.submitBtn}>
          로그인
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
