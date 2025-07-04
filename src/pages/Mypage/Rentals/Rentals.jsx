import React, { useState } from 'react';
import '../Classes/Classes.css'; 
import Navbar from '../../../components/Navbar/Navbar';
import Search from '../../../img/search.svg';
import Down from '../../../img/down.svg';
import Popupmodal from './Popupmodal';

const Rentals = () => {
  const [sortOrder, setSortOrder] = useState('desc');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [expandedRowIndex, setExpandedRowIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const originalRows = [
    {
      facilityType: '수영장',
      location: '구름 수영장',
      period: '2025.05.20 - 2025.06.19',
      time: '12:00 - 13:00',
      applicant: '김구름',
      status: '사용중',
      applyDate: '2025.05.20',
      inOrOut: '관내',
    },
    {
      facilityType: '수영장',
      location: '구름 수영장',
      period: '2025.05.21 - 2025.06.19',
      time: '12:00 - 13:00',
      applicant: '김구름',
      status: '취소',
      applyDate: '2025.05.20',
    },
    {
      facilityType: '수영장',
      location: '구름 수영장',
      period: '2025.05.19 - 2025.06.19',
      time: '12:00 - 13:00',
      applicant: '김구름',
      status: '종료',
      applyDate: '2025.05.20',
    },
  ];

  const sortedRows = [...originalRows].sort((a, b) => {
    const aDate = new Date(a.period.split(' - ')[0]);
    const bDate = new Date(b.period.split(' - ')[0]);
    return sortOrder === 'desc' ? bDate - aDate : aDate - bDate;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case '사용중':
        return 'status-badge active';
      case '취소':
        return 'status-badge cancelled';
      case '종료':
        return 'status-badge ended';
      default:
        return 'status-badge';
    }
  };

  const toggleRow = (index) => {
    if (expandedRowIndex === index) {
      setExpandedRowIndex(null);
    } else {
      setExpandedRowIndex(index);
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
                <th>시설</th>
                <th>장소</th>
                <th>사용기간</th>
                <th>시간</th>
                <th>신청자</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {sortedRows.map((row, idx) => (
                <React.Fragment key={idx}>
                  <tr
                    className="clickable-row"
                    onClick={() => row.status === '사용중' && toggleRow(idx)}
                  >
                    <td align="center">{row.facilityType}</td>
                    <td align="center">{row.location}</td>
                    <td align="center">{row.period}</td>
                    <td align="center">{row.time}</td>
                    <td align="center">{row.applicant}</td>
                    <td align="center">
                      <div className={getStatusClass(row.status)}>{row.status}</div>
                    </td>
                  </tr>
                  {expandedRowIndex === idx && row.status === '사용중' && (
                    <tr className="detail-row">
                      <td align="center" className="mini-title">신청일</td>
                      <td align="center">{row.applyDate}</td>
                      <td align="center" className="mini-title">관내/관외 여부</td>
                      <td align="center">{row.inOrOut}</td>
                      <td colSpan="2" align="center">
                        <button
                          className="cancel-button"
                          onClick={() => {
                            setSelectedRowData(row);
                            setIsModalOpen(true);
                          }}
                        >
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

      {isModalOpen && (
        <Popupmodal
          data={selectedRowData}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedRowData(null);
          }}
        />
      )}
    </>
  );
};

export default Rentals;
