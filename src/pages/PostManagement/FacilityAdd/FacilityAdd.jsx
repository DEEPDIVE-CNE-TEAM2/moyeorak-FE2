import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FacilityAdd.module.css";
import AdminNavbar from "../../../components/Navbar/Navbar";
import { createFacility } from "../../../Api";

const FacilityAdd = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    location: "",
    area: "",
    usageStartTime: "",
    usageEndTime: "",
    contact: "",
    capacity: "",
    description: "",
    imageUrl: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // 입력값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
    setForm((prev) => ({ ...prev, imageUrl: "" }));
  };

  // 저장 버튼
  const handleSave = async () => {
    if (!imageFile) {
      alert("이미지를 업로드해주세요.");
      return;
    }

    try {
      const imageUrl = imagePreview;

      const facilityData = {
        ...form,
        area: Number(form.area),
        capacity: Number(form.capacity),
        imageUrl,
      };

      await createFacility(facilityData);

      alert("시설이 등록되었습니다.");
      navigate("/admin/post/facility");
    } catch (error) {
      console.error("시설 등록 실패:", error);
      alert("시설 등록에 실패했습니다.");
    }
  };

  const handleCancel = () => {
    navigate("/admin/post/facility");
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
              <th>시설</th>
              <td colSpan={3}>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <th>주소</th>
              <td colSpan={3}>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <th>면적</th>
              <td colSpan={3}>
                <input
                  type="number"
                  name="area"
                  value={form.area}
                  onChange={handleChange}
                  min="0"
                />
              </td>
            </tr>
            <tr>
              <th>운영 시작 시간</th>
              <td>
                <input
                  type="time"
                  name="usageStartTime"
                  value={form.usageStartTime}
                  onChange={handleChange}
                />
              </td>
              <th>운영 종료 시간</th>
              <td>
                <input
                  type="time"
                  name="usageEndTime"
                  value={form.usageEndTime}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>문의</th>
              <td>
                <input
                  type="text"
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                />
              </td>
              <th>수용 인원</th>
              <td>
                <input
                  type="number"
                  name="capacity"
                  value={form.capacity}
                  onChange={handleChange}
                  min="0"
                />
              </td>
            </tr>
            <tr>
              <th>상세 설명</th>
              <td colSpan={3}>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                />
              </td>
            </tr>
            <tr>
              <th>이미지</th>
              <td colSpan={3}>
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      alt="시설 이미지"
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
