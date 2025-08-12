import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./FacilityDetail.module.css";
import AdminNavbar from "../../../components/Navbar/Navbar";
import { getFacilityDetail, deleteFacility } from "../../../Api"; // deleteFacility 추가 import

const FacilityDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

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

  const handleEdit = () => {
    navigate(`/admin/facility/${id}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        setDeleting(true);
        await deleteFacility(id);
        alert("삭제되었습니다.");
        navigate("/admin/post/facility");
      } catch (err) {
        alert("삭제에 실패했습니다.");
        navigate("/admin/post/facility");
      } finally {
        setDeleting(false);
      }
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;
  if (!facility) return <p>시설 정보가 없습니다.</p>;

  return (
    <>
      <AdminNavbar />

      <div className={styles.container}>
        <div className={styles.header}>
          <div></div>
          <div className={styles.buttonGroup}>
            <button className={styles.editBtn} onClick={handleEdit} disabled={deleting}>
              수정
            </button>
            <button className={styles.deleteBtn} onClick={handleDelete} disabled={deleting}>
              {deleting ? "삭제 중..." : "삭제"}
            </button>
          </div>
        </div>

        <table className={styles.detailTable}>
          <tbody>
            <tr>
              <th>시설</th>
              <td>{facility.name}</td>
            </tr>
            <tr>
              <th>주소</th>
              <td>{facility.address}</td>
            </tr>
            <tr>
              <th>운영시간</th>
              <td>
                {facility.usageStartTime} ~ {facility.usageEndTime}
              </td>
            </tr>
            <tr>
              <th>문의</th>
              <td>{facility.contact}</td>
            </tr>
            <tr>
              <th>수용인원</th>
              <td>{facility.capacity}명</td>
            </tr>
            <tr>
              <th>상세 설명</th>
              <td>{facility.description}</td>
            </tr>
            <tr>
              <th>이미지</th>
              <td>
                <img
                  src={facility.imageUrl}
                  alt={`${facility.name} 이미지`}
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
