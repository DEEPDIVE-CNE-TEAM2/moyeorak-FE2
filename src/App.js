import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import JoinMembership from './pages/JoinMembership'
import Login from './pages/Login'
import Place from './pages/Place'
import ClassReservation from './pages/ClassReservation'
import Rental from './pages/Rental'
import Announcement from './pages/Announcement'
import Classes from './pages/Mypage/Classes'
import Profile from './pages/Mypage/Profile/Profile'
import Rentals from './pages/Mypage/Rentals'
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


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/joinMembership' element={<JoinMembership/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/place' element={<Place/>} />
        <Route path='/classReservation' element={<ClassReservation/>} />
        <Route path='/rental' element={<Rental/>} />
        <Route path='/announcement' element={<Announcement/>} />
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

        

      </Routes>
    </BrowserRouter>
  )
}

export default App
