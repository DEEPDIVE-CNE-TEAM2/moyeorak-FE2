import React, { useState, useEffect } from 'react';
import styles from './UserDetailModal.module.css';
import { IoMdClose } from 'react-icons/io';
import { FaCircle } from 'react-icons/fa';
import { fetchAdminUserDetail, updateAdminUser, getUserEnrollments } from '../../../Api';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const statusColorMap = {
  '수강중': '#77BF73',
  '취소': '#FF6969',
  '종료': '#9E9E9E',
};

const ITEMS_PER_PAGE = 8;

export default function UserDetailModal({ member, onClose, onSave }) {
  const [selectedTab, setSelectedTab] = useState("info");
  const [email, setEmail] = useState(member.email || "");
  const [phone, setPhone] = useState(member.phone || "");
  const [regionId, setRegionId] = useState(member.regionId || 0); 
  const [enrollments, setEnrollments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [enrollmentToCancel, setEnrollmentToCancel] = useState(null);

  useEffect(() => {
    const loadUserDetail = async () => {
      setLoading(true);
      try {
        const detailData = await fetchAdminUserDetail(member.id);
        setEmail(detailData.email || "");
        setPhone(detailData.phone || "");
        setRegionId(detailData.regionId || 0);
        setError(null);
      } catch (e) {
        setError("회원 상세 정보를 불러오는 데 실패했습니다.");
        console.error("회원 상세 정보 로딩 실패:", e);
      } finally {
        setLoading(false);
      }
    };
    if (member.id) loadUserDetail();
  }, [member.id]);

  useEffect(() => {
    const loadEnrollments = async () => {
      if (selectedTab === "enroll") {
        try {
          const data = await getUserEnrollments(member.id);
          const statusMap = {
            ENROLLED: '수강중',
            CANCELLED: '취소',
            COMPLETED: '종료'
          };
          const mapped = (data || []).map(item => ({
            ...item,
            status: statusMap[item.status] || item.status
          }));
          setEnrollments(mapped);
        } catch (err) {
          console.error("수강 내역 로딩 실패:", err);
          setEnrollments([]);
        }
      }
    };
    loadEnrollments();
  }, [selectedTab, member.id]);

  const handleSave = async () => {
    try {
      const updatedData = await updateAdminUser(member.id, {
        email,
        phone,
        regionId: Number(regionId),
      });

      onSave({
        ...member,
        ...updatedData,
      });

      alert("회원 정보 수정되었습니다.");
      onClose();
    } catch (err) {
      alert("회원 정보 수정에 실패했습니다.");
      console.error(err);
    }
  };


  const handleCancelEnrollment = (enrollmentId) => {
    setEnrollmentToCancel(enrollmentId);
    setShowConfirm(true);
  };

  const confirmCancel = async () => {
    try {
      const token = localStorage.getItem("accessToken")
        ? `Bearer ${localStorage.getItem("accessToken")}`
        : "";

      await axios.delete(`${BASE_URL}/api/admin/users/enrollments/${enrollmentToCancel}`, {
        headers: { Authorization: token },
      });

      setEnrollments(prev =>
        prev.map(e => e.enrollmentId === enrollmentToCancel ? { ...e, status: '취소', canCancel: false } : e)
      );

      alert("수강 취소되었습니다.");
    } catch (error) {
      console.error("수강 취소 실패:", error);
      alert("수강 취소 중 오류가 발생했습니다.");
    } finally {
      setShowConfirm(false);
      setEnrollmentToCancel(null);
    }
  };

  const totalPages = Math.ceil(enrollments.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = enrollments.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.loadingModal}>로딩 중...</div>
      </div>
    );
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <IoMdClose className={styles.closeIcon} onClick={onClose} />
        <h2 className={styles.title}>회원 정보 상세보기</h2>

        <div className={styles.tabContainer}>
          <button
            className={`${styles.tabButton} ${selectedTab === 'info' ? styles.active : ''}`}
            onClick={() => { setSelectedTab('info'); setCurrentPage(1); }}
          >
            회원 정보 관리
          </button>
          <button
            className={`${styles.tabButton} ${selectedTab === 'enroll' ? styles.active : ''}`}
            onClick={() => { setSelectedTab('enroll'); setCurrentPage(1); }}
          >
            수강신청 관리
          </button>
        </div>

        {selectedTab === 'info' && (
          <div className={styles.formSection}>
            <div className={styles.readonlyField}>
              <label>이름</label>
              <input type="text" value={member.name} readOnly />
            </div>
            <div className={styles.readonlyField}>
              <label>성별</label>
              <input type="text" value={member.gender} readOnly />
            </div>
            <div className={styles.readonlyField}>
              <label>가입일</label>
              <input type="text" value={member.joinDate} readOnly />
            </div>
            <div className={styles.editableField}>
              <label>이메일</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className={styles.editableField}>
              <label>연락처</label>
              <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <div className={styles.editableField}>
              <label>지역</label>
              <select value={regionId} onChange={e => setRegionId(e.target.value)}>
                <option value={1}>중구</option>
                <option value={2}>성동구</option>
                <option value={3}>송파구</option>
              </select>
            </div>
            <button className={styles.saveButton} onClick={handleSave}>저장</button>
          </div>
        )}

        {selectedTab === 'enroll' && (
          <div className={styles.formSection} style={{ padding: 0 }}>
            <table className={styles.enrollTable}>
              <thead>
                <tr>
                  <th>강좌명</th>
                  <th>신청일</th>
                  <th>지역</th>
                  <th>상태</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan={5} className={styles.noData}>신청 내역이 없습니다.</td>
                  </tr>
                ) : (
                  currentItems.map(e => (
                    <tr key={e.enrollmentId}>
                      <td>{e.programTitle}</td>
                      <td>{e.appliedDate}</td>
                      <td>{e.regionName}</td>
                      <td>
                        <div className={styles.statusWrapper}>
                          <FaCircle color={statusColorMap[e.status]} size={12} />
                          <span>{e.status}</span>
                        </div>
                      </td>
                      <td>
                        {e.canCancel && (
                          <button
                            className={styles.cancelButton}
                            onClick={() => handleCancelEnrollment(e.enrollmentId)}
                          >
                            수강취소
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {totalPages > 1 && (
              <div className={styles.pagination}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={currentPage === pageNum ? styles.activePage : ''}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {showConfirm && (
        <div className={styles.modalOverlay}>
          <div className={styles.confirmModal}>
            <p>수강 취소하시겠습니까?</p>
            <div className={styles.confirmButtons}>
              <button className={styles.confirmYes} onClick={confirmCancel}>예</button>
              <button className={styles.confirmNo} onClick={() => setShowConfirm(false)}>아니오</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
