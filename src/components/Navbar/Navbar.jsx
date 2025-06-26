import { useState } from "react";
import { Link } from "react-router-dom";
import styles from './Navbar.module.css';
import { CiLogin } from "react-icons/ci";
import { FaUserPlus } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

const districts = ["송파구", "강남구", "용산구", "서초구", "마포구"];

const Navbar = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("송파구");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handleSelect = (district) => {
    setSelectedDistrict(district);
    setDropdownOpen(false);
  };

  return (
    <>
      <div className={styles.topBar}>
        클라우드 기반 공공 체육시설 예약 서비스
      </div>
      <nav className={styles.navbar}>
        <div className={styles.leftSection}>
          <Link to="/">
            <img src="/img/아이콘최종.png" alt="로고" className={styles.logo} />
          </Link>

          {/* 지역구 드롭다운 */}
          <div className={styles.locationWrapper}>
            <button
              className={`${styles.locationDisplay} ${dropdownOpen ? styles.active : ''}`}
              onClick={toggleDropdown}
              aria-expanded={dropdownOpen}
            >
              <IoMdArrowDropdown
                size={18}
                className={dropdownOpen ? styles.iconRotated : ''}
              />
              <span>{selectedDistrict}</span>
            </button>
            {dropdownOpen && (
              <ul className={styles.dropdownList}>
                {districts.map((district) => (
                  <li key={district} onClick={() => handleSelect(district)}>
                    {district}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <ul className={styles.menu}>
            <li><Link to="/place" className={styles.menuLink}>시설</Link></li>
            <li><Link to="/classReservation" className={styles.menuLink}>수강신청</Link></li>
            <li><Link to="/rental" className={styles.menuLink}>대관신청</Link></li>
            <li><Link to="/announcement" className={styles.menuLink}>이용안내</Link></li>
            <li><Link to="/mypage" className={styles.menuLink}>마이페이지</Link></li>
          </ul>
        </div>

        <div className={styles.authButtons}>
          <Link to="/login" className={styles.authLink}>
            <CiLogin size={20} /> 로그인
          </Link>
          <div className={styles.divider}></div>
          <Link to="/joinMembership" className={styles.authLink}>
            <FaUserPlus size={18} /> 회원가입
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
