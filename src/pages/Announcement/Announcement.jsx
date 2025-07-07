import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar.jsx';
import './Announcement.css';

const dummyAnnouncements = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `동작삼일수영장 ${i + 1}분기 아쿠아로빅 접수일정 안내`,
  date: `2025.07.${(i + 1).toString().padStart(2, '0')}`,
  views: Math.floor(Math.random() * 100),
}));

const ITEMS_PER_PAGE = 11;
const PAGE_GROUP_SIZE = 5;

const Announcement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const sortedAnnouncements = [...dummyAnnouncements].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const totalPages = Math.ceil(sortedAnnouncements.length / ITEMS_PER_PAGE);
  const currentGroup = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE);
  const groupStart = currentGroup * PAGE_GROUP_SIZE + 1;
  const groupEnd = Math.min(groupStart + PAGE_GROUP_SIZE - 1, totalPages);

  const paginatedAnnouncements = sortedAnnouncements.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <Navbar />
      <div className="announcement-wrapper">
        <table className="announcement-table">
          <thead>
            <tr className="announcement-header">
              <th style={{ flex: 1, textAlign: 'center' }}>No.</th>
              <th style={{ flex: 6, textAlign: 'left' }}>제목</th>
              <th style={{ flex: 2, textAlign: 'center' }}>등록일</th>
              <th style={{ flex: 1, textAlign: 'center' }}>조회수</th>
            </tr>
          </thead>
          <tbody>
            {paginatedAnnouncements.map((item, index) => (
              <tr key={item.id} className="announcement-row">
                <td style={{ flex: 1, textAlign: 'center' }}>
                  {sortedAnnouncements.length - ((currentPage - 1) * ITEMS_PER_PAGE + index)}
                </td>
                <td
                  style={{ flex: 6, textAlign: 'left', cursor: 'pointer' }}
                  onClick={() => navigate(`/announcement/${item.id}`)}
                >
                  {item.title}
                </td>
                <td style={{ flex: 2, textAlign: 'center' }}>{item.date}</td>
                <td style={{ flex: 1, textAlign: 'center' }}>{item.views}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          {groupStart > 1 && (
            <button className="page-btn" onClick={() => setCurrentPage(groupStart - 1)}>
              &lt;
            </button>
          )}
          {Array.from({ length: groupEnd - groupStart + 1 }, (_, i) => groupStart + i).map(
            (page) => (
              <button
                key={page}
                className={`page-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            )
          )}
          {groupEnd < totalPages && (
            <button className="page-btn" onClick={() => setCurrentPage(groupEnd + 1)}>
              &gt;
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Announcement;
