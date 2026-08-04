import { Route, Routes } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import VerifyOtpPage from '../pages/auth/verfiyOtp'
import Layout from '../components/layout/Layout'
import FeedPage from '../pages/FeedPage'
import ExplorePage from '../pages/ExplorePage'
import MessagePage from '../pages/MessagePage'
import NotificationPage from '../pages/NotificationPage'
import CreatePostPage from '../pages/CreatePostPage'
import ProfilePage from '../pages/ProfilePage'
import OtherProfilePage from '../pages/OtherProfilePage'




const AppRoutes = () => {
  return (
    <div>
        < Routes>

          {/* Public Routes */}
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/verify-otp" element={<VerifyOtpPage/>}/>
        
     {/* Protected Routes */}
        <Route element={<Layout />}>
        <Route path="/" element={<FeedPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/messages" element={<MessagePage />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/create" element={<CreatePostPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/:id" element={<OtherProfilePage />}/>
      </Route>

        </Routes>
    </div>
    
  )
}

export default AppRoutes