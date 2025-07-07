import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import JoinMembership from './pages/JoinMembership'
import Login from './pages/Login'
import Place from './pages/Place'
import ClassReservation from './pages/ClassReservation/ClassReservation/ClassReservation'
import ClassReservationDetail from './pages/ClassReservation/ClassReservationDetail/ClassReservationDetail'
import Payment from './pages/ClassReservation/PaymentPage/PaymentPage'
import Rental from './pages/Rental/Rental'
import Announcement from './pages/Announcement/Announcement'
import Classes from './pages/Mypage/Classes/Classes'
import Profile from './pages/Mypage/Profile/Profile'
import Rentals from './pages/Mypage/Rentals/Rentals'
import ChangePassword from './pages/Mypage/Profile/ChangePassword'
import ChangePhoneNumber from './pages/Mypage/Profile/ChangePhoneNumber'
import WithdrawAccount from './pages/Mypage/Profile/WithdrawAccount'
import Songpa from './pages/Area/Songpa';
import Jung from './pages/Area/Jung';
import Seongdong from './pages/Area/Seongdong';
import JungFacility from './components/Facility/JungFacility';
import SongpaFacility from "./components/Facility/SongpaFacility";
import SeongdongFacility from "./components/Facility/SeongdongFacility";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyPhone from "./pages/VerifyPhone";
import JungRental from "./pages/Rental/JungRental";
import SongpaRental from "./pages/Rental/SongpaRental";
import SeongdongRental from "./pages/Rental/SeongdongRental";
import AnnouncementDetail from './pages/Announcement/AnnouncementDetail/AnnouncementDetail';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/joinMembership' element={<JoinMembership/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/place' element={<Place/>} />
        <Route path='/classReservation' element={<ClassReservation/>} />
        <Route path='/classReservation/:id' element={<ClassReservationDetail/>} />
        <Route path='/classReservation/:id/payment' element={<Payment/>}/>
        <Route path='/rental' element={<Rental/>} />
        <Route path='/announcement' element={<Announcement/>} />
        <Route path="/announcement/:id" element={<AnnouncementDetail />} />
        <Route path='/mypage/classes' element={<Classes/>} />
        <Route path='/mypage/profile' element={<Profile/>} />
        <Route path='/mypage/rentals' element={<Rentals/>} />
        <Route path='/mypage/profile/password' element={<ChangePassword />} />
        <Route path='/mypage/profile/phone' element={<ChangePhoneNumber />} />
        <Route path='/mypage/profile/withdraw' element={<WithdrawAccount />} />
        <Route path='/songpa' element={<Songpa />} />
        <Route path='/jung' element={<Jung />} />
        <Route path='/seongdong' element={<Seongdong />} />
        <Route path="/jung/place" element={<JungFacility />} />
        <Route path="/songpa/place" element={<SongpaFacility />} />
        <Route path="/seongdong/place" element={<SeongdongFacility />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-phone" element={<VerifyPhone />} />
        <Route path="/rental/junggu" element={<JungRental />} />
        <Route path="/rental/songpa" element={<SongpaRental />} />
        <Route path="/rental/seongdong" element={<SeongdongRental />} />

        

      </Routes>
    </BrowserRouter>
  )
}

export default App
