import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button, Container, Row, Col, Table, Modal } from 'react-bootstrap';
 
const ViewClassByTeacher = () => {
    const [show, setShow] = useState(false);
    const [selectedTeacherId, setSelectedTeacherId] = useState("");
    const [classDetails, setClassDetails] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchbyid();
    }, []);

    const getData = () => {
        axios.get('http://localhost:5225/api/ScheduleClass/GetAll')
            .then((result) => {
                setData(result.data);
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    const fetchbyid = () => {
        const teacherId=sessionStorage.getItem('id');
        axios.get(`http://localhost:5225/api/ScheduleClass/GetClassBytrId/${teacherId}`)
            .then((result) => {
                console.log(result.data);
                setClassDetails(result.data);
                getData();
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    return (
        <Container>
            <ToastContainer />
            <h2 className="mt-5 mb-3">Class By Teacher Id</h2>
            <Row className="mb-3">
                {/* <Col>
                    <Form.Select onChange={(e) => setSelectedTeacherId(e.target.value)}>
                        <option value="">Select Teacher Id</option>
                        {data.map((item, index) => (
                            <option key={index} value={item.teacherId}>{item.teacherId}</option>
                        ))}
                    </Form.Select>
                </Col> */}
                {/* <Col>
                    <Button variant="primary" onClick={handleSearch}>Search</Button>
                </Col> */}
            </Row>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Schedule Id</th>
                        <th>Class Id</th>
                        <th>Teacher Id</th>
                        <th>Subject</th>
                        <th>Session Time</th>
                    </tr>
                </thead>
                <tbody>
                    {classDetails.map((item) => (
                        <tr key={item.scheduleId}>
                            <td>{item.scheduleId}</td>
                            <td>{item.classId}</td>
                            <td>{item.teacherId}</td>
                            <td>{item.subject}</td>
                            <td>{item.sessiontime}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default ViewClassByTeacher;
