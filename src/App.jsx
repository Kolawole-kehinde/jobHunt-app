
import NavBar from "./Components/layout/NavBar";
import HomePage from "./pages/home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AllJobsPage from "./pages/jobs";
import Dashboard from "./pages/dashboard";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import PasswordSuccessPage from "./pages/auth/PasswordSuccess";
import JobDetailsPage from "./pages/jobs/JobDetailsPage";
import JobCreation from "./pages/jobs/jobCreation";
import EditJob from "./pages/jobs/EditJob";
import ButtomBanner from "./Components/ButtomBanner";
import ResumeUploadPage from "./pages/jobs/ResumeUploadPage";
import ApplyPage from "./pages/jobs/ApplyPage";
import { Route, Routes } from "react-router";
import ResumeReviewPage from "./pages/jobs/ReviewApplicationPage";
import ApplicationSubmittedWrapper from "./Components/ApplicationSubmittedWrapper";


const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        {/* Auth routes inside ProtectedRoute wrapper if needed */}
        <Route path="auth" element={<ProtectedRoute />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route path="password-success" element={<PasswordSuccessPage />} />
        </Route>

        <Route index element={<HomePage />} />

        <Route path="jobs">
          <Route index element={<AllJobsPage />} />
          <Route path="jobcreation" element={<JobCreation />} />
          <Route path=":jobId" element={<JobDetailsPage />} />
          <Route path="edit/:jobId" element={<EditJob />} />
        </Route>

        {/* Apply page route */}
        <Route path="apply/:jobId" element={<ApplyPage />} />

        <Route path="dashboard" element={<Dashboard />} />
      <Route path="/resume-upload/:jobId" element={<ResumeUploadPage />} />
   <Route path="/review/:jobId" element={<ResumeReviewPage />} />
   <Route path="/submitted" element={<ApplicationSubmittedWrapper />} />



      </Routes>
      <ButtomBanner />
    </>
  );
};

export default App;
