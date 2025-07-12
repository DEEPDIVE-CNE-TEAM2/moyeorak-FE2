import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar.jsx';
import { getNoticesByRegion } from '../../Api.jsx';
import './Announcement.css';
import down from '../../img/down.svg';
import search from '../../img/search.svg';

const ITEMS_PER_PAGE = 11;
const PAGE_GROUP_SIZE = 5;

const Announcement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [originalAnnouncements, setOriginalAnnouncements] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [searchType, setSearchType] = useState('제목');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  // 공지사항 불러오기
  useEffect(() => {
    const fetchNotices = async () => {
      const regionId = localStorage.getItem('selectedRegionId');
      if (!regionId) return;

      const data = await getNoticesByRegion(regionId);
      const formatted = data.map((item) => ({
        id: item.id,
        title: item.title,
        content: item.content,
        date: new Date(item.createdAt).toISOString().split('T')[0].replace(/-/g, '.'),
        views: item.viewCount,
      }));
      const sorted = [...formatted].sort((a, b) => new Date(b.date) - new Date(a.date));
      setOriginalAnnouncements(sorted);
      setFilteredAnnouncements(sorted);
    };

    fetchNotices();
  }, []);

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
    setIsDropdownOpen(false);
  };

  const handleSearch = () => {
    const keyword = searchKeyword.trim().toLowerCase();
    if (!keyword) {
      setFilteredAnnouncements(originalAnnouncements);
      return;
    }

    const filtered = originalAnnouncements.filter((item) => {
      const title = item.title.toLowerCase();
      const content = item.content.toLowerCase();
      if (searchType === '제목') return title.includes(keyword);
      if (searchType === '내용') return content.includes(keyword);
      if (searchType === '제목/내용') return title.includes(keyword) || content.includes(keyword);
      return false;
    });

    setFilteredAnnouncements(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredAnnouncements.length / ITEMS_PER_PAGE);
  const currentGroup = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE);
  const groupStart = currentGroup * PAGE_GROUP_SIZE + 1;
  const groupEnd = Math.min(groupStart + PAGE_GROUP_SIZE - 1, totalPages);

  const paginatedAnnouncements = filteredAnnouncements.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <Navbar />
      <div className="announcement-wrapper">
        <div className="announcement-search-bar">
          <div className="search-select-wrapper">
            <div className="search-select" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              {searchType}
              <img src={down} alt="dropdown" className="dropdown-icon" />
            </div>
            {isDropdownOpen && (
              <div className="search-options">
                {['제목', '내용', '제목/내용'].map((type) => (
                  <div key={type} className="search-option" onClick={() => handleSearchTypeChange(type)}>
                    {type}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="search-input-box">
            <input
              type="text"
              className="search-input"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
            />
            <button className="search-button" onClick={handleSearch}>
              <img src={search} alt="search" className="search-icon" />
            </button>
          </div>
        </div>

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
                  {filteredAnnouncements.length - ((currentPage - 1) * ITEMS_PER_PAGE + index)}
                </td>
                <td
                  style={{ flex: 6, textAlign: 'left', cursor: 'pointer', color: '#151515' }}
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
