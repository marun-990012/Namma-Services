import { Routes,Route,Link } from "react-router-dom";
// import Login from "./pages/user-auth/Login";
import MainLayout from "./pages/layout/MainLayout";
import AuthPage from "./pages/user-auth/AuthPage";
import EmailVerification from "./pages/user-auth/EmailVerification";
import CategoryForm from "./pages/service-category/CategoryForm";
import CategoryList from "./pages/service-category/CategoryList";
import ProfilePage from "./pages/profilePage/ProfilePage";
import JobPostForm from "./pages/job-post/JobPostForm";
import MyJobPosts from "./pages/job-post/MyJobPosts";
import JobPostDetail from "./pages/job-post/JobPostDetail";
import JobRequests from "./pages/job-post/JobRequests";
import JobConsider from "./pages/job-post/JobConsider";
import LatestJobPosts from "./pages/job-post/LatestJobPosts";
import JobDetails from "./pages/job-post/JobDetails";
import SendJobRequest from "./pages/job-post/SendJobRequest";
import ViewJobRequest from "./pages/job-post/ViewJobRequest";
import DashBoard from "./pages/dashboard/Dashboard";
import Payment from "./pages/payment/Payment";
function App() {
  return (
    <>
      <div >
        
        <Routes>
          <Route element={<MainLayout/>}>

            <Route path="/login" element={<AuthPage/>}/>
            <Route path="/register" element={<AuthPage/>}/>
            <Route path="/email-verification/:id" element={<EmailVerification/>}/>
            <Route path="/category/new" element={<CategoryForm/>}/>
            <Route path="/category/edit/:id" element={<CategoryForm/>}/>
            <Route path="/service-category" element={<CategoryList/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/profile/edit/:id" element={<ProfilePage/>}/>
            <Route path="/profile/image/upload" element={<ProfilePage/>}/>
            <Route path="/profile/image/view/:id" element={<ProfilePage/>}/>
            <Route path="/job/post/new" element={<JobPostForm/>}/>
            <Route path="/job/posts" element={<MyJobPosts/>}/>
            <Route path="/job/post/detail/:id" element={<JobPostDetail/>}/>
            <Route path="/job/post/details/requests/:id" element={<JobPostDetail/>}/>
            <Route path="/job/post/details/considers/:id" element={<JobPostDetail/>}/>
            <Route path="/jobs/recent" element={<LatestJobPosts/>}/>
            <Route path="/jobs/recent/detail/:id/:dist" element={<JobDetails/>}/>
            <Route path="/jobs/recent/request/:id" element={<SendJobRequest/>}/>
            <Route path="/jobs/recent/request/confirm/:id/" element={<SendJobRequest/>}/>
            <Route path="/view/job/request/:userId/:id" element={<ViewJobRequest/>}/>
            <Route path="/dashboard" element={<DashBoard/>}/>
            <Route path="/payment" element={<Payment/>}/>

          </Route>
          
        </Routes>
      </div>
    </>
  )
}

export default App
