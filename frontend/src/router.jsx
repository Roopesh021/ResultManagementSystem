import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import StudentPortal from "./pages/StudentPortal";
import Header from "./components/Header";
import AdminSearch from "./pages/AdminSearch";
import Demo from "./pages/Demo";
import { useContext } from "react";
import { UserContext } from "./store/user-store";
import Sidebar from "./components/Sidebar";
import Candidate from "./pages/Candidate";
import AddCandidates from "./pages/AddCandidates";
import AddMarks from "./pages/AddMarks";

function AppRouter() {
  const { user } = useContext(UserContext);
  return (
    <Router>
      {!user ? (
        <Header />
      ) : (
        <div className="admin">
          <Sidebar />
          <div className="main-content">
            <Header />
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/candidates" element={<Candidate />} />
              <Route path="/candidates/add" element={<AddCandidates />} />
              <Route path="/candidates/addMarks" element={<AddMarks />} />
              <Route path="/student" element={<AdminSearch />} />
              <Route path="/demo" element={<Demo />} />
            </Routes>
          </div>
        </div>
      )}
      {!user && (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/result" element={<StudentPortal />} />
        </Routes>
      )}
    </Router>
  );
}
export default AppRouter;
