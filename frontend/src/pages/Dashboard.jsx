import axios from "axios";
import { UserContext } from "@/store/user-store";
import { FILE_API_END_POINT } from "@/utils/constant";
import { useContext, useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { BiTachometer } from "react-icons/bi";
import { CiViewTable } from "react-icons/ci";
const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  console.log(user);

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("attendance");
  const [records, setRecords] = useState([]);

  const fetchAttendanceRecords = async () => {
    console.log("hello");
    try {
      const res = await axios.get(`${FILE_API_END_POINT}/attendance`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setRecords(res.data.attendanceRecords);
      }
    } catch (error) {
      console.error("Error fetching attendance records:", error);
    }
  };

  const fetchProjectReviewRecords = async () => {
    console.log("hello");
    try {
      const res = await axios.get(`${FILE_API_END_POINT}/projectReview`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setRecords(res.data.projectReviewRecords);
      }
    } catch (error) {
      console.error("Error fetching attendance records:", error);
    }
  };

  const fetchassessmentRecords = async () => {
    try {
      const res = await axios.get(`${FILE_API_END_POINT}/assessment`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setRecords(res.data.assessmentMarksRecords);
      }
    } catch (error) {
      console.error("Error fetching attendance records:", error);
    }
  };

  const fetchProjectSubmissionRecords = async () => {
    try {
      const res = await axios.get(`${FILE_API_END_POINT}/projectSubmission`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setRecords(res.data.projectSubmissionMarksRecords);
      }
    } catch (error) {
      console.error("Error fetching attendance records:", error);
    }
  };

  const fetchLinkedinPostRecords = async () => {
    try {
      const res = await axios.get(`${FILE_API_END_POINT}/linkedinPost`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setRecords(res.data.linkedinPostRecords);
      }
    } catch (error) {
      console.error("Error fetching attendance records:", error);
    }
  };

  // Tabs for different categories of marks
  const tabs = [
    { name: "Attendance Marks", category: "attendance" },
    { name: "Project Review Marks", category: "projectReview" },
    { name: "Assessment Marks", category: "assessment" },
    { name: "Project Submission Marks", category: "projectSubmission" },
    { name: "LinkedIn Post Marks", category: "linkedInPost" },
  ];

  const [input, setInput] = useState({
    file: "",
  });

  const fileInputRef = useRef(null);

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      const res = await axios.post(
        `${FILE_API_END_POINT}/upload/${activeTab}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      // Add a defensive check for `res` and `res.data`
      if (res && res.data && res.data.success) {
        setInput({ file: "" }); // Reset file in state
        fileInputRef.current.value = ""; // Clear the file input field
        toast.success(res.data.message);
      } else {
        throw new Error("Unexpected response structure");
      }
    } catch (error) {
      console.error("File upload error:", error);

      // Check if `error.response` exists
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred during the file upload.");
      }
    }
  };

  useEffect(() => {
    if (activeTab === "attendance") {
      fetchAttendanceRecords();
    } else if (activeTab === "projectReview") {
      fetchProjectReviewRecords();
    } else if (activeTab === "assessment") {
      fetchassessmentRecords();
    } else if (activeTab === "projectSubmission") {
      fetchProjectSubmissionRecords();
    } else if (activeTab === "linkedInPost") {
      fetchLinkedinPostRecords();
    }
    // Add conditions for other tabs if needed
  }, [activeTab]);

  return (
    <>
      <div className="admin-dashboard">
        <div className="heading">
          <BiTachometer className="dash-icon" />
          <h1>Dashboard</h1>
        </div>
        {/* <p>Manage and upload student marks for different categories</p> */}
        {/* Tab Navigation */}
        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab.category}
              className={activeTab === tab.category ? "active" : ""}
              onClick={() => setActiveTab(tab.category)}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <form onSubmit={submitHandler} className="form-section">
          <div className="form-container">
            <input
              type="file"
              id="uploadBtn"
              name="file"
              onChange={changeFileHandler}
              ref={fileInputRef}
            ></input>
            <label htmlFor="uploadBtn">
              <FaCloudUploadAlt />
            </label>
            <button type="submit">Upload</button>
          </div>
        </form>
      </div>
      <div className="admin-table">
        {activeTab === "attendance" && (
          <div>
            <div className="heading">
              <CiViewTable className="dash-icon" />
              <h1>Attendance Marks</h1>
            </div>
            <div className="table-section">
              <table className="t-record">
                <thead className="table-head">
                  <tr>
                    <th className="t-head">Student ID</th>
                    <th className="t-head">Name</th>
                    <th className="t-head">Email</th>
                    <th className="t-head">Attendance Marks</th>
                  </tr>
                </thead>
                <tbody className="t-body">
                  {records.map((record) => (
                    <tr className="t-data" key={record.studentId}>
                      <td className="t-data">{record.studentId}</td>
                      <td className="t-data">{record.name}</td>
                      <td className="t-data">{record.email}</td>
                      <td className="t-data">{record.attendanceMarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeTab === "projectReview" && (
          <div className="admin-table">
            <div className="heading">
              <CiViewTable className="dash-icon" />
              <h1>Project Review Marks</h1>
            </div>
            <div className="table-section">
              <table className="t-record">
                <thead className="table-head">
                  <tr>
                    <th className="t-head">Student ID</th>
                    <th className="t-head">Name</th>
                    <th className="t-head">Email</th>
                    <th className="t-head">Project Review Marks</th>
                  </tr>
                </thead>
                <tbody className="t-body">
                  {records.map((record) => (
                    <tr className="t-data" key={record.studentId}>
                      <td className="t-data">{record.studentId}</td>
                      <td className="t-data">{record.name}</td>
                      <td className="t-data">{record.email}</td>
                      <td className="t-data">{record.projectReviewMarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeTab === "assessment" && (
          <div className="admin-table">
            <div className="heading">
              <CiViewTable className="dash-icon" />
              <h1>Assessment Marks</h1>
            </div>
            <div className="table-section">
              <table className="t-record">
                <thead className="table-head">
                  <tr>
                    <th className="t-head">Student ID</th>
                    <th className="t-head">Name</th>
                    <th className="t-head">Email</th>
                    <th className="t-head">Assessment Marks</th>
                  </tr>
                </thead>
                <tbody className="t-body">
                  {records.map((record) => (
                    <tr className="t-data" key={record.studentId}>
                      <td className="t-data">{record.studentId}</td>
                      <td className="t-data">{record.name}</td>
                      <td className="t-data">{record.email}</td>
                      <td className="t-data">{record.assessmentMarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "projectSubmission" && (
          <div className="admin-table">
            <div className="heading">
              <CiViewTable className="dash-icon" />
              <h1>Project Submission Marks</h1>
            </div>
            <div className="table-section">
              <table className="t-record">
                <thead className="table-head">
                  <tr>
                    <th className="t-head">Student ID</th>
                    <th className="t-head">Name</th>
                    <th className="t-head">Email</th>
                    <th className="t-head">Project Submission Marks</th>
                  </tr>
                </thead>
                <tbody className="t-body">
                  {records.map((record) => (
                    <tr className="t-data" key={record.studentId}>
                      <td className="t-data">{record.studentId}</td>
                      <td className="t-data">{record.name}</td>
                      <td className="t-data">{record.email}</td>
                      <td className="t-data">
                        {record.projectSubmissionMarks}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "linkedInPost" && (
          <div className="admin-table">
            <div className="heading">
              <CiViewTable className="dash-icon" />
              <h1>Linkedin Post Marks</h1>
            </div>
            <div className="table-section">
              <table className="t-record">
                <thead className="table-head">
                  <tr>
                    <th className="t-head">Student ID</th>
                    <th className="t-head">Name</th>
                    <th className="t-head">Email</th>
                    <th className="t-head">Linkedin Post Marks</th>
                  </tr>
                </thead>
                <tbody className="t-body">
                  {records.map((record) => (
                    <tr className="t-data" key={record.studentId}>
                      <td className="t-data">{record.studentId}</td>
                      <td className="t-data">{record.name}</td>
                      <td className="t-data">{record.email}</td>
                      <td className="t-data">{record.linkedInPostMarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Dashboard;
