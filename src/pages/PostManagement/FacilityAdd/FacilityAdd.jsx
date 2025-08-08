import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FacilityAdd.module.css";
import AdminNavbar from "../../../components/Navbar/Navbar";

const FacilityAdd = ({ addFacility }) => {
  const navigate = useNavigate();

  const [facility, setFacility] = useState({
    name: "",
    address: "",
    hours: "",
    phone: "",
    capacity: "",
    description: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFacility((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageDelete = () => {
    setFacility((prev) => ({ ...prev, imageUrl: "" }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setFacility((prev) => ({ ...prev, imageUrl }));
  };

  const handleSave = () => {
    if (!facility.name.trim()) {
      alert("시설명을 입력해주세요.");
      return;
    }
    // 실제 API 저장 시 addFacility 함수 대체

    alert("저장되었습니다.");
    navigate("/admin/facility");
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
              <th>시설</th>
              <td>
                <input
                  type="text"
                  name="name"
                  value={facility.name}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>주소</th>
              <td>
                <input
                  type="text"
                  name="address"
                  value={facility.address}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>운영시간</th>
              <td>
                <input
                  type="text"
                  name="hours"
                  value={facility.hours}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>문의</th>
              <td>
                <input
                  type="text"
                  name="phone"
                  value={facility.phone}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>수용인원</th>
              <td>
                <input
                  type="number"
                  name="capacity"
                  value={facility.capacity}
                  onChange={handleChange}
                  min="0"
                />
              </td>
            </tr>
            <tr>
              <th>상세 설명</th>
              <td>
                <textarea
                  name="description"
                  value={facility.description}
                  onChange={handleChange}
                  rows={4}
                />
              </td>
            </tr>
            <tr>
              <th>이미지</th>
              <td>
                {facility.imageUrl ? (
                  <>
                    <img
                      src={facility.imageUrl}
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
