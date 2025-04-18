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

const AddMarks = () => {
  const [activeTab, setActiveTab] = useState("attendance");
  const [records, setRecords] = useState([]);

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

  return (
    <>
      <div>
        <div className="a-head">
          <BiTachometer className="dash-icon" />
          <h1>AddMarks</h1>
        </div>

        <div className="a-content">
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
      </div>
    </>
  );
};
export default AddMarks;
