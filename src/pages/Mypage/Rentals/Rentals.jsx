import React, { useState, useEffect } from 'react';
import '../Classes/Classes.css'; 
import Navbar from '../../../components/Navbar/Navbar';
import Search from '../../../img/search.svg';
import Down from '../../../img/down.svg';
import { getMyRentalApplications, cancelRentalApplication } from '../../../Api';

const Rentals = () => {
  const [sortOrder, setSortOrder] = useState('desc');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [expandedRowIndex, setExpandedRowIndex] = useState(null);
  const [rentalRows, setRentalRows] = useState([]);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const data = await getMyRentalApplications();
        setRentalRows(data);
      } catch (error) {
        console.error("내 대관 신청 목록 조회 실패:", error);
      }
    };
    fetchRentals();
  }, []);

  const getStatusClass = (statusLabel) => {
    switch (statusLabel) {
      case '사용중':
        return 'status-badge active';
      case '취소':
        return 'status-badge cancelled';
      case '종료':
        return 'status-badge ended';
      case '대기':
        return 'status-badge pending';
      default:
        return 'status-badge';
    }
  };

  const sortedRows = [...rentalRows].sort((a, b) => {
    const aDate = new Date(a.requestedDate);
    const bDate = new Date(b.requestedDate);
    return sortOrder === 'desc' ? bDate - aDate : aDate - bDate;
  });

  const toggleRow = (index) => {
    if (expandedRowIndex === index) {
      setExpandedRowIndex(null);
    } else {
      setExpandedRowIndex(index);
    }
  };

const handleCancel = async (row) => {
  const confirmMsg = `
장소: ${row.location}
사용일: ${row.requestedDate}
시간: ${row.requestedTime}

대관 신청을 취소하시겠습니까?
  `.trim();

  if (window.confirm(confirmMsg)) {
    try {
      await cancelRentalApplication(row.id);
      alert(`${row.location} 대관 신청이 취소되었습니다.`);

      // 상태만 직접 수정
      setRentalRows((prevRows) =>
        prevRows.map((r) =>
          r.id === row.id ? { ...r, statusLabel: '취소' } : r
        )
      );

      setExpandedRowIndex(null);
    } catch (error) {
      console.error("대관 신청 취소 실패:", error);
      alert("대관 신청 취소 중 오류가 발생했습니다.");
    }
  }
};


  return (
    <>
      <Navbar />
      <div className="classes-wrapper">
        <div className="classes-inner">
          <div className="sort-bar">
            <button
              className="sort-dropdown"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <img src={Search} alt="search" />
              <span>{sortOrder === 'desc' ? '최근날짜순' : '오래된날짜순'}</span>
              <img src={Down} alt="arrow" />
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-item" onClick={() => { setSortOrder('desc'); setDropdownOpen(false); }}>최근날짜순</div>
                <div className="dropdown-item" onClick={() => { setSortOrder('asc'); setDropdownOpen(false); }}>오래된날짜순</div>
              </div>
            )}
          </div>

          <table className="classes-table">
            <thead>
              <tr>
                <th>장소</th>
                <th>주소</th>
                <th>사용일</th>
                <th>시간</th>
                <th>신청인원</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {sortedRows.length === 0 && (
                <tr>
                  <td colSpan="6" align="center">신청한 대관 내역이 없습니다.</td>
                </tr>
              )}
              {sortedRows.map((row, idx) => (
                <React.Fragment key={row.id}>
                  <tr
                    className="clickable-row"
                    onClick={() => row.statusLabel === '대기' && toggleRow(idx)}
                  >
                    <td align="center">{row.location}</td>
                    <td align="center">{row.address}</td>
                    <td align="center">{row.requestedDate}</td>
                    <td align="center">{row.requestedTime}</td>
                    <td align="center">{row.peopleCount}명</td>
                    <td align="center">
                      <div className={getStatusClass(row.statusLabel)}>{row.statusLabel}</div>
                    </td>
                  </tr>
                  {expandedRowIndex === idx && (
                    <tr className="detail-row">
                      <td colSpan="6" align="center">
                        <button className="cancel-button" onClick={() => handleCancel(row)}>
                          대관취소
                        </button>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Rentals;
