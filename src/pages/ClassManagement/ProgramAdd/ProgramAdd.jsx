import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProgramAdd.module.css";
import AdminNavbar from "../../../components/Navbar/Navbar";
import { createProgram } from "../../../Api"; // 경로 맞게 수정

const ProgramAdd = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    target: "",
    facilityId: "",
    instructorName: "",
    usageStartDate: "",
    usageEndDate: "",
    registrationStartDate: "",
    registrationEndDate: "",
    cancelEndDate: "",
    inPrice: "",
    outPrice: "",
    contact: "",
    capacity: "",
    description: "",
    imageUrl: "", // 대표 이미지 URL
    category: "",
    classStartTime: "",
    classEndTime: "",
    status: "OPEN",
    regionId: 1,
    images: [], // 이미지 URL 배열
  });

  const facilityOptions = [
    { id: 1, name: "송파체육문화회관" },
    { id: 2, name: "중구 문화센터" },
    { id: 3, name: "강남 스포츠센터" },
  ];
  const targetOptions = ["성인", "청소년", "어린이"];
  const statusOptions = ["OPEN", "CLOSED"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const parseTimeStringToObj = (timeStr) => {
    if (!timeStr) return { hour: 0, minute: 0, second: 0, nano: 0 };
    const parts = timeStr.split(":");
    return {
      hour: Number(parts[0]) || 0,
      minute: Number(parts[1]) || 0,
      second: Number(parts[2]) || 0,
      nano: 0,
    };
  };

  // 이미지 등록 버튼 클릭 시 파일 선택창 열기
  const handleAddImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 파일 선택 후 처리
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const url = URL.createObjectURL(file);

    setFormData((prev) => {
      const newImages = [...prev.images, url];
      return {
        ...prev,
        images: newImages,
        imageUrl: newImages.length > 0 ? newImages[0] : "",
      };
    });

    // 다시 같은 파일 선택 가능하도록 초기화
    e.target.value = null;
  };

  // 마지막 이미지 삭제
  const handleDeleteLastImage = () => {
    if (formData.images.length === 0) {
      alert("삭제할 이미지가 없습니다.");
      return;
    }
    setFormData((prev) => {
      const newImages = prev.images.slice(0, -1);
      return {
        ...prev,
        images: newImages,
        imageUrl: newImages.length > 0 ? newImages[0] : "",
      };
    });
  };

  const handleSave = async () => {
    try {
      const payload = {
        title: formData.title,
        target: formData.target,
        facilityId: Number(formData.facilityId),
        instructorName: formData.instructorName,
        usageStartDate: formData.usageStartDate,
        usageEndDate: formData.usageEndDate,
        registrationStartDate: formData.registrationStartDate,
        registrationEndDate: formData.registrationEndDate,
        cancelEndDate: formData.cancelEndDate,
        inPrice: Number(formData.inPrice),
        outPrice: Number(formData.outPrice),
        contact: formData.contact,
        capacity: Number(formData.capacity),
        description: formData.description,
        imageUrl: formData.images.length > 0 ? formData.images[0] : "",
        category: formData.category,
        classStartTime: parseTimeStringToObj(formData.classStartTime),
        classEndTime: parseTimeStringToObj(formData.classEndTime),
        status: formData.status,
        regionId: formData.regionId,
      };

      await createProgram(payload);
      alert("프로그램이 성공적으로 등록되었습니다.");
      navigate("/admin/program");
    } catch (error) {
      alert("프로그램 등록 중 오류가 발생했습니다.");
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigate("/admin/program");
  };

  return (
    <>
      <AdminNavbar current="프로그램 추가" />
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
              <th>강의</th>
              <td>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={styles.textInput}
                />
              </td>
              <th>대상</th>
              <td>
                <select
                  name="target"
                  value={formData.target}
                  onChange={handleChange}
                  className={styles.selectInput}
                >
                  <option value="">선택</option>
                  {targetOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </td>
            </tr>

            <tr>
              <th>시설</th>
              <td>
                <select
                  name="facilityId"
                  value={formData.facilityId}
                  onChange={handleChange}
                  className={styles.selectInput}
                >
                  <option value="">선택</option>
                  {facilityOptions.map((fac) => (
                    <option key={fac.id} value={fac.id}>
                      {fac.name}
                    </option>
                  ))}
                </select>
              </td>
              <th>강사</th>
              <td>
                <input
                  type="text"
                  name="instructorName"
                  value={formData.instructorName}
                  onChange={handleChange}
                  className={styles.textInput}
                />
              </td>
            </tr>

            <tr>
              <th>수강기간 시작</th>
              <td>
                <input
                  type="date"
                  name="usageStartDate"
                  value={formData.usageStartDate}
                  onChange={handleChange}
                  className={styles.textInput}
                />
              </td>
              <th>수강기간 종료</th>
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
              <th>접수기간 시작</th>
              <td>
                <input
                  type="date"
                  name="registrationStartDate"
                  value={formData.registrationStartDate}
                  onChange={handleChange}
                  className={styles.textInput}
                />
              </td>
              <th>접수기간 종료</th>
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
              <th>취소기간</th>
              <td>
                <input
                  type="date"
                  name="cancelEndDate"
                  value={formData.cancelEndDate}
                  onChange={handleChange}
                  className={styles.textInput}
                />
              </td>
              <th>수업 시작 시간</th>
              <td>
                <input
                  type="time"
                  name="classStartTime"
                  value={formData.classStartTime}
                  onChange={handleChange}
                  className={styles.textInput}
                />
              </td>
            </tr>

            <tr>
              <th>수업 종료 시간</th>
              <td>
                <input
                  type="time"
                  name="classEndTime"
                  value={formData.classEndTime}
                  onChange={handleChange}
                  className={styles.textInput}
                />
              </td>
              <th>상태</th>
              <td>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={styles.selectInput}
                >
                  {statusOptions.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
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
                  min="0"
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
                  min="0"
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
                  min="1"
                />
              </td>
            </tr>

            <tr>
              <th>상세 설명</th>
              <td colSpan="3">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={styles.textareaInput}
                  rows={4}
                />
              </td>
            </tr>

            {/* 이미지 등록/삭제 UI */}
            <tr>
              <th>이미지</th>
              <td colSpan="3">
                <div className={styles.imageContainer}>
                  {formData.images.length === 0 && <p>등록된 이미지가 없습니다.</p>}
                  {formData.images.map((url, idx) => (
                    <div key={idx} className={styles.imageRow}>
                      <img
                        src={url}
                        alt={`프로그램 이미지 ${idx + 1}`}
                        className={styles.programImage}
                      />
                      <span>{url}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.imageBtnGroup}>
                  {/* 파일 입력 숨김 */}
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />

                  <button
                    type="button"
                    className={styles.imageBtn}
                    onClick={handleAddImageClick}
                  >
                    등록
                  </button>
                  <button
                    type="button"
                    className={styles.imageBtn}
                    onClick={handleDeleteLastImage}
                  >
                    삭제
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProgramAdd;
