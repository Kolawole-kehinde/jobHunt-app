
import NavBar from "./Components/layout/NavBar";
import HomePage from "./pages/home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AllJobsPage from "./pages/jobs";
import Dashboard from "./pages/dashboard";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute";
import JobCreation from "./pages/jobs/JobCreation";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import PasswordSuccessPage from "./pages/auth/PasswordSuccess";
import JobDetailsPage from "./pages/jobs/JobDetailsPage";
import { Route, Routes } from "react-router";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/">
          {/* Unprotected Pages/Routes */}
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
            <Route path=":id" element={<JobDetailsPage />} />
          </Route>

          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
