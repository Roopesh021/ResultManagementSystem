import { useContext, useState } from "react";
import "./header.css";
import { UserContext } from "@/store/user-store";
import { Popover, PopoverTrigger } from "./ui/popover";
import { PopoverContent } from "./ui/popover";
import { Avatar, AvatarImage } from "./ui/avatar";
import { FILE_API_END_POINT, USER_API_END_POINT } from "@/utils/constant";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { MdLogout } from "react-icons/md";
const Header = () => {
  const { user, setUser, setResults } = useContext(UserContext);

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

  const [studentId, setStudentId] = useState("");

  const handleSearch = async () => {
    try {
      const { data } = await axios.get(
        `${FILE_API_END_POINT}/results/${studentId}`
      );
      navigate("/student");
      setStudentId("");
      setResults(data);
    } catch (error) {
      alert("Error retrieving results.");
    }
  };
  return (
    <>
      <header className="header-section">
        <nav className="navbar">
          {!user ? (
            <>
              <Link to="/">
                <div className="logo">
                  Zidio<span className="logo-span">ResultWave</span>
                </div>
              </Link>
              <Link to="/result" className="hover:text-red-500">
                Result
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard">
                <div className="logo">
                  Zidio<span className="logo-span">ResultWave</span>
                </div>
              </Link>
              <div className="r-nav">
                <div className="hero-search">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                  />
                  <button onClick={handleSearch} className="button search-btn">
                    Search
                  </button>
                </div>
                <Popover>
                  <PopoverTrigger>
                    <Avatar className="cursor-pointer h-12 w-12">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        className=""
                      />
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-70">
                    <div className="profile-container">
                      <Avatar className="cursor-pointer">
                        <AvatarImage src="https://github.com/shadcn.png" />
                      </Avatar>
                      <h4 className="font-medium">{user.fullname}</h4>
                    </div>
                    <div onClick={logoutHandler} className="logout">
                      <MdLogout className="logout-icon" />
                      <button>Logout</button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </>
          )}
        </nav>
      </header>
    </>
  );
};
export default Header;
