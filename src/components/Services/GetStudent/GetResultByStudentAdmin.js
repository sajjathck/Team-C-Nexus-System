import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { Form, Button, Container, Row, Col, Table, Modal } from 'react-bootstrap';

export default function GetResultByStudentAdmin() {
  const [studentDetails, setStudentDetails] = useState({ stdDisplay: [], percentage: '', totalMarks: '' });
  const [selectedStudentId, setselectedStudentId] = useState("");
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

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5225/api/Examination/GetResultStudentby/${selectedStudentId}`);
        setStudentDetails(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

  return (
    <Container>
      <ToastContainer />
            <h2 className="mt-5 mb-3">Result By StudentId</h2>
            <Row className="mb-3">
                <Col>
                    <Form.Select onChange={(e) => setselectedStudentId(e.target.value)}>
                        <option value="">Select Student ID</option>
                        {data.map((item, index) => (
                            <option key={index} value={item.studentId}>{item.studentId}</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col>
                    <Button variant="primary" onClick={fetchData}>Search</Button>
                </Col>
            </Row>
          <div className="card shadow">
      <div className="card-header bg-primary text-white">
        <h3 className="card-title">Progress Card</h3>
      </div>
      <div className="card-body">
        <h4 className="card-subtitle mb-2 text-muted">Student Name: {studentDetails.stdDisplay[0]?.studentName}</h4>
        <h4 className="card-subtitle mb-2 text-muted">Class: {studentDetails.stdDisplay[0]?.className}</h4>
        <h4 className="card-subtitle mb-2 text-muted">Section: {studentDetails.stdDisplay[0]?.section}</h4>
        <hr />
        <h5 className="card-text"> Marks Obtained: {studentDetails.totalMarks}</h5>
        <h5 className="card-text"> Total Marks: {studentDetails.stdDisplay.length*100}</h5>
        <h5 className="card-text">Overall Percentage: {parseFloat(studentDetails.percentage).toFixed(2)}%</h5>
        <hr />
        <h5 className="card-text">Subjects:</h5>
        <ul className="list-group list-group-flush">
          {studentDetails.stdDisplay.map((item, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              {item.subject}: {item.result} ({item.mark})
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Container>
  );
}
