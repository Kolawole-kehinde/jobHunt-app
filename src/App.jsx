import { Route, Routes } from "react-router";
import NavBar from "./Components/layout/NavBar";
import HomePage from "./pages/home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AllJobsPage from "./pages/jobs";
import JobDetailsPage from "./pages/jobs/JobDetails";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/">
        {/* Unprotected Pages/Routes */}
        <Route path="auth">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route index element={<HomePage />} />
          <Route path="jobs">
          <Route index element={<AllJobsPage/>} />
          <Route path=":id" element={<JobDetailsPage/>}/>
        </Route>
        </Route>
       
        </Routes>
      
    </>
  );
};

export default App;
