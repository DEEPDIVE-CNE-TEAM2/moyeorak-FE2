import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ProgramEdit.module.css";
import AdminNavbar from "../../../components/Navbar/Navbar";
import { getAccessToken, getRefreshToken, fetchAdminProgramDetail, updateAdminProgram } from "../../../Api";

const ProgramEdit = () => {
  const navigate = useNavigate();
  const { programId } = useParams();

  // 시간 객체를 "HH:mm" 문자열로 변환하는 함수 (input[type="time"]용)
  const timeObjToString = (time) => {
    const h = time?.hour ?? 0;
    const m = time?.minute ?? 0;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  };

  // "HH:mm" 문자열을 시간 객체로 변환하는 함수
  const stringToTimeObj = (str) => {
    const [hourStr, minuteStr] = str.split(":");
    return {
      hour: Number(hourStr),
      minute: Number(minuteStr),
      second: 0,
      nano: 0,
    };
  };

  // 시간 객체를 "HH:mm:ss" 문자열로 변환하는 함수 (서버 전송용)
  const timeObjToServerString = (time) => {
    const h = time?.hour ?? 0;
    const m = time?.minute ?? 0;
    const s = time?.second ?? 0;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const [formData, setFormData] = useState({
    title: "",
    facilityId: "",
    category: "",
    target: "",
    instructorName: "",
    status: "",
    usageStartDate: "",
    usageEndDate: "",
    classStartTime: { hour: 0, minute: 0, second: 0, nano: 0 },
    classEndTime: { hour: 0, minute: 0, second: 0, nano: 0 },
    registrationStartDate: "",
    registrationEndDate: "",
    cancelEndDate: "",
    inPrice: 0,
    outPrice: 0,
    capacity: 0,
    contact: "",
    imageUrl: "",
    description: "",
  });

  useEffect(() => {
    fetchAdminProgramDetail(programId)
      .then((data) => {
        if (typeof data.facilityId === "number") {
          data.facilityId = String(data.facilityId);
        }

        setFormData({
          ...data,
          classStartTime: data.classStartTime || { hour: 0, minute: 0, second: 0, nano: 0 },
          classEndTime: data.classEndTime || { hour: 0, minute: 0, second: 0, nano: 0 },
        });
      })
      .catch(() => alert("프로그램 정보를 불러오는데 실패했습니다."));
  }, [programId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["capacity", "inPrice", "outPrice"].includes(name)) {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTimeChange = (e, field) => {
    const timeString = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: stringToTimeObj(timeString),
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, imageUrl }));
    }
  };

  const handleImageDelete = () => {
    setFormData((prev) => ({ ...prev, imageUrl: "" }));
  };

  const handleSave = async () => {
    const classStartTimeObj = typeof formData.classStartTime === "string"
      ? stringToTimeObj(formData.classStartTime)
      : formData.classStartTime;

    const classEndTimeObj = typeof formData.classEndTime === "string"
      ? stringToTimeObj(formData.classEndTime)
      : formData.classEndTime;

    const payload = {
      title: formData.title,
      facilityId: Number(formData.facilityId),
      category: formData.category,
      target: formData.target,
      instructorName: formData.instructorName,
      status: formData.status,
      usageStartDate: formData.usageStartDate,
      usageEndDate: formData.usageEndDate,
      classStartTime: timeObjToServerString(classStartTimeObj),
      classEndTime: timeObjToServerString(classEndTimeObj),
      registrationStartDate: formData.registrationStartDate,
      registrationEndDate: formData.registrationEndDate,
      cancelEndDate: formData.cancelEndDate,
      inPrice: formData.inPrice,
      outPrice: formData.outPrice,
      capacity: formData.capacity,
      contact: formData.contact,
      imageUrl: formData.imageUrl,
      description: formData.description,
    };

    try {
      await updateAdminProgram(programId, payload);
      alert("프로그램이 수정되었습니다.");
      navigate(`/admin/program/${programId}`);
    } catch (error) {
      alert("프로그램 수정에 실패했습니다.");
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigate(`/admin/program/${programId}`);
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
              <th>강의명</th>
              <td colSpan={3}>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={styles.textInput}
                />
              </td>
            </tr>

            <tr>
              <th>강의 대상</th>
              <td>
                <input
                  type="text"
                  name="target"
                  value={formData.target}
                  onChange={handleChange}
                  className={styles.textInput}
                />
              </td>
              <th>시설</th>
              <td>
                <input
                  type="text"
                  name="facilityId"
                  value={formData.facilityId}
                  onChange={handleChange}
                  className={styles.textInput}
                />
              </td>
            </tr>

            <tr>
              <th>강사명</th>
              <td>
                <input
                  type="text"
                  name="instructorName"
                  value={formData.instructorName}
                  onChange={handleChange}
                  className={styles.textInput}
                />
              </td>
              <th>분류</th>
              <td>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={styles.textInput}
                />
              </td>
            </tr>

            <tr>
              <th>이용 시작일</th>
              <td>
                <input
                  type="date"
                  name="usageStartDate"
                  value={formData.usageStartDate}
                  onChange={handleChange}
                  className={styles.textInput}
                />
              </td>
              <th>이용 종료일</th>
              <td>
                <input
                  type="date"
                  name="usageEndDate"
                  value={formData.usageEndDate}
                  onChange={handleChange}
                  className={styles.textInput}
                />
              </td>
            </tr>

            <tr>
              <th>접수 시작일</th>
              <td>
                <input
                  type="date"
                  name="registrationStartDate"
                  value={formData.registrationStartDate}
                  onChange={handleChange}
                  className={styles.textInput}
                />
              </td>
              <th>접수 종료일</th>
              <td>
                <input
                  type="date"
                  name="registrationEndDate"
                  value={formData.registrationEndDate}
                  onChange={handleChange}
                  className={styles.textInput}
                />
              </td>
            </tr>

            <tr>
              <th>수업 시작 시간</th>
              <td>
                <input
                  type="time"
                  name="classStartTime"
                  value={timeObjToString(formData.classStartTime)}
                  onChange={(e) => handleTimeChange(e, "classStartTime")}
                  className={styles.textInput}
                />
              </td>
              <th>수업 종료 시간</th>
              <td>
                <input
                  type="time"
                  name="classEndTime"
                  value={timeObjToString(formData.classEndTime)}
                  onChange={(e) => handleTimeChange(e, "classEndTime")}
                  className={styles.textInput}
                />
              </td>
            </tr>

            <tr>
              <th>취소기간</th>
              <td colSpan={3}>
                <input
                  type="date"
                  name="cancelEndDate"
                  value={formData.cancelEndDate}
                  onChange={handleChange}
                  className={styles.textInput}
                />
              </td>
            </tr>

            <tr>
              <th>관내 요금</th>
              <td>
                <input
                  type="number"
                  name="inPrice"
                  value={formData.inPrice}
                  onChange={handleChange}
                  className={styles.textInput}
                />
              </td>
              <th>관외 요금</th>
              <td>
                <input
                  type="number"
                  name="outPrice"
                  value={formData.outPrice}
                  onChange={handleChange}
                  className={styles.textInput}
                />
              </td>
            </tr>

            <tr>
              <th>문의</th>
              <td>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className={styles.textInput}
                />
              </td>
              <th>정원</th>
              <td>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  className={styles.textInput}
                  min={0}
                />
              </td>
            </tr>

            <tr>
              <th>상세설명</th>
              <td colSpan={3}>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={styles.textareaInput}
                  rows={4}
                />
              </td>
            </tr>

            <tr>
              <th>이미지</th>
              <td colSpan={3}>
                {formData.imageUrl && (
                  <div style={{ marginBottom: "10px" }}>
                    <img
                      src={formData.imageUrl}
                      alt="미리보기"
                      style={{ maxWidth: "300px", display: "block", marginBottom: "10px" }}
                    />
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                <button type="button" onClick={handleImageDelete} className={styles.deleteBtn}>
                  삭제
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProgramEdit;
