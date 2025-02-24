import { Route, Routes } from "react-router";
import NavBar from "./Components/layout/NavBar";
import HomePage from "./pages/home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AllJobs from "./Components/jobs/AllJobs";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="auth">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Route>
        <Route path="jobs">
          <Route path="alljob" element={<AllJobs />} />
        </Route>

        
      </Routes>
    </>
  );
};

export default App;
