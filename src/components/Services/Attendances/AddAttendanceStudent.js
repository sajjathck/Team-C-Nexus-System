import React, { useState, useEffect } from 'react';
import axios from 'axios';
 
const AddAttendanceStudent = () => {
  const [standards] = useState(['first','second','third','fourth','fifth','sixth','seventh','eigth','nineth','tenth','+1','+2']); // Array of standards from 1 to 10
  const [sections] = useState(['A', 'B']); // Array of sections A to D
  const [selectedStandard, setSelectedStandard] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [students, setStudents] = useState([]);

  const [attendance, setAttendance] = useState([]);
  const [message, setMessage] = useState('');
 
  useEffect(() => {
    fetchStudents();
  }, []);
 
  const fetchStudents = async () => {
    try {
      const response = await axios.get(`http://localhost:5225/api/Student/GetAllStudentsByClassandSec/${selectedStandard}/${selectedSection}`);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };
 
  const handleStandardChange = (event) => {
    setSelectedStandard(event.target.value);
  };
 
  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
  };
 
  useEffect(() => {
    if (selectedStandard && selectedSection) {
      fetchStudents();
    }
  }, [selectedStandard, selectedSection]);
 
  const handleCheckboxChange = (event, studentId, status) => {
    setAttendance(prevAttendance => {
      return [
        ...prevAttendance.filter(item => item.studentId !== studentId),
        { studentId, status },
      ];
    });
  };
 
  const handleSubmit = async (event) => {
    event.preventDefault();
 
    try {
      for (const { studentId, status } of attendance) {
        await axios.post('http://localhost:5225/api/StudAttendence/AddStudentAttendence', { studentId, status }, {
          headers: { 'Content-Type': 'application/json' }
        });
      }
 
      setMessage('Attendance submitted successfully');
      setAttendance([]);
      // Clear message after 5 seconds
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error submitting attendance:', error);
      setMessage('An error occurred while submitting attendance');
      // Clear message after 5 seconds
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  };
 
  return (
    <div className="container mt-5">
      <h2>Add Student Attendance</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="standardSelect" className="form-label">Select Standard:</label>
          <select className="form-select" id="standardSelect" onChange={handleStandardChange} value={selectedStandard}>
            <option value="">Select Standard</option>
            {standards.map((className, index) => (
              <option key={index} value={className}>{className}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="sectionSelect" className="form-label">Select Section:</label>
          <select className="form-select" id="sectionSelect" onChange={handleSectionChange} value={selectedSection}>
            <option value="">Select Section</option>
            {sections.map((section, index) => (
              <option key={index} value={section}>{section}</option>
            ))}
          </select>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.studentId}>
                <td>{student.studentId}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>
                  <div className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`student_${student.studentId}_present`}
                      name={`student_${student.studentId}_present`}
                      checked={attendance.some(item => item.studentId === student.studentId && item.status === 'P')}
                      onChange={event => handleCheckboxChange(event, student.studentId, 'P')}
                    />
                    <label className="form-check-label" htmlFor={`student_${student.studentId}_present`}>
                      Present
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`student_${student.studentId}_absent`}
                      name={`student_${student.studentId}_absent`}
                      checked={attendance.some(item => item.studentId === student.studentId && item.status === 'A')}
                      onChange={event => handleCheckboxChange(event, student.studentId, 'A')}
                    />
                    <label className="form-check-label" htmlFor={`student_${student.studentId}_absent`}>
                      Absent
                    </label>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {message && (
          <div className="mt-3">
         {message && <div className="alert alert-info">{message}</div>}
          </div>
        )}
        <div className="mt-3">
          <button type="submit" className="btn btn-primary">Submit Attendance</button>
        </div>
      </form>
    </div>
  );
};
 
export default AddAttendanceStudent;