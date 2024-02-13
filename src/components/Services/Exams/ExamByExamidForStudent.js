import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button, Container, Row, Col, Table, Modal } from 'react-bootstrap';

const ExamByExamidForStudent = () => {
    const [show, setShow] = useState(false);
    const [selectedExamId, setSelectedExamId] = useState("");
    const [selectedStudentId, setSelectedStudentId] = useState("");
    const [selectedClassName, setSelectedClassName] = useState("");
    const [students, setStudents] = useState([]);
    const [studentMarks, setStudentMarks] = useState([]);
    const [examDetails, setExamDetails] = useState([]);
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

    const handleExamIdChange = (examId) => {
        setSelectedExamId(examId);
        axios.get(`http://localhost:5225/api/Examination/GetAllResultByExamId/${examId}`)
            .then((result) => {
                const uniqueStudents = Array.from(new Set(result.data.map(item => item.studentId)));
                setStudents(uniqueStudents);
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    const handleSearch = async () => {
        try {
            const studentId = sessionStorage.getItem("id");
            // Fetch exam details
            const examResponse = await axios.get(`http://localhost:5225/api/Examination/GetExamByExamId/${selectedExamId}`);
            const examDetails = examResponse.data;

            // Fetch student details
            const studentResponse = await axios.get(`http://localhost:5225/api/Student/GetStudentById/${studentId}`);
            const studentDetails = studentResponse.data;

            // Fetch student marks
            const marksResponse = await axios.get(`http://localhost:5225/api/Examination/GetAllResultByStudIdAndExamId/${studentId}/${selectedExamId}`);
            const studentMarks = marksResponse.data;

            // Combine exam, student, and marks details
            const combinedDetails = studentMarks.map(mark => ({
                ...examDetails,
                ...studentDetails,
                markId: mark.markId,
                marks: mark.marks,
                subjectName: mark.subjectName
            }));

            setExamDetails(combinedDetails);
        } catch (error) {
            toast.error(error);
        }
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
            <h2 className="mt-5 mb-3">Get ExamBy ExamId</h2>
            <Row className="mb-3">
                <Col>
                    <Form.Select onChange={(e) => handleExamIdChange(e.target.value)}>
                        <option value="">Select Exam ID</option>
                        {data.map((item, index) => (
                            <option key={index} value={item.examId}>{item.examId}</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col>
                    {/* <Form.Select onChange={(e) => setSelectedStudentId(e.target.value)}>
                        <option value="">Select student ID</option>
                        {students.map((studentId, index) => (
                            <option key={index} value={studentId}>{studentId}</option>
                        ))}
                    </Form.Select> */}
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
                        <th>Subject Name</th>
                        <th>Student Name</th>
                        {/* <th>Last Name</th> */}
                        <th>Marks</th>
                        {/* <th>Actions</th> */}
                    </tr>
                </thead>
                <tbody>
                    {examDetails.map((detail) => (
                        <tr key={detail.markId}>
                            <td>{detail.examId}</td>
                            <td>{detail.examName}</td>
                            <td>{detail.subjectName}</td>
                            <td>{detail.firstName + ' ' + detail.lastName}</td> {/* Concatenated first and last name */}
                            <td>{detail.marks}</td>
                            {/* <td>
                                <Button variant="primary" onClick={() => setShow(true)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(detail.examId)}>Delete</Button>
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </Table>
            {/* <Modal show={show} onHide={() => setShow(false)}>
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
            </Modal> */}
        </Container>
    );
};

export default ExamByExamidForStudent;

