import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getNoticeById } from '../../../Api';
import Navbar from '../../../components/Navbar/Navbar';
import './AnnouncementDetail.css';

const AnnouncementDetail = () => {
  const { id } = useParams(); // 공지사항 id 추출
  const navigate = useNavigate();

  const [notice, setNotice] = useState(null);

  useEffect(() => {
    const fetchNotice = async () => {
      const data = await getNoticeById(id);
      if (data) {
        setNotice(data);
      }
    };

    fetchNotice();
  }, [id]);

  if (!notice) return <div>로딩 중...</div>;

  const formatDate = (isoDate) => {
    return new Date(isoDate).toISOString().split('T')[0].replace(/-/g, '.');
  };

  return (
    <>
      <Navbar />
      <div className="announcement-detail-wrapper">
        <div className="announcement-detail-header">
          <div className="announcement-title">{notice.title}</div>
          <div className="announcement-meta">
            <div className="announcement-meta-item">
              <span className="announcement-meta-label">등록일 : </span>
              <span className="announcement-meta-value">{formatDate(notice.createdAt)}</span>
            </div>
            <div className="announcement-meta-item">
              <span className="announcement-meta-label">조회수 : </span>
              <span className="announcement-meta-value">{notice.viewCount}</span>
            </div>
          </div>
        </div>

        <div className="announcement-content">{notice.content}</div>

        <div className="announcement-footer">
          <button className="back-button" onClick={() => navigate('/announcement')}>
            목록보기
          </button>
        </div>
      </div>
    </>
  );
};

export default AnnouncementDetail;
