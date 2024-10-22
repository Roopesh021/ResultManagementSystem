import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import StudentPortal from "./pages/StudentPortal";
import Header from "./components/Header";
import AdminSearch from "./pages/AdminSearch";

function AppRouter() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/student" element={<AdminSearch />} />
        <Route path="/result" element={<StudentPortal />} />
      </Routes>
    </Router>
  );
}
export default AppRouter;
