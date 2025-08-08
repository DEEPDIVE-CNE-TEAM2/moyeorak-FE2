import React, { useState, useEffect } from "react";
import styles from "./PostNotice.module.css";
import AdminNavbar from "../../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { getNotices } from "../../../Api"; 

const PostNotice = () => {
  const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  // 공지사항 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNotices();
        // data가 배열인지 체크
        if (Array.isArray(data)) {
          setNotices(data);
        } else {
          console.error("공지사항 데이터가 배열이 아닙니다:", data);
          setNotices([]);
        }
      } catch (error) {
        console.error("공지사항 조회 중 오류:", error);
        setNotices([]);
      }
    };
    fetchData();
  }, []);

  // 페이지네이션 계산
  const totalPages = Math.ceil(notices.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = Array.isArray(notices)
    ? notices.slice(startIdx, startIdx + itemsPerPage)
    : [];

  return (
    <>
      <AdminNavbar />

      <div className={styles.container}>
        <div className={styles.writeBtnWrapper}>
          <button
            className={styles.writeBtn}
            onClick={() => navigate("/admin/post/notice/add")}
          >
            글쓰기
          </button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>No</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회수</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item.id}>
                {/* 최신순 번호: 전체 개수 - 현재 인덱스 */}
                <td>{notices.length - (startIdx + index)}</td>
                <td
                  className={styles.titleText}
                  onClick={() => navigate(`/admin/post/notice/detail/${item.id}`)}
                >
                  {item.title}
                </td>
                <td>{item.authorName}</td>
                <td>{item.createdDate}</td>
                <td>{item.viewCount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.pagination}>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              className={`${styles.pageBtn} ${
                currentPage === i + 1 ? styles.activePage : ""
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default PostNotice;
