import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from './Navbar.module.css';
import { CiLogin, CiLogout } from "react-icons/ci";
import logo from '../../img/아이콘최종.png';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [programSubVisible, setProgramSubVisible] = useState(false);
  const [programSubPinned, setProgramSubPinned] = useState(false);
  const [postSubVisible, setPostSubVisible] = useState(false);
  const [postSubPinned, setPostSubPinned] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // 컴포넌트 마운트 시 accessToken 확인해서 로그인 상태 초기화
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    navigate("/admin/login");
  };

  return (
    <>
      <div className={styles.topBar}>
        클라우드 기반 공공 체육시설 예약 서비스
      </div>

      <nav className={styles.navbar}>
        <div className={styles.leftSection}>
          <a
            href="/admin"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/`);
            }}
          >
            <img src={logo} alt="로고" className={styles.logo} />
          </a>

          {/* 메뉴 */}
          <ul className={styles.menu}>
            <li>
              <a
                href="/admin/member"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/admin/member");
                }}
                className={`${styles.menuLink} ${location.pathname.includes('/admin/member') ? styles.activeMenu : ''}`}
              >
                회원 관리
              </a>
            </li>

            <li
              className={styles.mypageWrapper}
              onMouseEnter={() => setProgramSubVisible(true)}
              onMouseLeave={() => !programSubPinned && setProgramSubVisible(false)}
              onClick={() => setProgramSubPinned(!programSubPinned)}
            >
              <span
                className={`${styles.menuLink} ${location.pathname.includes('/admin/program') ? styles.activeMenu : ''}`}
              >
                수강 관리
              </span>
            </li>

            <li
              className={styles.mypageWrapper}
              onMouseEnter={() => setPostSubVisible(true)}
              onMouseLeave={() => !postSubPinned && setPostSubVisible(false)}
              onClick={() => setPostSubPinned(!postSubPinned)}
            >
              <span
                className={`${styles.menuLink} ${location.pathname.includes('/admin/post') ? styles.activeMenu : ''}`}
              >
                게시글 관리
              </span>
            </li>
          </ul>
        </div>

        <div className={styles.authButtons}>
          {!isLoggedIn ? (
            <a
              href="/login"
              onClick={(e) => {
                e.preventDefault();
                navigate("/admin/login");
              }}
              className={styles.authLink}
            >
              <CiLogin size={20} /> 로그인
            </a>
          ) : (
            <button
              className={styles.authLink}
              onClick={handleLogout}
              type="button"
              aria-label="로그아웃"
            >
              <CiLogout size={20} />
              로그아웃
            </button>
          )}
        </div>
      </nav>

      {/* 수강 관리 서브메뉴 */}
      {programSubVisible && (
        <div
          className={styles.submenuBar}
          onMouseEnter={() => setProgramSubVisible(true)}
          onMouseLeave={() => !programSubPinned && setProgramSubVisible(false)}
        >
          <button
            type="button"
            onClick={() => navigate("/admin/program/list")}
            className={`${styles.submenuLink} ${location.pathname.includes('/program/list') ? styles.activeMenu : ''}`}
          >
            프로그램 관리
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/program/add")}
            className={`${styles.submenuLink} ${location.pathname.includes('/program/add') ? styles.activeMenu : ''}`}
          >
            프로그램 추가
          </button>
        </div>
      )}

      {/* 게시글 관리 서브메뉴 */}
      {postSubVisible && (
        <div
          className={styles.submenuBar}
          onMouseEnter={() => setPostSubVisible(true)}
          onMouseLeave={() => !postSubPinned && setPostSubVisible(false)}
        >
          <button
            type="button"
            onClick={() => navigate("/admin/post/notice")}
            className={`${styles.submenuLink} ${location.pathname.includes('/post/notice') ? styles.activeMenu : ''}`}
          >
            공지사항
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/post/promotion")}
            className={`${styles.submenuLink} ${location.pathname.includes('/post/promotion') ? styles.activeMenu : ''}`}
          >
            홍보물
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/post/facility")}
            className={`${styles.submenuLink} ${location.pathname.includes('/post/facility') ? styles.activeMenu : ''}`}
          >
            시설
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
