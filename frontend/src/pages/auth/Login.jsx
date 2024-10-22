import "./SignUp.css";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { USER_API_END_POINT } from "@/utils/constant";
import { UserContext } from "@/store/user-store";
const Login = () => {
  // useEffect(() => {
  //   if (user) {
  //     navigate("/");
  //   }
  // }, []);
  const { setUser } = useContext(UserContext);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        setUser(res.data.user);
        navigate("/dashboard");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="signup-section">
        <form onSubmit={submitHandler} className="f-container">
          <h1>Admin Login</h1>
          <div className="f-label">
            <label>Email</label>
            <input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter your email.."
            ></input>
          </div>
          <div className="f-label">
            <label>Password</label>
            <input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password.."
            ></input>
          </div>
          <div className="f-label">
            <button type="submit" className="button search-btn">
              Login
            </button>
          </div>
          <div className="f-label">
            <h3>
              Don't have an Account?
              <span className="f-span">
                <Link to="/signup">SignUp</Link>
              </span>
            </h3>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
