import { Route, Routes } from "react-router";
import NavBar from "./Components/layout/NavBar";
import HomePage from "./pages/home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ButtomBanner from "./Components/ButtomBanner";
import AllJobsPage from "./pages/jobs";

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
        </Route>
        </Route>
       
        </Routes>
      <ButtomBanner/>
    </>
  );
};

export default App;
