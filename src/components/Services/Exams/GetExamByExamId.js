import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button, Container, Row, Col, Table, Modal } from 'react-bootstrap';

const GetExamByExamId = () => {
    const [show, setShow] = useState(false);
    const [selectedExamId, setSelectedExamId] = useState("");
    const [examDetails, setExamDetails] = useState({});
    const [editExamId, setEditExamId] = useState("");
    const [editExamName, setEditExamName] = useState("");
    const [editExamDate, setEditExamDate] = useState("");
    const [editClassId, setEditClassId] = useState("");
    const [editSubjectName, setEditSubject] = useState("");
    const [data, setData] = useState([]);
    
    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get('http://localhost:5225/api/Examination/GetAllExam')
            .then((result) => {
                setData(result.data);
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    const handleSearch = () => {
        axios.get(`http://localhost:5225/api/Examination/GetExamByExamId/${selectedExamId}`)
            .then((result) => {
                setExamDetails(result.data);
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    const handleDelete = (examId) => {
        if (window.confirm("Are you sure to delete this exam?")) {
            axios.delete(`http://localhost:5225/api/Examination/DeleteExam/${examId}`)
                .then((result) => {
                    if (result.status === 200) {
                        toast.success("Deleted successfully");
                        getData();
                        setExamDetails({});
                    }
                })
                .catch((error) => {
                    toast.error(error);
                });
        }
    };

    const handleUpdate = () => {
        const url = 'http://localhost:5225/api/Examination/EditExamination';
        const data = {
            "examId": editExamId,
            "examName": editExamName,
            "examDate": editExamDate,
            "classId": editClassId,
            "subjectName": editSubjectName
        };

        axios.put(url, data)
            .then((result) => {
                // handleClose();
                getData();
                setExamDetails({});
                toast.success("Exam has been updated");
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    return (
        <Container>
            <ToastContainer />
            <h2 className="mt-5 mb-3">Exam Control</h2>
            <Row className="mb-3">
                <Col>
                    <Form.Select onChange={(e) => setSelectedExamId(e.target.value)}>
                        <option value="">Select Exam ID</option>
                        {data.map((item, index) => (
                            <option key={index} value={item.examId}>{item.examId}</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col>
                    <Button variant="primary" onClick={handleSearch}>Search</Button>
                </Col>
            </Row>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Exam Id</th>
                        <th>Exam Name</th>
                        <th>Exam Date</th>
                        <th>Class ID</th>
                        <th>Subject Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{examDetails.examId}</td>
                        <td>{examDetails.examName}</td>
                        <td>{examDetails.examDate}</td>
                        <td>{examDetails.classId}</td>
                        <td>{examDetails.subjectName}</td>
                        <td>
                            <Button variant="primary" onClick={() => setShow(true)}>Edit</Button>
                            <Button variant="danger" onClick={() => handleDelete(examDetails.examId)}>Delete</Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modify / Update Exam</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="editExamName">
                            <Form.Label>Exam Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Exam Name" value={editExamName} onChange={(e) => setEditExamName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="editExamDate">
                            <Form.Label>Exam Date</Form.Label>
                            <Form.Control type="date" value={editExamDate} onChange={(e) => setEditExamDate(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="editClassId">
                            <Form.Label>Class ID</Form.Label>
                            <Form.Control type="text" placeholder="Enter Class ID" value={editClassId} onChange={(e) => setEditClassId(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="editSubjectName">
                            <Form.Label>Subject Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Subject Name" value={editSubjectName} onChange={(e) => setEditSubject(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                    <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default GetExamByExamId;