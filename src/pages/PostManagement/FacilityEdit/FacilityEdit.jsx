import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./FacilityEdit.module.css";
import AdminNavbar from "../../../components/Navbar/Navbar";

const dummyFacility = {
  id: 1,
  name: "중구 체육관",
  address: "서울특별시 중구 예시로 123",
  hours: "09:00 ~ 22:00",
  phone: "02-1234-5678",
  capacity: 150,
  description:
    "중구에 위치한 대형 체육관입니다. 농구, 배드민턴 등 다양한 종목 이용 가능하며 최신 시설 완비.",
  imageUrl: "https://via.placeholder.com/600x400?text=시설+이미지",
};

const FacilityEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // 실제 API 연동 시 id로 데이터 받아오기, 여기선 dummyFacility 사용
  const [facility, setFacility] = useState(dummyFacility);

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

    // 이미지 미리보기용 URL 생성
    const imageUrl = URL.createObjectURL(file);
    setFacility((prev) => ({ ...prev, imageUrl }));
  };

  const handleSave = () => {
    // 실제 저장 로직 API 호출 등 구현 필요
    alert("저장되었습니다.");
    navigate(`/admin/facility/${id}`);
  };

  const handleCancel = () => {
    navigate(`/admin/facility/${id}`);
  };

  return (
    <>
      <AdminNavbar />

      <div className={styles.container}>
        <div className={styles.header}>
          <div></div> {/* 왼쪽 빈 공간 */}
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

export default FacilityEdit;
