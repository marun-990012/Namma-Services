import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
// import Login from "./pages/user-auth/Login";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import MainLayout from "../pages/layout/MainLayout";
import AuthPage from "../pages/user-auth/AuthPage";
import EmailVerification from "../pages/user-auth/EmailVerification";
import ForgotPassword from "../pages/user-auth/ForgotPassword";
import ResetPassword from "../pages/user-auth/ResetPassword";
import CategoryForm from "../pages/service-category/CategoryForm";
import CategoryList from "../pages/service-category/CategoryList";
import ProfilePage from "../pages/profilePage/ProfilePage";
import JobPostForm from "../pages/job-post/JobPostForm";
import MyJobPosts from "../pages/job-post/MyJobPosts";
import JobPostDetail from "../pages/job-post/JobPostDetail";
import LatestJobPosts from "../pages/job-post/LatestJobPosts";
import JobDetails from "../pages/job-post/JobDetails";
import SendJobRequest from "../pages/job-post/SendJobRequest";
import ViewJobRequest from "../pages/job-post/ViewJobRequest";
import TotalWorks from "../pages/job-post/TotalWorks";
import AllReviews from "../pages/review/AllReviews";
import ReviewCard from "../pages/review/ReviewCard";
import DashBoard from "../pages/dashboard/Dashboard";
import Payment from "../pages/payment/Payment";
import ViewMessages from "../pages/job-post/ViewMessages";
import PrivateRoute from "./PrivateRoutes";
import ProtectedRoute from "./ProtectedRoutes";
import Notification from "../pages/notification/Notification";

import { fetchUnreadCount } from "../redux/slices/notificationSlice";

function AppRoutes() {

  const dispatch = useDispatch();
const location = useLocation();

useEffect(() => {
  if (localStorage.getItem("token")) {
    dispatch(fetchUnreadCount());
  }
}, [location.pathname, dispatch]);
  return (
    <>
      <div>
        <Routes>
          <Route element={<MainLayout />}>
            {/* login route */}
            <Route
              path="/login"
              element={
                localStorage.getItem("token") ? (
                  <Navigate to="/profile" replace />
                ) : (
                  <AuthPage />
                )
              }
            />

            {/* register route */}
            <Route
              path="/register"
              element={
                localStorage.getItem("token") ? (
                  <Navigate to="/profile" replace />
                ) : (
                  <AuthPage />
                )
              }
            />

            {/* <Route path="/register" element={<AuthPage/>}/> */}

            <Route
              path="/email-verification/:id"
              element={
                localStorage.getItem("token") ? (
                  <Navigate to="/profile" replace />
                ) : (
                  <EmailVerification />
                )
              }
            />
            {/* <Route path="/email-verification/:id" element={<EmailVerification/>}/> */}

            <Route
              path="/forgot/password"
              element={
                localStorage.getItem("token") ? (
                  <Navigate to="/profile" replace />
                ) : (
                  <ForgotPassword />
                )
              }
            />
            {/* <Route path="/forgot/password" element={<ForgotPassword/>}/> */}

            <Route
              path="/reset/password/:id"
              element={
                localStorage.getItem("token") ? (
                  <Navigate to="/profile" replace />
                ) : (
                  <ResetPassword />
                )
              }
            />
            {/* <Route path="/reset/password/:id" element={<ResetPassword/>}/> */}

            <Route
              path="/category/new"
              element={
                <PrivateRoute>
                  <ProtectedRoute roles={["admin"]}>
                    <CategoryForm />
                  </ProtectedRoute>
                </PrivateRoute>
              }
            />
            {/* <Route path="/category/new" element={<CategoryForm/>}/> */}

            <Route
              path="/category/edit/:id"
              element={
                <PrivateRoute>
                  <ProtectedRoute roles={["admin"]}>
                    <CategoryForm />
                  </ProtectedRoute>
                </PrivateRoute>
              }
            />
            {/* <Route path="/category/edit/:id" element={<CategoryForm />} /> */}

            <Route
              path="/service-category"
              element={
                <PrivateRoute>
                  <ProtectedRoute roles={["admin"]}>
                    <CategoryList />
                  </ProtectedRoute>
                </PrivateRoute>
              }
            />
            {/* <Route path="/service-category" element={<CategoryList />} /> */}

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            {/* <Route path="/profile" element={<ProfilePage />} /> */}

            <Route
              path="/profile/edit/:id"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            {/* <Route path="/profile/edit/:id" element={<ProfilePage />} /> */}

            <Route
              path="/profile/image/upload"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            {/* <Route path="/profile/image/upload" element={<ProfilePage />} /> */}

            <Route
              path="/profile/image/view/:id"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            {/* <Route path="/profile/image/view/:id" element={<ProfilePage />} /> */}

            <Route
              path="/job/post/new"
              element={
                <PrivateRoute>
                  <ProtectedRoute roles={["work-provider"]}>
                    <JobPostForm />
                  </ProtectedRoute>
                </PrivateRoute>
              }
            />


            <Route
              path="/job/post/edit/:id"
              element={
                <PrivateRoute>
                  <ProtectedRoute roles={["work-provider"]}>
                    <JobPostForm />
                  </ProtectedRoute>
                </PrivateRoute>
              }
            />
            {/* <Route path="/job/post/new" element={<JobPostForm />} /> */}

            <Route
              path="/job/posts"
              element={
                <PrivateRoute>
                  <ProtectedRoute roles={["work-provider"]}>
                    <MyJobPosts />
                  </ProtectedRoute>
                </PrivateRoute>
              }
            />
            {/* <Route path="/job/posts" element={<MyJobPosts />} /> */}

            <Route
              path="/job/post/detail/:id"
              element={
                <PrivateRoute>
                  <ProtectedRoute roles={["work-provider"]}>
                    <JobPostDetail />
                  </ProtectedRoute>
                </PrivateRoute>
              }
            />
            {/* <Route path="/job/post/detail/:id" element={<JobPostDetail />} /> */}

            <Route
              path="/job/post/details/requests/:id"
              element={
                <PrivateRoute>
                  <ProtectedRoute roles={["work-provider"]}>
                    <JobPostDetail />
                  </ProtectedRoute>
                </PrivateRoute>
              }
            />
            {/* <Route path="/job/post/details/requests/:id" element={<JobPostDetail />}/> */}

            <Route
              path="/job/post/details/considers/:id"
              element={
                <PrivateRoute>
                  <ProtectedRoute roles={["work-provider"]}>
                    <JobPostDetail />
                  </ProtectedRoute>
                </PrivateRoute>
              }
            />
            {/* <Route path="/job/post/details/considers/:id" element={<JobPostDetail />}/> */}

            <Route
              path="/jobs/recent"
              element={
                <PrivateRoute>
                  <ProtectedRoute roles={["service-provider"]}>
                    <LatestJobPosts />
                  </ProtectedRoute>
                </PrivateRoute>
              }
            />
            {/* <Route path="/jobs/recent" element={<LatestJobPosts />} /> */}

            <Route
              path="/jobs/recent/detail/:id/:dist"
              element={
                <PrivateRoute>
                  <ProtectedRoute roles={["service-provider"]}>
                    <JobDetails />
                  </ProtectedRoute>
                </PrivateRoute>
              }
            />
            {/* <Route path="/jobs/recent/detail/:id/:dist" element={<JobDetails />}/> */}

            <Route
              path="/jobs/recent/detail/:id/:dist/warning"
              element={
                <PrivateRoute>
                  <ProtectedRoute roles={["service-provider"]}>
                    <JobDetails />
                  </ProtectedRoute>
                </PrivateRoute>
              }
            />
            {/* <Route path="/jobs/recent/detail/:id/:dist/warning" element={<JobDetails />} /> */}

            <Route
              path="/jobs/recent/request/:id"
              element={
                <PrivateRoute>
                  <ProtectedRoute roles={["service-provider"]}>
                    <SendJobRequest />
                  </ProtectedRoute>
                </PrivateRoute>
              }
            />
            {/* <Route path="/jobs/recent/request/:id" element={<SendJobRequest />}/> */}

            <Route
              path="/jobs/recent/request/confirm/:id/"
              element={
                <PrivateRoute>
                  <ProtectedRoute roles={["service-provider"]}>
                    <SendJobRequest />
                  </ProtectedRoute>
                </PrivateRoute>
              }
            />
            {/* <Route path="/jobs/recent/request/confirm/:id/" element={<SendJobRequest />} /> */}

            <Route
              path="/view/job/request/:userId/:id"
              element={
                <PrivateRoute>
                  <ProtectedRoute roles={["work-provider"]}>
                    <ViewJobRequest />
                  </ProtectedRoute>
                </PrivateRoute>
              }
            />
            {/* <Route path="/view/job/request/:userId/:id" element={<ViewJobRequest />} /> */}

            <Route
              path="/total/completed/job/:id"
              element={
                <PrivateRoute>
                  <ProtectedRoute roles={["work-provider"]}>
                    <TotalWorks />
                  </ProtectedRoute>
                </PrivateRoute>
              }
            />
            {/* <Route path="/total/completed/job/:id" element={<TotalWorks />} /> */}

            <Route
              path="/review/write/:serviceProviderId/:jobId"
              element={
                <PrivateRoute>
                  <ProtectedRoute roles={["work-provider"]}>
                    <ReviewCard />
                  </ProtectedRoute>
                </PrivateRoute>
              }
            />
            {/* <Route path="/review/write/:serviceProviderId/:jobId" element={<ReviewCard />} /> */}

            <Route
              path="/total/reviews/:id"
              element={
                <PrivateRoute>
                  <ProtectedRoute roles={["work-provider","service-provider"]}>
                    <AllReviews />
                  </ProtectedRoute>
                </PrivateRoute>
              }
            />
            {/* <Route path="/total/reviews/:id" element={<AllReviews />} /> */}

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <ProtectedRoute roles={["service-provider"]}>
                    <DashBoard />
                  </ProtectedRoute>
                </PrivateRoute>
              }
            />
            {/* <Route path="/dashboard" element={<DashBoard />} /> */}

            <Route
              path="/payment"
              element={
                <PrivateRoute>
                  <ProtectedRoute roles={["service-provider"]}>
                    <Payment />
                  </ProtectedRoute>
                </PrivateRoute>
              }
            />
            {/* <Route path="/payment" element={<Payment />} /> */}

            <Route
              path="/payment/wallet/add/coins"
              element={
                <PrivateRoute>
                  <ProtectedRoute roles={["service-provider"]}>
                    <Payment />
                  </ProtectedRoute>
                </PrivateRoute>
              }
            />
            {/* <Route path="/payment/wallet/add/coins" element={<Payment />} /> */}

            <Route
              path="/job/request/message/:id"
              element={
                <PrivateRoute>
                  <ProtectedRoute roles={["service-provider"]}>
                    <ViewMessages />
                  </ProtectedRoute>
                </PrivateRoute>
              }
            />
            {/* <Route path="/job/request/message/:id" element={<ViewMessages />} /> */}

            <Route
              path="/notifications"
              element={
                <PrivateRoute>
                  <Notification />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default AppRoutes;
