import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FacilityAdd.module.css";
import AdminNavbar from "../../../components/Navbar/Navbar";

const FacilityAdd = () => {
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // 이미지 업로드
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // 이미지 삭제
  const handleImageDelete = () => {
    setImageFile(null);
    setImagePreview("");
  };

  // 저장 버튼 클릭
  const handleSave = async () => {
    if (!imageFile) {
      alert("이미지를 업로드해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    // 요청 값 콘솔에 출력
    console.log("📢 홍보물 생성 요청(FormData):", formData.get("image"));

    try {
      // 실제 API 호출 예시
      /*
      const response = await axios.post(
        "https://api.moyeorak.cloud/api/admin/main-img",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // 토큰 필요 시 추가
          },
        }
      );
      console.log("서버 응답:", response.data);
      */

      alert("저장되었습니다.");
      navigate("/admin/facility");
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      alert("업로드에 실패했습니다.");
    }
  };

  const handleCancel = () => {
    navigate("/admin/facility");
  };

  return (
    <>
      <AdminNavbar />

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
              <th>이미지</th>
              <td>
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      alt="홍보물 이미지"
                      className={styles.facilityImage}
                    />
                    <div className={styles.imageBtnGroup}>
                      <button
                        className={styles.imageBtn}
                        onClick={handleImageDelete}
                        type="button"
                      >
                        삭제
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      id="imageUpload"
                      style={{ display: "none" }}
                    />
                    <label
                      htmlFor="imageUpload"
                      className={styles.imageBtn}
                      style={{ display: "inline-block" }}
                    >
                      등록
                    </label>
                  </>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FacilityAdd;
