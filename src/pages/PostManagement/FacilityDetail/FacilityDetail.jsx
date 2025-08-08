import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./FacilityDetail.module.css";
import AdminNavbar from "../../../components/Navbar/Navbar";

// 더미 데이터 (실제 API 연동 시 수정)
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

const FacilityDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // 실제 API로 id에 맞는 시설 정보 불러오기 구현 예정
  // 지금은 dummyFacility 사용

  const handleEdit = () => {
    navigate(`/admin/facility/${id}/edit`);
  };

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      // 삭제 처리 구현 예정
      alert("삭제 처리 완료 (더미)");
      navigate("/admin/facility");
    }
  };

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
              <th>시설</th>
              <td>{dummyFacility.name}</td>
            </tr>
            <tr>
              <th>주소</th>
              <td>{dummyFacility.address}</td>
            </tr>
            <tr>
              <th>운영시간</th>
              <td>{dummyFacility.hours}</td>
            </tr>
            <tr>
              <th>문의</th>
              <td>{dummyFacility.phone}</td>
            </tr>
            <tr>
              <th>수용인원</th>
              <td>{dummyFacility.capacity}명</td>
            </tr>
            <tr>
              <th>상세 설명</th>
              <td>{dummyFacility.description}</td>
            </tr>
            <tr>
              <th>이미지</th>
              <td>
                <img
                  src={dummyFacility.imageUrl}
                  alt={`${dummyFacility.name} 이미지`}
                  className={styles.facilityImage}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FacilityDetail;
