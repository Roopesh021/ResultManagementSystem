import { UserContext } from "@/store/user-store";
import { useContext } from "react";

const AdminSearch = () => {
  const { results } = useContext(UserContext);
  return (
    <>
      <div className="result">
        {results && (
          <div className="result-section admin-r">
            <h2 className="rlt-heading">
              <span className="">Details</span>
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
    </>
  );
};
export default AdminSearch;
