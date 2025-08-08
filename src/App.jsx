import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


import Home from './pages/Home'
import Login from './pages/Login/Login'
import UserManagement from "./pages/UserManagement/UserManagement";
import ProgramManagement from "./pages/ClassManagement/ProgramManagement/ProgramManagement";
import ProgramDetail from './pages/ClassManagement/ProgramDetail/ProgramDetail';
import ProgramEdit from "./pages/ClassManagement/ProgramEdit/ProgramEdit";
import ProgramAdd from "./pages/ClassManagement/ProgramAdd/ProgramAdd";
import PostNotice from "./pages/PostManagement/PostNotice/PostNotice";
import PostNoticeDetail from "./pages/PostManagement/PostNoticeDetail/PostNoticeDetail";
import PostNoticeEdit from "./pages/PostManagement/PostNoticeEdit/PostNoticeEdit";
import PostNoticeAdd from "./pages/PostManagement/PostNoticeAdd/PostNoticeAdd";
import PromotionMaterial from "./pages/PostManagement/PromotionMaterial/PromotionMaterial";
import PromotionEdit from './pages/PostManagement/PromotionEdit/PromotionEdit';
import FacilityManage from './pages/PostManagement/FacilityManage/FacilityManage';
import FacilityDetail from "./pages/PostManagement/FacilityDetail/FacilityDetail"
import FacilityEdit from "./pages/PostManagement/FacilityEdit/FacilityEdit"
import FacilityAdd from "./pages/PostManagement/FacilityAdd/FacilityAdd"
import CloudWatchDashboard from './pages/CloudWatchDashboard.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/member" element={<UserManagement />} />
        <Route path="/admin" element={<Navigate to="/admin/member" replace />} />
        <Route path="/admin/program/list" element={<ProgramManagement />} />
        <Route path="/admin/program/:programId" element={<ProgramDetail />} />
        <Route path="/admin/program/:programId/edit" element={<ProgramEdit />} />
        <Route path="/admin/program/add" element={<ProgramAdd />} />
        <Route path="/admin/post/notice" element={<PostNotice />} />
        <Route path="/admin/post/notice/detail/:noticeId" element={<PostNoticeDetail />} />
        <Route path="/admin/post/notice/edit/:noticeId" element={<PostNoticeEdit />} />
        <Route path="/admin/post/notice/add" element={<PostNoticeAdd />} />
        <Route path="/admin/post/promotion" element={<PromotionMaterial />} />
        <Route path="/admin/post/promotion/edit" element={<PromotionEdit />} />
        <Route path="/admin/post/facility" element={<FacilityManage />} />
        <Route path="/admin/facility/:id" element={<FacilityDetail />} />
        <Route path="/admin/facility/:id/edit" element={<FacilityEdit />} />
        <Route path="/admin/facility/add" element={<FacilityAdd />} />
         <Route path="/admin/cloudwatch" element={<CloudWatchDashboard />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App