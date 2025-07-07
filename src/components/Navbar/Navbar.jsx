import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from './Navbar.module.css';
import { CiLogin, CiLogout } from "react-icons/ci";
import { FaUserPlus } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

const Navbar = ({
  selectedDistrict = "",
  onDistrictChange,
  districts = [],
  districtToPath = {},
  districtToRentalPath = {},
  isLoggedIn = false,
  onLogout,
  onLogoClick, 
  onFacilityClick, 
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [submenuPinned, setSubmenuPinned] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // 드롭다운에서 지역구 선택 시
  const handleSelect = (district) => {
    if (onDistrictChange) onDistrictChange(district);
    setDropdownOpen(false);
  };

  // 경로 계산
  const selectedPath = districtToPath?.[selectedDistrict] || "";
  const rentalPath = districtToRentalPath?.[selectedDistrict] || "/";

  return (
    <>
      <div className={styles.topBar}>
        클라우드 기반 공공 체육시설 예약 서비스
      </div>

      <nav className={styles.navbar}>
        <div className={styles.leftSection}>
          {/* 로고 클릭 시 onLogoClick 호출 */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (onLogoClick) onLogoClick();
              else {
                if (selectedDistrict && districtToPath[selectedDistrict]) {
                  navigate(`/${districtToPath[selectedDistrict]}`);
                } else {
                  navigate("/");
                }
              }
            }}
          >
            <img src="/img/아이콘최종.png" alt="로고" className={styles.logo} />
          </a>

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
                {districts.map((district) => (
                  <li key={district} onClick={() => handleSelect(district)}>
                    {district}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <ul className={styles.menu}>
            <li>
              {/* 시설 메뉴 클릭 시 onFacilityClick 호출 */}
              <a
                href={`/${selectedPath}/place`}
                onClick={(e) => {
                  e.preventDefault();
                  if (onFacilityClick) onFacilityClick();
                  else {
                    navigate(`/${selectedPath}/place`);
                  }
                }}
                className={`${styles.menuLink} ${location.pathname.includes('/place') ? styles.activeMenu : ''}`}
              >
                시설
              </a>
            </li>
            <li>
              <a
                href="/classReservation"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/classReservation");
                }}
                className={`${styles.menuLink} ${location.pathname === '/classReservation' ? styles.activeMenu : ''}`}
              >
                수강신청
              </a>
            </li>
            <li>
              <a
                href={rentalPath}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(rentalPath);
                }}
                className={`${styles.menuLink} ${location.pathname.includes('/rental') ? styles.activeMenu : ''}`}
              >
                대관신청
              </a>
            </li>
            <li>
              <a
                href="/announcement"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/announcement");
                }}
                className={`${styles.menuLink} ${location.pathname === '/announcement' ? styles.activeMenu : ''}`}
              >
                공지사항
              </a>
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
              <a
                href="/login"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
                className={styles.authLink}
              >
                <CiLogin size={20} /> 로그인
              </a>
              <div className={styles.divider}></div>
              <a
                href="/joinMembership"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/joinMembership");
                }}
                className={styles.authLink}
              >
                <FaUserPlus size={18} /> 회원가입
              </a>
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
          <a href="/mypage/profile" onClick={e => { e.preventDefault(); navigate("/mypage/profile"); }} className={styles.submenuLink}>회원정보수정</a>
          <a href="/mypage/classes" onClick={e => { e.preventDefault(); navigate("/mypage/classes"); }} className={styles.submenuLink}>수강신청내역</a>
          <a href="/mypage/rentals" onClick={e => { e.preventDefault(); navigate("/mypage/rentals"); }} className={styles.submenuLink}>대관신청내역</a>
        </div>
      )}
    </>
  );
};

export default Navbar;
