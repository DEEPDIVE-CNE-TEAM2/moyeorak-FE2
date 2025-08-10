import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ProgramDetail.module.css";
import AdminNavbar from "../../../components/Navbar/Navbar";
import { fetchAdminProgramDetail, deleteProgram } from "../../../Api";

const ProgramDetail = () => {
  const navigate = useNavigate();
  const { programId } = useParams();
  const [program, setProgram] = useState(null);

  useEffect(() => {
    const loadProgram = async () => {
      try {
        const data = await fetchAdminProgramDetail(programId);
        setProgram(data);
      } catch (e) {
        alert("프로그램 정보를 불러오는 데 실패했습니다.");
      }
    };
    loadProgram();
  }, [programId]);

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString("ko-KR") : "-";

  const handleEdit = () => {
    navigate(`/admin/program/${programId}/edit`);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("프로그램을 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      const res = await deleteProgram(programId);
      alert(res.message || "프로그램이 삭제되었습니다.");
      navigate("/admin/program/list");
    } catch (err) {
      console.error(err);
      alert("프로그램 삭제에 실패했습니다.");
    }
  };

  if (!program) return <div>로딩 중...</div>;

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
              <th>강의</th>
              <td>{program.title}</td>
              <th>대상</th>
              <td>{program.target}</td>
            </tr>
            <tr>
              <th>시설</th>
              <td>{program.facilityName}</td>
              <th>강사</th>
              <td>{program.instructorName}</td>
            </tr>
            <tr>
              <th>수강기간</th>
              <td colSpan="3">
                {formatDate(program.usageStartDate)} ~ {formatDate(program.usageEndDate)}
              </td>
            </tr>
            <tr>
              <th>접수기간</th>
              <td>
                {formatDate(program.registrationStartDate)} ~{" "}
                {formatDate(program.registrationEndDate)}
              </td>
              <th>취소기간</th>
              <td>{formatDate(program.cancelEndDate)}까지</td>
            </tr>
            <tr>
              <th>관내 요금</th>
              <td>{program.inPrice.toLocaleString()}원</td>
              <th>관외 요금</th>
              <td>{program.outPrice.toLocaleString()}원</td>
            </tr>
            <tr>
              <th>문의</th>
              <td>{program.contact}</td>
              <th>정원</th>
              <td>{program.capacity}명</td>
            </tr>
            <tr>
              <th>상세 설명</th>
              <td colSpan="3">{program.description}</td>
            </tr>
            <tr>
              <th>이미지</th>
              <td colSpan="3">
                {program.imageUrl ? (
                  <img
                    src={program.imageUrl}
                    alt={program.title}
                    style={{ maxWidth: "300px" }}
                  />
                ) : (
                  "이미지 없음"
                )}
              </td>
            </tr>
            <tr>
              <th>수업 시간</th>
              <td colSpan="3">
                {program.classStartTime} ~ {program.classEndTime}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProgramDetail;
