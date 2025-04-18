import { Link, useNavigate } from "react-router-dom";
import "./sidebar.css";
import { IoHomeOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { CiClock2 } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { MdLogout } from "react-icons/md";
import { RxDropdownMenu } from "react-icons/rx";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useContext } from "react";
import { UserContext } from "@/store/user-store";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const Sidebar = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setUser(null);
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="sidebar-container">
        <Link to="/dashboard">
          <div className="side-bar-logo">
            <img src="./logo.svg" className="sidebar-img"></img>
            <h1>
              Zidio<span className="side-bar-logo-span">ResultWave</span>
            </h1>
          </div>
        </Link>
        <div className="sidebar-nav-container">
          <div className="sidebar-nav">
            <div className="sidebar-up">
              <Link to="/dashboard">
                <div className="sidebar-nav-link">
                  <IoHomeOutline className="sidebar-icon" strokeWidth={4} />
                  <h1>Dashboard</h1>
                </div>
              </Link>
              <Link to="/candidates">
                <div className="sidebar-nav-list">
                  <div className="sidebar-link">
                    <CiUser className="sidebar-icon" strokeWidth={1} />
                    <h1>Candidate</h1>
                  </div>
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <RxDropdownMenu className="s-m-top drop-icon" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Link to="/candidates/add">Add Candidates</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link to="/candidates/addMarks">Add Marks</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </Link>
              <div className="sidebar-nav-link">
                <CiClock2 className=" s-m-top sidebar-icon" strokeWidth={1} />
                <h1>Duration</h1>
              </div>
              <div className="sidebar-nav-link">
                <SlCalender className="sidebar-icon" strokeWidth={1} />
                <h1>Calender</h1>
              </div>
            </div>
            <div className="sidebar-down">
              <div className="sidebar-nav-link" onClick={logoutHandler}>
                <MdLogout className="s-m-top sidebar-icon" />
                <h1>Logout</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
