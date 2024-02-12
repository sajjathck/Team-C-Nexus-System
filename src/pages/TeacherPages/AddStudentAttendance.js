import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { Form, Button,  Col, Table } from 'react-bootstrap';

export default function AttendanceList() {
  const [attendances, setAttendances] = useState([]);
  const [selectedClassName, setSelectedClassName] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get('http://localhost:5225/api/Student/GetAllStudents')
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const fetchAttendanceData = () => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    axios.get(`http://localhost:5225/api/StudAttendence/GetStudentAttendance/${selectedClassName}/${formattedDate}`)
      .then((result) => {
        console.log(result.data);
        setAttendances(result.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const updateAttendanceStatus = () => {
    Promise.all(attendances.map(attendance => {
      const updatedStatus = attendance.status ? 'Present' : 'Absent';
      return axios.put(`http://localhost:5225/api/StudAttendence/UpdateAttendanceStatus/${attendance.StudAttendenceId}`, { status: updatedStatus });
    }))
    .then(() => {
      toast.success('Attendance status updated successfully!');
      fetchAttendanceData(); // Refresh the data after updating
    })
    .catch((error) => {
      toast.error('Failed to update attendance status:', error);
    });
  };

  const handleClassNameChange = (event) => {
    setSelectedClassName(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(new Date(event.target.value));
  };

  useEffect(() => {
    if (selectedClassName && !isNaN(selectedDate)) {
      fetchAttendanceData();
    }
  }, [selectedClassName, selectedDate]);

  return (
    <div className="container mt-4">
      <ToastContainer />  
      <h1>Attendance List</h1>
      <div className="row mb-3">
        <Col>
          <Form.Select onChange={handleClassNameChange}>
            <option value="">Select class Name</option>
            {data.map((item, index) => (
              <option key={index} value={item.className}>{item.className}</option>
            ))}
          </Form.Select>
        </Col>
        <Col>
          <Button variant="primary" onClick={fetchAttendanceData}>Search</Button>
        </Col>
        <Col>
          <label htmlFor="datePicker">Date:</label>
          <input type="date" id="datePicker" value={selectedDate.toISOString().split('T')[0]} onChange={handleDateChange} />
        </Col>
      </div>
      {Array.isArray(attendances) && attendances.length >  0 ? (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Roll Number</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendances.map((attendance) => (
            <tr key={attendance.Rollno}>
              <td>{attendance.FirstName}</td>
              <td>{attendance.LastName}</td>
              <td>{attendance.Rollno}</td>
              <td>{new Date(attendance.AttendanceDate).toLocaleDateString()}</td>
              <td>
                <select
                  value={attendance.status ? 'Present' : 'Absent'}
                  onChange={(e) => {
                    const updatedAttendances = attendances.map((a) =>
                      a.Rollno === attendance.Rollno ? { ...a, status: e.target.value === 'Present' } : a
                    );
                    setAttendances(updatedAttendances);
                  }}
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
       ) : (
        <p>No attendance data available.</p>
      )}
      <Button variant="primary" className="mt-3" onClick={updateAttendanceStatus}>Update Attendance Status</Button>
    </div>
  );
}
