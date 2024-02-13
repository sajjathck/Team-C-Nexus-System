import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const ViewAttendance = () => {
  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await axios.get('http://localhost:5225/api/StudAttendence/GetAllAttendance');
      setAttendances(response.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>View Student Attendance</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Attendance Status</th>
          </tr>
        </thead>
        <tbody>
          {attendances.map(attendance => (
            <tr key={attendance.studentId}>
              <td>{attendance.studentId}</td>
              <td>{attendance.firstName}</td>
              <td>{attendance.lastName}</td>
              <td>{attendance.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ViewAttendance;
