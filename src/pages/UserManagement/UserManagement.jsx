import React, { useState, useEffect } from "react";
import styles from "./UserManagement.module.css";
import AdminNavbar from "../../components/Navbar/Navbar";
import AddUser from "./AddUser/AddUser";
import UserDetailModal from "./UserDetailModal/UserDetailModal";
import { fetchAdminUsers, fetchAdminUserDetail } from "../../Api";

const ITEMS_PER_PAGE = 10;

const formatDate = (dateString) => {
  if (!dateString) return "-";
  return dateString.slice(0, 10);
};

export default function UserManagement() {
  const [members, setMembers] = useState([]);
  const [regionFilter, setRegionFilter] = useState("");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredMembers, setFilteredMembers] = useState([]);

  const [showAddUser, setShowAddUser] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const data = await fetchAdminUsers();
        console.log("회원 목록 API 응답:", data);

        const transformed = data.map((user) => ({
          id: user.id,
          name: user.name,
          gender: user.gender,
          email: user.email,
          address: user.region || "-",
          joinDate: formatDate(user.createdAt),
          regionId: user.regionId || 0,
        }));
        setMembers(transformed);
      } catch (e) {
        alert("회원 정보를 불러오는 데 실패했습니다.");
      }
    };

    loadMembers();
  }, []);

  // 필터링 로직
  useEffect(() => {
    let filtered = members;
    if (regionFilter) filtered = filtered.filter((m) => m.address === regionFilter);
    if (searchText.trim()) {
      filtered = filtered.filter(
        (m) =>
          (m.name || "").includes(searchText) ||
          (m.gender || "").includes(searchText) ||
          (m.email || "").includes(searchText) ||
          (m.address || "").includes(searchText) ||
          (m.joinDate || "").includes(searchText)
      );
    }
    setFilteredMembers(filtered);
    setCurrentPage(1);
  }, [regionFilter, searchText, members]);

  const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentMembers = filteredMembers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleAddUser = (newUser) => {
    setMembers((prev) => [
      ...prev,
      { id: prev.length ? Math.max(...prev.map((m) => m.id)) + 1 : 1, ...newUser },
    ]);
    setShowAddUser(false);
  };

  const handleUpdateUser = (updatedUser) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === updatedUser.id ? updatedUser : m))
    );
    setSelectedMember(null);
  };

  const handleMemberClick = async (member) => {
    try {
      const detail = await fetchAdminUserDetail(member.id);
      setSelectedMember({
        ...member,
        ...detail,
        joinDate: formatDate(detail.createdAt),
      });
    } catch (error) {
      alert("회원 상세 정보를 불러오는 데 실패했습니다.");
      console.error(error);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className={styles.container}>
        <div className={styles.filterRow}>
          <select
            className={styles.select}
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
          >
            <option value="">지역 선택</option>
            <option value="중구">중구</option>
            <option value="성동구">성동구</option>
            <option value="송파구">송파구</option>
          </select>

          <input
            type="text"
            placeholder="검색"
            className={styles.searchInput}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <button className={styles.newUserBtn} onClick={() => setShowAddUser(true)}>
            신규등록
          </button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>이름</th>
              <th>성별</th>
              <th>이메일</th>
              <th>주소</th>
              <th>가입일</th>
            </tr>
          </thead>
          <tbody>
            {currentMembers.length > 0 ? (
              currentMembers.map((m) => (
                <tr key={m.id}>
                  <td>{m.id}</td>
                  <td
                    className={styles.nameText}
                    onClick={() => handleMemberClick(m)}
                    style={{ cursor: "pointer" }}
                  >
                    {m.name}
                  </td>
                  <td>{m.gender}</td>
                  <td>{m.email}</td>
                  <td>{m.address || "-"}</td>
                  <td>{m.joinDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className={styles.noData}>
                  회원 정보가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className={styles.pagination}>
          {[...Array(totalPages)].map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                className={`${styles.pageBtn} ${
                  pageNum === currentPage ? styles.activePage : ""
                }`}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            );
          })}
        </div>
      </div>

      {showAddUser && (
        <AddUser onCancel={() => setShowAddUser(false)} onSave={handleAddUser} />
      )}

      {selectedMember && (
        <UserDetailModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
          onSave={handleUpdateUser}
        />
      )}
    </>
  );
}
