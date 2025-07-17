import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import JoinMembership from './pages/JoinMembership'
import Login from './pages/Login'
import Place from './pages/Place/Place'
import ClassReservation from './pages/ClassReservation/ClassReservation/ClassReservation'
import ClassReservationDetail from './pages/ClassReservation/ClassReservationDetail/ClassReservationDetail'
import Payment from './pages/ClassReservation/PaymentPage/PaymentPage'
import Rental from './pages/Rental/Rental'
import Announcement from './pages/Announcement/Announcement'
import AnnouncementDetail from './pages/Announcement/AnnouncementDetail/AnnouncementDetail';
import Classes from './pages/Mypage/Classes/Classes'
import Profile from './pages/Mypage/Profile/Profile'
import Rentals from './pages/Mypage/Rentals/Rentals'
import ChangePassword from './pages/Mypage/Profile/ChangePassword'
import ChangePhoneNumber from './pages/Mypage/Profile/ChangePhoneNumber'
import ChangeRegion from './pages/Mypage/Profile/ChangeRegion'
import WithdrawAccount from './pages/Mypage/Profile/WithdrawAccount'
import Songpa from './pages/Area/Songpa';
import Jung from './pages/Area/Jung';
import Seongdong from './pages/Area/Seongdong';
import ForgotPassword from "./pages/ForgotPassword";
import VerifyPhone from "./pages/VerifyPhone";
import RentalDetailContainer from './pages/Rental/RentalDetailContainer';
import ReservePage from './pages/Rental/ReservePage/ReservePage';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/joinMembership' element={<JoinMembership />} />
        <Route path='/login' element={<Login />} />
        <Route path='/place' element={<Place />} />
        {/* 쿼리 파라미터로 regionId를 받아서 지역별 프로그램 표시 */}
        <Route path='/classReservation' element={<ClassReservation />} />

        {/* 필요 시 :district 파라미터 포함 경로도 유지 가능 */}
        <Route path='/:district/classReservation' element={<ClassReservation />} />

        <Route path='/classReservation/:id' element={<ClassReservationDetail />} />
        
        <Route path='/classreservation/payment/:id' element={<Payment />} />

        <Route path='/rental' element={<Rental />} />
        <Route path='/announcement' element={<Announcement />} />
        <Route path='/announcement/:id' element={<AnnouncementDetail />} />
        <Route path='/mypage/classes' element={<Classes />} />
        <Route path='/mypage/profile' element={<Profile />} />
        <Route path='/mypage/rentals' element={<Rentals />} />
        <Route path='/mypage/profile/password' element={<ChangePassword />} />
        <Route path='/mypage/profile/phone' element={<ChangePhoneNumber />} />
        <Route path='/mypage/profile/Region' element={<ChangeRegion />} />
        <Route path='/mypage/profile/withdraw' element={<WithdrawAccount />} />
        <Route path='/songpa' element={<Songpa />} />
        <Route path='/jung' element={<Jung />} />
        <Route path='/seongdong' element={<Seongdong />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-phone" element={<VerifyPhone />} />

        {/* 대관 상세 및 예약 경로 */}
        <Route path="/:district/rental/detail/:id" element={<RentalDetailContainer />} />
        <Route path="/:district/rental/reserve/:id" element={<ReservePage />} />
        <Route path="/:district/:id" element={<RentalDetailContainer />} />


      </Routes>
    </BrowserRouter>
  )
}

export default App
