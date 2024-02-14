
import React, { useState, useEffect } from 'react';
import axios from "axios";

const TeacherReportGenerate = () => {
  const [percentage, setPercentage] = useState("");
  const [totalPresentDays, setTotalPresentDays] = useState("");
  const [totalAbsentDays, setTotalAbsentDays] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [totalWorkingDays, setTotalWorkingDays] = useState("");
  const [date, setDate] = useState("");
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    // Fetch the list of teachers when the component mounts
    axios
      .get(`http://localhost:5225/api/Teacher/GetAllTeacher`)
      .then((response) => {
        setTeachers(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const searchReport = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:5225/api/TeachAttendence/AttendenceReport/${date}/${teacherId}`)
      .then((response) => {
        console.log(response.data);
        setTotalWorkingDays(response.data.totalWorkingDays);
        setTotalAbsentDays(response.data.totalAbsentDays);
        setTotalPresentDays(response.data.totalPresentDays);
        setPercentage(response.data.percentage);
      })
      .catch((error) => console.log(error));
  };

  return (
<div className='container mt-5'>
    <h1 className="mb-4">Attendance Report</h1>
    <form>
        <div className="form-group">
            <label htmlFor="teacherId">Select Teacher ID</label>
            <select
                className="form-control"
                id="teacherId"
                value={teacherId}
                onChange={(e) => setTeacherId(e.target.value)}
                required
            >
              <br />
                <option value="">Select Teacher ID</option>
                {teachers.map((teacher) => (
                    <option key={teacher.teacherId} value={teacher.teacherId}>{teacher.teacherId}</option>
                ))}
            </select>
        </div>
        <br />

        <div className="form-group">
            <label htmlFor="date">Enter Date</label>
            <input
                type="month"
                className="form-control"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
        </div>
        <br />
        <button type="submit" onClick={searchReport} className="btn btn-primary">Generate Report</button>
    </form>
    <div className="card mt-4">
        <div className="card-header">
            Attendance Details
        </div>
        <ul className="list-group list-group-flush">
            <li className="list-group-item">Month: {date}</li>
            <li className="list-group-item">Working Days: {totalWorkingDays}</li>
            <li className="list-group-item">Days Present: {totalPresentDays}</li>
            <li className="list-group-item">Days Absent: {totalAbsentDays}</li>
            <li className="list-group-item">Percentage: {percentage}</li>
        </ul>
    </div>
</div>

  );
};

export default TeacherReportGenerate;



