import axios from "axios";
import "./SignUp.css";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { UserContext } from "@/Store/user-store";
const SignUp = () => {
  // const { user } = useContext(UserContext);
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/register`,
        { ...input },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="signup-section">
        <form onSubmit={submitHandler} className="f-container">
          <h1>SignUp</h1>
          <div className="f-label">
            <label>Full Name</label>
            <input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Enter your name.."
            ></input>
          </div>
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
              SignUp
            </button>
          </div>
          <div className="f-label">
            <h3>
              Already have an Account?
              <span className="f-span">
                <Link to="/">Login</Link>
              </span>
            </h3>
          </div>
        </form>
      </div>
    </>
  );
};
export default SignUp;
