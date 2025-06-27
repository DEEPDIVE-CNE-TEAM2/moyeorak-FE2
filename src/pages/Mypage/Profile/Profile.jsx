import { useState } from "react";
import Navbar from '../../../components/Navbar/Navbar.jsx';
import PasswordCheck from "./PasswordCheck";
import ProfileForm from "./ProfileForm"; 
import Footer from '../../../components/Footer/Footer.jsx'

const Profile = () => {
  const [isVerified, setIsVerified] = useState(false); // 비밀번호 확인 완료 여부

  return (
    <>
    <Navbar/>
      {isVerified ? (
        <ProfileForm />
      ) : (
        <PasswordCheck onVerify={() => setIsVerified(true)} />
      )}
      <Footer/>
    </>
  );
};

export default Profile;
