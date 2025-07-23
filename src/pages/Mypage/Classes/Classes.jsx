import React, { useState, useEffect } from 'react';
import './Classes.css';
import Navbar from '../../../components/Navbar/Navbar';
import Search from '../../../img/search.svg';
import Down from '../../../img/down.svg';
import { getMyEnrollments, getProgramDetail, cancelEnrollment } from '../../../Api';

const Classes = () => {
  const [sortOrder, setSortOrder] = useState('desc');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [expandedRowIndex, setExpandedRowIndex] = useState(null);
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const rawEnrollments = await getMyEnrollments();
      const userRegionId = JSON.parse(localStorage.getItem('userInfo'))?.regionId;

      const enriched = await Promise.all(
        rawEnrollments.map(async (e) => {
          const program = await getProgramDetail(e.programId);

          let statusText = '';
          switch (e.status) {
            case 'enrolled':
              statusText = '신청완료';
              break;
            case 'cancelled':
              statusText = '취소';
              break;
            case 'ended':
              statusText = '종료';
              break;
            default:
              statusText = e.status;
          }

          const inOrOut =
            userRegionId && program?.regionId
              ? userRegionId === program.regionId
                ? '관내'
                : '관외'
              : '-';


          return {
            id: e.id,
            title: program?.title || '제목 없음',
            period: program?.usagePeriod?.replace(/~/g, '~').trim() || '-',
            schedule: program?.classTime || '-',
            facility: program?.location || '-',
            instructor: program?.instructorName || '-',
            status: statusText,
            applyDate: e.enrolledAt?.split('T')[0].replace(/-/g, '.') || '-',
            price: e.paidAmount ? `${e.paidAmount.toLocaleString()}원` : '-',
            cancelAvailable: e.status === 'enrolled' ? '가능' : '불가',
            inOrOut: inOrOut,
          };
        })
      );

      setEnrollments(enriched);
    } catch (error) {
      console.error('수강신청 목록 불러오기 실패:', error);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case '신청완료':
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
    setExpandedRowIndex(index === expandedRowIndex ? null : index);
  };

  const handleCancel = async (row) => {
    const confirmMessage = `
강의: ${row.title}
기간: ${row.period}
요일/시간: ${row.schedule}
결제금액: ${row.price || '-'}
환불금액: ${row.refund || '-'}

수강 신청을 취소하시겠습니까?
    `.trim();

    const isConfirmed = window.confirm(confirmMessage);
    if (!isConfirmed) return;

    try {
      await cancelEnrollment(row.id);
      alert(`${row.title} 수강 신청이 취소되었습니다.`);
      fetchEnrollments(); // 갱신
    } catch (error) {
      alert('수강신청 취소 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

  const sortedRows = [...enrollments].sort((a, b) => {
    const aDate = new Date(a.period.split(' - ')[0]);
    const bDate = new Date(b.period.split(' - ')[0]);
    return sortOrder === 'desc' ? bDate - aDate : aDate - bDate;
  });

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
                <th>기간</th>
                <th>강의</th>
                <th>강의시간</th>
                <th>시설</th>
                <th>강사명</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {sortedRows.map((row, idx) => (
                <React.Fragment key={idx}>
                  <tr className="clickable-row" onClick={() => row.status === '신청완료' && toggleRow(idx)}>
                    <td align="center">{row.period}</td>
                    <td align="center">{row.title}</td>
                    <td align="center">{row.schedule}</td>
                    <td align="center">{row.facility}</td>
                    <td align="center">{row.instructor}</td>
                    <td align="center">
                      <div className={getStatusClass(row.status)}>{row.status}</div>
                    </td>
                  </tr>
                  {expandedRowIndex === idx && row.status === '신청완료' && (
                    <>
                      <tr className="detail-row">
                        <td align="center" className="mini-title">신청일</td>
                        <td align="center">{row.applyDate}</td>
                        <td align="center" className="mini-title">관내/관외 여부</td>
                        <td align="center">{row.inOrOut}</td>
                        <td rowSpan="2" colSpan="2" align="center">
                          <button
                            className="cancel-button"
                            onClick={() => handleCancel(row)}
                          >
                            수강취소
                          </button>
                        </td>
                      </tr>
                      <tr className="detail-row">
                        <td align="center" className="mini-title">결제금액</td>
                        <td align="center">{row.price}</td>
                        <td align="center" className="mini-title">취소 가능 여부</td>
                        <td align="center">{row.cancelAvailable}</td>
                      </tr>
                    </>
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

export default Classes;
