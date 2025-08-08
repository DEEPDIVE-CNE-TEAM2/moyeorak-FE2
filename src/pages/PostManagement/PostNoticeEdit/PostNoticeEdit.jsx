import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../../../components/Navbar/Navbar";
import styles from "./PostNoticeEdit.module.css";
import { getNoticeDetail, updateNotice } from "../../../Api";

export default function PostNoticeEdit() {
  const navigate = useNavigate();
  const { noticeId } = useParams();

  const [notice, setNotice] = useState({
    title: "",
    content: "",
    authorName: "",
    viewCount: 0,
    createdAt: "",
  });

  // 데이터 불러오기
  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const data = await getNoticeDetail(noticeId);
        setNotice({
          title: data.title,
          content: data.content,
          authorName: data.authorName,
          viewCount: data.viewCount,
          createdAt: new Date(data.createdAt).toLocaleDateString(),
        });
      } catch (error) {
        alert("공지사항 데이터를 불러오는데 실패했습니다.");
        navigate("/admin/post/notice");
      }
    };
    fetchNotice();
  }, [noticeId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateNotice(noticeId, {
        title: notice.title,
        content: notice.content,
      });
      alert("공지사항이 성공적으로 수정되었습니다.");
      navigate("/admin/post/notice");
    } catch (error) {
      alert("공지사항 수정에 실패했습니다.");
    }
  };

  const handleCancel = () => {
    navigate("/admin/post/notice");
  };

  return (
    <>
      <AdminNavbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <div></div>
          <div className={styles.buttonGroup}>
            <button className={styles.saveBtn} onClick={handleSave}>저장</button>
            <button className={styles.cancelBtn} onClick={handleCancel}>취소</button>
          </div>
        </div>

        <table className={styles.detailTable}>
          <tbody>
            <tr>
              <th>제목</th>
              <td colSpan={3}>
                <input
                  type="text"
                  name="title"
                  value={notice.title}
                  onChange={handleChange}
                  className={styles.textInput}
                />
              </td>
            </tr>
            <tr>
              <th>작성자</th>
              <td>{notice.authorName}</td>
              <th>조회수</th>
              <td>{notice.viewCount}</td>
            </tr>
            <tr>
              <th>작성날짜</th>
              <td colSpan={3}>{notice.createdAt}</td>
            </tr>
            <tr>
              <th>상세 설명</th>
              <td colSpan={3}>
                <textarea
                  name="content"
                  value={notice.content}
                  onChange={handleChange}
                  className={styles.textareaInput}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
