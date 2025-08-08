import React, { useState } from "react";
import styles from "./PostNoticeAdd.module.css";
import AdminNavbar from "../../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { createNotice } from "../../../Api";

const PostNoticeAdd = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      await createNotice(title, content);
      alert("공지사항이 저장되었습니다.");
      navigate("/admin/post/notice");
    } catch (error) {
      alert("공지사항 저장 중 오류가 발생했습니다.");
    }
  };

  const handleCancel = () => {
    navigate("/admin/post/notice");
  };

  return (
    <>
      <AdminNavbar current="공지사항 추가" />
      <div className={styles.container}>
        <div className={styles.header}>
          <div></div>
          <div className={styles.buttonGroup}>
            <button className={styles.saveBtn} onClick={handleSave}>
              저장
            </button>
            <button className={styles.cancelBtn} onClick={handleCancel}>
              취소
            </button>
          </div>
        </div>

        <table className={styles.detailTable}>
          <tbody>
            <tr>
              <th>제목</th>
              <td>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={styles.textInput}
                />
              </td>
            </tr>
            <tr>
              <th>내용</th>
              <td>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className={styles.textareaInput}
                  rows={10}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PostNoticeAdd;
