import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';

const AnnouncementDetail = () => {
  const { id } = useParams();

  return (
    <>
      <Navbar />
      <div style={{ padding: '40px', fontFamily: 'NanumGothic' }}>
        <h2>공지사항 상세 페이지</h2>
        <p><strong>ID:</strong> {id}</p>
        {/* 실제 공지 데이터를 서버나 상태에서 받아와 출력하도록 하면 됨 */}
      </div>
    </>
  );
};

export default AnnouncementDetail;
