import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button, Container, Row, Col, Table, Modal } from 'react-bootstrap';

const MarksManager=()=>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [markId, setMarkId] = useState("");
    const [studentId, setStudentId] = useState("");
    const [examId, setExamId] = useState("");
    const [marks, setMarks] = useState("");
    const [subjectName, setSubjectName] = useState("");
    

    const [formErrors, setFormErrors] = useState({
        markId: '',
        studentId: '',
        examId: '',
        marks: '',
        subjectName:''
    });
    const [editmarkId,setEditMarkId]=useState("")
    const [editstudentId,setEditStudentId] = useState("")
    const [editexamId,setEditExamId] = useState("")
    const [editmarks,setEditMarks] = useState("")
    const [editsubjectName,setEditSubjectName] = useState("")
    

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get('http://localhost:5225/api/Examination/GetAllResult')
            .then((result) => {
                setData(result.data);
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    const handleEdit = (markId) => {
        handleShow();
        axios.get(`http://localhost:5225/api/Examination/GetMarkByMarkId/${markId}`)
            .then((result) => {
                console.log(result.data);
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    const handleDelete = (markId) => {
        if (window.confirm("Are you sure to delete this Teacher?")) {
            axios.delete(`http://localhost:5225/api/Examination/DeleteResult/${markId}`)
                .then((result) => {
                    if (result.status === 200) {
                        toast.success("Deleted successfully");
                        getData();
                    }
                })
                .catch((error) => {
                    toast.error(error);
                });
        }
    };

    const handleUpdate = () => {
        const url = 'http://localhost:5225/api/Examination/UpdateResult';
        const data = {
            "markId": editmarkId,
            "studentId": editstudentId,
            "examId": editexamId,
            "marks": editmarks,
            "subjectname":editsubjectName
        };

        axios.put(url, data)
            .then((result) => {
                handleClose();
                getData();
                toast.success("Mark has been updated");
            })
            .catch((error) => {
                toast.error(error);
            });
    };
    const validateForm = () => {
        let isValid = true;
        const errors = {};

        if (!markId.trim()) {
            errors.markId = 'Mark ID is required';
            isValid = false;
        } else if (data.some(item => item.markId === markId)) {
            errors.markId = 'Mark ID already exists';
            isValid = false;
        }

        if (!studentId.trim()) {
            errors.studentId = 'Student Id is required';
            isValid = false;
        }

        if (!examId.trim()) {
            errors.examId = 'Exam Id is required';
            isValid = false;
        }

        if (!marks.trim()) {
            errors.marks = 'Mark is required';
            isValid = false;
        }
        setFormErrors(errors);
        return isValid;
    };

    const handleSave = () => {
        if (validateForm()) {
        const url = 'http://localhost:5225/api/Examination/RecordResult';
        const data = {
            "markId": markId,
            "studentId": studentId,
            "examId": examId,
            "marks": marks,
            "subjectName":subjectName
        };

        axios.post(url, data)
            .then((result) => {
                toast.success("Mark has been added");
                    clear();
                    getData(); // Fetch data again after adding
            })
            .catch((error) => {
                toast.error(error);
            });
        }
    };

    const clear = () => {
        setMarkId('');
        setStudentId('');
        setExamId("");
        setMarks('');
        setSubjectName('');


        setFormErrors({
            markId: '',
            studentId:'',
            examId: '',
            marks: '',
            subjectName:'',
            formErrors:''
        })    
    }
        return (
            <Container>
            <ToastContainer />
            <h2 className="mt-5 mb-3">Mark Control</h2>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="markId">
                        <Form.Label>Mark ID</Form.Label>
                        <Form.Control type="text" value={markId} onChange={(e) => setMarkId(e.target.value)} isInvalid={!!formErrors.markId} />
                        <Form.Control.Feedback type="invalid">{formErrors.markId}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="studentId">
                        <Form.Label>Student Id</Form.Label>
                        <Form.Control type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} isInvalid={!!formErrors.studentId} />
                        <Form.Control.Feedback type="invalid">{formErrors.studentId}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="examId">
                        <Form.Label>Exam Id</Form.Label>
                        <Form.Control type="text" value={examId} onChange={(e) => setExamId(e.target.value)} isInvalid={!!formErrors.examId} />
                        <Form.Control.Feedback type="invalid">{formErrors.examId}</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="marks">
                        <Form.Label>Mark</Form.Label>
                        <Form.Control type="text" value={marks} onChange={(e) => setMarks(e.target.value)} isInvalid={!!formErrors.marks} />
                        <Form.Control.Feedback type="invalid">{formErrors.marks}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="subjectName">
                        <Form.Label>Subject</Form.Label>
                        <Form.Control type="text" value={subjectName} onChange={(e) => setSubjectName(e.target.value)} isInvalid={!!formErrors.subjectName} />
                        <Form.Control.Feedback type="invalid">{formErrors.subjectName}</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Button variant="primary" onClick={handleSave}>Add Mark Details</Button>
            </Form>
            <br></br>
                <div className='pt-2'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <td>Sl No</td>
                                <th>Mark Id</th>
                                <th>Student Id</th>
                                <th>Exam Id</th>
                                <th>Mark </th>
                                <th>Subject</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data && data.length > 0 ?
                                    data.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.markId}</td>
                                                <td>{item.studentId}</td>
                                                <td>{item.examId}</td>
                                                <td>{item.marks}</td>
                                                <td>{item.subjectName}</td>
                                                <td colSpan={2}>
                
                
                    <button className='btn btn-primary'  onClick={()=>handleEdit(item.markId)} >Edit</button> &nbsp;
                    <button className='btn btn-danger' onClick={()=> handleDelete(item.markId)}  >Delete</button>
                </td>
                </tr>
                )
            })
            :
            'Loading.......'
            }
        
        </tbody>
        </Table>
        </div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Modify /Update Mark</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Row>
            <Col>
            <input type="text" className='form-control' placeholder='Enter Mark Id'
            value={editmarkId} onChange={(e)=> setEditMarkId(e.target.value)} />
            </Col>
            <Col>
            <input type="text" className='form-control' placeholder='Enter Student Id'
            value={editstudentId} onChange={(e)=> setEditStudentId(e.target.value)} />
            </Col>
            </Row>
            <Row className='pt-2'>
            <Col>
            <input type="text" className='form-control' placeholder='Enter Exam Id'
            value={editexamId} onChange={(e)=> setEditExamId(e.target.value)} />
            </Col>
            <Col>
            <input type="text" className='form-control' placeholder='Enter Mark '
            value={editmarks} onChange={(e)=> setEditMarks(e.target.value)} />
            </Col>
            <Col>
            <input type="text" className='form-control' placeholder='Enter Subject '
            value={editsubjectName} onChange={(e)=> setEditSubjectName(e.target.value)} />
            </Col>
        </Row>
        
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        </Container>
        )
    }
export default MarksManager