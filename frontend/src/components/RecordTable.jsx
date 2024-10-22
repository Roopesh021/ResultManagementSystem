const RecordTable = ({ records }) => {
  return (
    <>
      <div>
        <h2>Attendance Marks</h2>
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              {/* <th>Name</th> */}
              <th>Attendance Marks</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.studentId}>
                <td>{record.studentId}</td>
                <td>{record.attendanceMarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default RecordTable;
