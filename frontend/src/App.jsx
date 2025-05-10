import { Routes,Route,Link } from "react-router-dom";
// import Login from "./pages/user-auth/Login";
import MainLayout from "./pages/layout/MainLayout";
import AuthPage from "./pages/user-auth/AuthPage";
import EmailVerification from "./pages/user-auth/EmailVerification";
import ProfilePage from "./pages/profilePage/ProfilePage";

function App() {
  return (
    <>
      <div >
        
        <Routes>
          <Route element={<MainLayout/>}>

          <Route path="/login" element={<AuthPage/>}/>
          <Route path="/register" element={<AuthPage/>}/>
          <Route path="/email-verification/:id" element={<EmailVerification/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>

          </Route>
          
        </Routes>
      </div>
    </>
  )
}

export default App
