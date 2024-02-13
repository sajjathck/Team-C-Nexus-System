import React, { useState, useEffect } from 'react';
import axios from 'axios';
 
const RecordTeacherAttendance = () => {
  const [teachers, setTeachers] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [message, setMessage] = useState('');
 
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:5225/api/Teacher/GetAllTeacher');
        setTeachers(response.data);
        
        // Initialize attendance state with all teachers marked as absent
        setAttendance(response.data.map(teacher => ({ teacherId: teacher.teacherId, status: 'A' })));
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };
 
    fetchTeachers();
  }, []);
 
  const handleCheckboxChange = (teacherId, status) => {
    // Update the attendance state based on the checkbox status
    setAttendance(prevAttendance => {
      return prevAttendance.map(item => {
        if (item.teacherId === teacherId) {
          return { ...item, status };
        } else {
          return item;
        }
      });
    });
  };
 
  const handleSubmit = async (event) => {
    event.preventDefault();
 
    // Retrieve the date of the last attendance submission from local storage
    const lastSubmissionDate = localStorage.getItem('lastAttendanceSubmissionDate');
    const currentDate = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD
 
    // Check if the attendance for the current day has already been submitted
    if (lastSubmissionDate !== currentDate) {
      try {
        // Send individual requests for each attendance item
        for (const { teacherId, status } of attendance) {
            console.log(teacherId,status);
          await axios.post('http://localhost:5225/api/TeachAttendence/AddTeachAttendence', { teacherId, status }, {
            headers: { 'Content-Type': 'application/json' }
          });
        }
 
        // After successful submission, store the current date in local storage
        localStorage.setItem('lastAttendanceSubmissionDate', currentDate);
       
        setMessage('Attendance submitted successfully');
        // Reset the attendance state after submission
        setAttendance([]);
      } catch (error) {
        console.error('Error submitting attendance:', error);
        setMessage('An error occurred while submitting attendance');
      }
    } else {
      setMessage('Attendance has already been submitted for today.');
    }
  };
 
  return (
    <div className="container mt-5">
      <h2>Add Teacher Attendance</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <table className="table">
          <thead>
            <tr>
              <th>Teacher ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              teacher.teacherId != null && (
                <tr key={teacher.teacherId}>
                  <td>{teacher.teacherId}</td>
                  <td>{teacher.fName}</td>
                  <td>{teacher.lName}</td>
                  <td>
                    <div className="form-check form-check-inline">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`teacher_${teacher.teacherId}_P`}
                        checked={attendance.some(item => item.teacherId === teacher.teacherId && item.status === 'P')}
                        onChange={(event) => handleCheckboxChange(teacher.teacherId, 'P')}
                      />
                      <label className="form-check-label" htmlFor={`teacher_${teacher.teacherId}_P`}>
                        Present
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`teacher_${teacher.teacherId}_A`}
                        checked={attendance.some(item => item.teacherId === teacher.teacherId && item.status === 'A')}
                        onChange={(event) => handleCheckboxChange(teacher.teacherId, 'A')}
                      />
                      <label className="form-check-label" htmlFor={`teacher_${teacher.teacherId}_A`}>
                        Absent
                      </label>
                    </div>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
        <div className="mt-3">
          <button type="submit" className="btn btn-primary">Submit Attendance</button>
        </div>
      </form>
    </div>
  );
};
 
export default RecordTeacherAttendance;