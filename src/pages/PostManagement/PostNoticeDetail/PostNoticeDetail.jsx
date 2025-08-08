import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";  // useParams 추가
import AdminNavbar from "../../../components/Navbar/Navbar";
import styles from "./PostNoticeDetail.module.css";
import { getNoticeDetail } from "../../../Api"; // api 함수 import

export default function PostNoticeDetail() {
  const { noticeId } = useParams();  // url 파라미터에서 noticeId 받기
  const [notice, setNotice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotice = async () => {
      const data = await getNoticeDetail(noticeId);
      if (data) {
        setNotice({
          id: data.id,
          title: data.title,
          author: data.authorName,
          views: data.viewCount,
          date: data.createdAt ? data.createdAt.slice(0, 10) : "", // ISO → YYYY-MM-DD
          description: data.content,
        });
      }
    };
    fetchNotice();
  }, [noticeId]);

  const handleEdit = () => {
    if (notice) {
      navigate(`/admin/post/notice/edit/${notice.id}`);
    }
  };

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      alert("삭제 기능 구현 예정");
    }
  };

  if (!notice) return <div>공지사항을 불러오는 중입니다...</div>;

  return (
    <>
      <AdminNavbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <div></div>
          <div className={styles.buttonGroup}>
            <button className={styles.editBtn} onClick={handleEdit}>
              수정
            </button>
            <button className={styles.deleteBtn} onClick={handleDelete}>
              삭제
            </button>
          </div>
        </div>

        <table className={styles.detailTable}>
          <tbody>
            <tr>
              <th>제목</th>
              <td colSpan={3}>{notice.title}</td>
            </tr>
            <tr>
              <th>작성자</th>
              <td>{notice.author}</td>
              <th>조회수</th>
              <td>{notice.views}</td>
            </tr>
            <tr>
              <th>작성날짜</th>
              <td colSpan={3}>{notice.date}</td>
            </tr>
            <tr>
              <th>상세 설명</th>
              <td colSpan={3} className={styles.descriptionCell}>
                {notice.description}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
