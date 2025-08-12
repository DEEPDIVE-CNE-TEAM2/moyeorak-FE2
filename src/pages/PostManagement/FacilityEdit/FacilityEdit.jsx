import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./FacilityEdit.module.css";
import AdminNavbar from "../../../components/Navbar/Navbar";
import { getFacilityDetail, updateFacility } from "../../../Api";

const FacilityEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const data = await getFacilityDetail(id);
        setFacility(data);
      } catch (err) {
        setError("시설 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchFacility();
  }, [id]);

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

  const handleSave = async () => {
    if (!facility) return;
    try {
      const updatedData = {
        name: facility.name,
        address: facility.address,
        usageStartTime: facility.usageStartTime ?? facility.hours?.split("~")[0].trim() ?? "",
        usageEndTime: facility.usageEndTime ?? facility.hours?.split("~")[1]?.trim() ?? "",
        contact: facility.contact ?? facility.phone ?? "",
        capacity: Number(facility.capacity),
        description: facility.description,
        imageUrl: facility.imageUrl,
      };

      await updateFacility(id, updatedData);
      alert("수정되었습니다.");
      navigate(`/admin/facility/${id}`);
    } catch (err) {
      alert("수정 실패했습니다.");
    }
  };

  const handleCancel = () => {
    navigate(`/admin/facility/${id}`);
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;
  if (!facility) return <p>시설 정보를 불러올 수 없습니다.</p>;

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
              <th>운영 시작 시간</th>
              <td>
                <input
                  type="time"
                  name="usageStartTime"
                  value={facility.usageStartTime || ""}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>운영 종료 시간</th>
              <td>
                <input
                  type="time"
                  name="usageEndTime"
                  value={facility.usageEndTime || ""}
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
                  value={facility.contact || ""}
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
