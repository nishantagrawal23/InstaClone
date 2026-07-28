
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Home from '../pages/post/Home'
import VerifyOtpPage from '../pages/auth/verfiyOtp'


const AppRoutes = () => {
  return (
    <div>
        < Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/verify-otp" element={<VerifyOtpPage/>}/>
       
        </Routes>
    </div>
    
  )
}

export default AppRoutes