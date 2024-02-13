import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button, Container, Row, Col, Table, Modal } from 'react-bootstrap';

const ExamManagement = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [examId, setExamId] = useState("");
    const [examName, setExamName] = useState("");
    const [examDate, setExamDate] = useState("");
    const [classId, setClassId] = useState("");
    const [subjectName, setSubjectName] = useState("");

    const classIds = ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "C11", "C12"];
    const subjectnames = ["English", "Malayalam", "Hindi", "Chemistry", "Physics", "Botony", "Zoology", "Maths", "History", "Geography", "Politics", "Economics"];

    const [formErrors, setFormErrors] = useState({
        examId: '',
        examName: '',
        examDate: '',
        classId: '',
        subjectName: ''
    });

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

    const handleEdit = (examId) => {
        handleShow();
        axios.get(`http://localhost:5225/api/Examination/GetExamByExamId/${examId}`)
            .then((result) => {
                console.log(result.data);
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
                handleClose();
                getData();
                toast.success("Exam has been updated");
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    const validateForm = () => {
        let isValid = true;
        const errors = {};

        if (!examId.trim()) {
            errors.examId = 'Exam ID is required';
            isValid = false;
        } else if (data.some(item => item.examId === examId)) {
            errors.examId = 'Exam ID already exists';
            isValid = false;
        }

        if (!examName.trim()) {
            errors.examName = 'Exam Name is required';
            isValid = false;
        }

        if (!examDate.trim()) {
            errors.examDate = 'Exam Date is required';
            isValid = false;
        }

        if (!classId.trim()) {
            errors.classId = 'Class ID is required';
            isValid = false;
        }

        if (!subjectName.trim()) {
            errors.subjectName = 'Subject Name is required';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleSave = () => {
        if (validateForm()) {
            const url = 'http://localhost:5225/api/Examination/ScheduleExam';
            const data = {
                examId: examId,
                examName: examName,
                examDate: examDate,
                classId: classId,
                subjectName: subjectName
            };

            axios.post(url, data)
                .then((result) => {
                    toast.success("Exam has been added");
                    clear();
                    getData(); // Fetch data again after adding
                })
                .catch((error) => {
                    toast.error(error);
                });
        }
    };

    const clear = () => {
        setExamId('');
        setExamName('');
        setExamDate('');
        setClassId('');
        setSubjectName('');
        setFormErrors({
            examId: '',
            examName: '',
            examDate: '',
            classId: '',
            subjectName: ''
        });
    };

    return (
        <Container>
            <ToastContainer />
            <h2 className="mt-5 mb-3">Exam Control</h2>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="examId">
                        <Form.Label>Exam ID</Form.Label>
                        <Form.Control type="text" value={examId} onChange={(e) => setExamId(e.target.value)} isInvalid={!!formErrors.examId} />
                        <Form.Control.Feedback type="invalid">{formErrors.examId}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="examName">
                        <Form.Label>Exam Name</Form.Label>
                        <Form.Control type="text" value={examName} onChange={(e) => setExamName(e.target.value)} isInvalid={!!formErrors.examName} />
                        <Form.Control.Feedback type="invalid">{formErrors.examName}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="examDate">
                        <Form.Label>Exam Date</Form.Label>
                        <Form.Control type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} isInvalid={!!formErrors.examDate} />
                        <Form.Control.Feedback type="invalid">{formErrors.examDate}</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="classId">
                        <Form.Label>Class ID</Form.Label>
                        <Form.Select value={classId} onChange={(e) => setClassId(e.target.value)} isInvalid={!!formErrors.classId}>
                            <option value="">Select Class</option>
                            {classIds.map((id) => (
                                <option key={id} value={id}>{id}</option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">{formErrors.classId}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="subjectName">
                        <Form.Label>Subject Name</Form.Label>
                        <Form.Select value={subjectName} onChange={(e) => setSubjectName(e.target.value)} isInvalid={!!formErrors.subjectName}>
                            <option value="">Select Class</option>
                            {subjectnames.map((id) => (
                                <option key={id} value={id}>{id}</option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">{formErrors.subjectName}</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Button variant="primary" onClick={handleSave}>Add Exam Details</Button>
            </Form>
            <br></br>
        <div className='pt-2'>
          <Table striped bordered hover>
          <thead>
            <tr>
                <th>Sl.No</th>
              <th>Exam Id</th>
              <th>Exam Name</th>
              <th>Exam Date</th>
              <th>Class ID</th>
              <th>Subject Name</th>
            </tr>
          </thead>
          <tbody>
            {
              data && data.length > 0 ?
              data.map((item,index)=>{
                return (
                  <tr key={index}>
                  <td>{index+1}</td>
                  <td>{item.examId}</td>
                  <td>{item.examName}</td>
                  <td>{item.examDate}</td>
                  <td>{item.classId}</td>
                  <td>{item.subjectName}</td>
                  <td colSpan={2}>
                 
                 
                    <button className='btn btn-primary'  onClick={()=>handleEdit(item.examId)} >Edit</button> &nbsp;
                    <button className='btn btn-danger' onClick={()=> handleDelete(item.examId)}  >Delete</button>
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
              <Modal.Title>Modify /Update Exam</Modal.Title>
            </Modal.Header>
            <Modal.Body>
          <Form>
                        <Form.Group className="mb-3" controlId="editExamId">
                            <Form.Label>Student Id</Form.Label>
                            <Form.Control type="text" placeholder="Enter Student Id" value={editExamId} onChange={(e) => setEditExamId(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="editExamName">
                            <Form.Label>Exam Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter First Name" value={editExamName} onChange={(e) => setEditExamName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="editExamDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" placeholder="Enter Last Name" value={editExamDate} onChange={(e) => setEditExamDate(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="editClassId">
                            <Form.Label>Class Id</Form.Label>
                            <Form.Control type="text" placeholder="Enter Roll No" value={editClassId} onChange={(e) => setEditClassId(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="editSubjectName">
                            <Form.Label>Subject Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Address" value={editSubjectName} onChange={(e) => setEditSubject(e.target.value)} />
                        </Form.Group>
                    </Form>
    
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
            {/* </Fragment> */}
        </Container>
        
    );
};

export default ExamManagement;
