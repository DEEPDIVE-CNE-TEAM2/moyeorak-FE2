import React, { useState, useEffect } from "react";
import styles from "./FacilityManage.module.css";
import AdminNavbar from "../../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { fetchFacilities } from "../../../Api";

const FacilityManage = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const getFacilities = async () => {
      try {
        setLoading(true);
        const data = await fetchFacilities();
        setFacilities(data);
      } catch (err) {
        setError("시설 목록을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    getFacilities();
  }, []);

  const totalPages = Math.ceil(facilities.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = facilities.slice(startIdx, startIdx + itemsPerPage);

  const handleRowClick = (id) => {
    setSelectedId(id);
  };

  const handleWriteClick = () => {
    navigate("/admin/facility/add");
  };

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>{error}</div>;

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
                    e.stopPropagation();
                    navigate(`/admin/facility/${facility.id}`);
                  }}
                >
                  {facility.name}
                </td>
                <td>{facility.address}</td>
                <td>{facility.contact}</td>
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
