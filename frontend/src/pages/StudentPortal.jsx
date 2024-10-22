import React, { useContext, useState } from "react";
import axios from "axios";
import { FILE_API_END_POINT } from "@/utils/constant";
import { UserContext } from "@/store/user-store";
import "./studentportal.css";
const StudentPortal = () => {
  const [studentId, setStudentId] = useState("");
  const [results, setResults] = useState(null);

  const handleSearch = async () => {
    try {
      const { data } = await axios.get(
        `${FILE_API_END_POINT}/results/${studentId}`
      );
      setStudentId("");
      setResults(data);
    } catch (error) {
      alert("Error retrieving results.");
    }
  };

  return (
    <div className="student-section">
      <h1>Student Portal</h1>
      <div className="search-bar">
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
      </div>
      {results && (
        <div className="result-section">
          <h2 className="rlt-heading">
            <span className="">Result</span>
          </h2>
          <div className="item-gap">
            <h2>
              <span className="r-head">Id: </span>
              {results.studentId}
            </h2>

            <h2>
              <span className="r-head">Name: </span>
              {results.name}
            </h2>
            <h2>
              <span className="r-head">Attendance Marks:</span>{" "}
              {results.attendanceMarks}
            </h2>
            <h2>
              <span className="r-head">Project Review Marks: </span>
              {results.projectReviewMarks}
            </h2>
            <h2>
              <span className="r-head">Assessment Marks: </span>
              {results.assessmentMarks}
            </h2>
            <h2>
              <span className="r-head">Project Submission Marks:</span>{" "}
              {results.projectSubmissionMarks}
            </h2>
            <h2>
              <span className="r-head">LinkedIn Post Marks: </span>
              {results.linkedInPostMarks}
            </h2>
          </div>
          <h2 className="total">Total Marks: {results.totalMarks}</h2>
        </div>
      )}
    </div>
  );
};

export default StudentPortal;
