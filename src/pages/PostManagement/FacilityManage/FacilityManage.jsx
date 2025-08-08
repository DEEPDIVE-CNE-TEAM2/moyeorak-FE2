import React, { useState } from "react";
import styles from "./FacilityManage.module.css";
import AdminNavbar from "../../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const dummyFacilities = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  name: `시설명 ${i + 1}`,
  address: `서울시 중구 예시로 ${i + 1}길`,
  phone: `02-1234-56${String(i).padStart(2, "0")}`,
  capacity: Math.floor(Math.random() * 100) + 20,
}));

const FacilityManage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const totalPages = Math.ceil(dummyFacilities.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = dummyFacilities.slice(startIdx, startIdx + itemsPerPage);

  const handleRowClick = (id) => {
    setSelectedId(id);
  };

  const handleWriteClick = () => {
    navigate("/admin/facility/add"); // 글쓰기 페이지 경로 예시
  };

  return (
    <>
      <AdminNavbar />
      <div className={styles.container}>
        <div className={styles.writeBtnWrapper}>
          <button className={styles.writeBtn} onClick={handleWriteClick}>
            글쓰기
          </button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>No</th>
              <th>시설</th>
              <th>주소</th>
              <th>문의</th>
              <th>수용인원</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((facility) => (
              <tr
                key={facility.id}
                className={selectedId === facility.id ? styles.selectedRow : ""}
                onClick={() => handleRowClick(facility.id)}
              >
                <td>{facility.id}</td>
                <td
                  className={styles.facilityName}
                  onClick={(e) => {
                    e.stopPropagation(); // 트리거가 부모 <tr> 클릭 핸들러로 전파되지 않도록 방지
                    navigate(`/admin/facility/${facility.id}`);
                  }}
                >
                  {facility.name}
                </td>
                <td>{facility.address}</td>
                <td>{facility.phone}</td>
                <td>{facility.capacity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.pagination}>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              className={`${styles.pageBtn} ${
                currentPage === i + 1 ? styles.activePage : ""
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default FacilityManage;
