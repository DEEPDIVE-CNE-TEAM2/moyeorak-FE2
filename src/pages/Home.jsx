import React from 'react';
import AdminNavbar from '../components/Navbar/Navbar.jsx';
import CloudWatchDashboard from './CloudWatchDashboard.jsx';

const HomeAdmin = () => {
  return (
    <div>
      {/* 상단 네비바 */}
      <AdminNavbar />

      {/* 네비바 아래 CloudWatch 대시보드 */}
      <div style={{ marginTop: '20px' }}>
        <CloudWatchDashboard />
      </div>
    </div>
  );
};

export default HomeAdmin;
