import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from './Navbar.module.css';
import { CiLogin, CiLogout } from "react-icons/ci";
import { FaUserPlus } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

const Navbar = ({
  selectedDistrict,
  onDistrictChange,
  districts,
  districtToPath,
  districtToRentalPath,
  isLoggedIn,
  onLogout,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [submenuPinned, setSubmenuPinned] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleSelect = (district) => {
    if (onDistrictChange) onDistrictChange(district);
    setDropdownOpen(false);
  };

  const selectedPath = (districtToPath && districtToPath[selectedDistrict]) || "";

  return (
    <>
      <div className={styles.topBar}>
        클라우드 기반 공공 체육시설 예약 서비스
      </div>

      <nav className={styles.navbar}>
        <div className={styles.leftSection}>
          <Link to={`/${selectedPath}`}>
            <img src="/img/아이콘최종.png" alt="로고" className={styles.logo} />
          </Link>

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
              <span>{selectedDistrict || "지역 선택"}</span>
            </button>
            {dropdownOpen && (
              <ul className={styles.dropdownList}>
                {(districts || []).map((district) => (
                  <li key={district} onClick={() => handleSelect(district)}>
                    {district}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <ul className={styles.menu}>
            <li>
              <Link
                to={`/${selectedPath}/place`}
                className={`${styles.menuLink} ${location.pathname.includes('/place') ? styles.activeMenu : ''}`}
              >
                시설
              </Link>
            </li>
            <li>
              <Link
                to="/classReservation"
                className={`${styles.menuLink} ${location.pathname === '/classReservation' ? styles.activeMenu : ''}`}
              >
                수강신청
              </Link>
            </li>
            <li>
              <Link
                to={`/rental/${districtToRentalPath?.[selectedDistrict] || ""}`}
                className={`${styles.menuLink} ${location.pathname.includes('/rental') ? styles.activeMenu : ''}`}
              >
                대관신청
              </Link>
            </li>
            <li>
              <Link
                to="/announcement"
                className={`${styles.menuLink} ${location.pathname === '/announcement' ? styles.activeMenu : ''}`}
              >
                이용안내
              </Link>
            </li>
            <li
              className={styles.mypageWrapper}
              onMouseEnter={() => setShowSubmenu(true)}
              onMouseLeave={() => !submenuPinned && setShowSubmenu(false)}
              onClick={() => setSubmenuPinned(!submenuPinned)}
            >
              <span className={styles.menuLink}>마이페이지</span>
            </li>
          </ul>
        </div>

        <div className={styles.authButtons}>
          {!isLoggedIn ? (
            <>
              <Link to="/login" className={styles.authLink}>
                <CiLogin size={20} /> 로그인
              </Link>
              <div className={styles.divider}></div>
              <Link to="/joinMembership" className={styles.authLink}>
                <FaUserPlus size={18} /> 회원가입
              </Link>
            </>
          ) : (
            <button
              className={styles.authLink}
              onClick={() => {
                if (onLogout) onLogout();
                else navigate("/login");
              }}
              type="button"
            >
              <CiLogout size={20} />
              로그아웃
            </button>
          )}
        </div>
      </nav>

      {showSubmenu && (
        <div
          className={styles.submenuBar}
          onMouseEnter={() => setShowSubmenu(true)}
          onMouseLeave={() => !submenuPinned && setShowSubmenu(false)}
        >
          <Link to="/mypage/profile" className={styles.submenuLink}>회원정보수정</Link>
          <Link to="/mypage/classes" className={styles.submenuLink}>수강신청내역</Link>
          <Link to="/mypage/rentals" className={styles.submenuLink}>대관신청내역</Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
