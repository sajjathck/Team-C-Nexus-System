import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button, Container, Row, Col, Table, Modal } from 'react-bootstrap';

const AdminTeacherManager=()=>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [teacherId, setTeacherId] = useState("");
    const [fName, setFirstName] = useState("");
    const [lName, setLastName] = useState("");
    const [dob, setDOB] = useState("");
    const [gender, setGender] = useState("");
    const [subjectTaught, setSubjectTaught] = useState("");

    const [formErrors, setFormErrors] = useState({
        teacherId: '',
        examName: '',
        lName: '',
        dob: '',
        gender: '',
        subjectTaught:'',
        formErrors:''
    });
    const [editTeacherId,setEditTeacherId]=useState("")
    const [editFName,setEditFirstName] = useState("")
    const [editLname,setEditLastName] = useState("")
    const [editDOB,setEditBOB] = useState("")
    const [editGender,setEditGender] = useState("")
    const [editSubjectTaught,setEditSubject] = useState("")

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get('http://localhost:5225/api/Teacher/GetAllTeacher')
            .then((result) => {
                setData(result.data);
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    const handleEdit = (teacherId) => {
        handleShow();
        axios.get(`http://localhost:5225/api/Teacher/GetTeachersById/${teacherId}`)
            .then((result) => {
                console.log(result.data);
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    const handleDelete = (teacherId) => {
        if (window.confirm("Are you sure to delete this Teacher?")) {
            axios.delete(`http://localhost:5225/api/Teacher/Delete/${teacherId}`)
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
        const url = 'http://localhost:5225/api/Teacher/EditTeacher';
        const data = {
            "teacherId": editTeacherId,
            "fName": editFName,
            "lName": editLname,
            "dob": editDOB,
            "gender": editGender,
            "subjectTaught": editSubjectTaught
        };

        axios.put(url, data)
            .then((result) => {
                handleClose();
                getData();
                toast.success("Teacher has been updated");
            })
            .catch((error) => {
                toast.error(error);
            });
    };
    const validateForm = () => {
        let isValid = true;
        const errors = {};

        if (!teacherId.trim()) {
            errors.teacherId = 'Teacher ID is required';
            isValid = false;
        } else if (data.some(item => item.teacherId === teacherId)) {
            errors.teacherId = 'Teacher ID already exists';
            isValid = false;
        }

        if (!fName.trim()) {
            errors.fName = 'First Name is required';
            isValid = false;
        }

        if (!lName.trim()) {
            errors.lName = 'Last Name is required';
            isValid = false;
        }

        if (!dob.trim()) {
            errors.dob = 'DOB is required';
            isValid = false;
        }

        if (!gender.trim()) {
            errors.gender = 'Gender is required';
            isValid = false;
        }
        if (!subjectTaught.trim()) {
            errors.subjectTaught = 'Subject Taught is required';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };


    const handleSave = () => {
        if (validateForm()) {
        const url = 'http://localhost:5225/api/Teacher/AddTeacher';
        const data = {
            "teacherId": teacherId,
            "fName": fName,
            "lName": lName,
            "dob": dob,
            "gender": gender,
            "subjectTaught": subjectTaught
        };

        axios.post(url, data)
            .then((result) => {
                toast.success("Teacher has been added");
                    clear();
                    getData(); // Fetch data again after adding
            })
            .catch((error) => {
                toast.error(error);
            });
        }
    };

    const clear = () => {
        setTeacherId('');
        setFirstName('');
        setLastName("");
        setDOB('');
        setGender('');
        setSubjectTaught('');
        setFormErrors({
            teacherId: '',
            fName:'',
            lName: '',
            dob: '',
            gender: '',
            subjectTaught:'',
            formErrors:''
        })    
    }
        return (
            <Container>
            <ToastContainer />
            <h2 className="mt-5 mb-3">Teacher Control</h2>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="teacherId">
                        <Form.Label>Teacher ID</Form.Label>
                        <Form.Control type="text" value={teacherId} onChange={(e) => setTeacherId(e.target.value)} isInvalid={!!formErrors.teacherId} />
                        <Form.Control.Feedback type="invalid">{formErrors.teacherId}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="lName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" value={fName} onChange={(e) => setFirstName(e.target.value)} isInvalid={!!formErrors.fName} />
                        <Form.Control.Feedback type="invalid">{formErrors.fName}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="examDate">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" value={lName} onChange={(e) => setLastName(e.target.value)} isInvalid={!!formErrors.lName} />
                        <Form.Control.Feedback type="invalid">{formErrors.lName}</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="dob">
                        <Form.Label>DOB</Form.Label>
                        <Form.Control type="date" value={dob} onChange={(e) => setDOB(e.target.value)} isInvalid={!!formErrors.dob} />
                        <Form.Control.Feedback type="invalid">{formErrors.dob}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="gender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control type="text" value={gender} onChange={(e) => setGender(e.target.value)} isInvalid={!!formErrors.gender} />
                        <Form.Control.Feedback type="invalid">{formErrors.gender}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="subjectTaught">
                        <Form.Label>Subject Taught</Form.Label>
                        <Form.Control type="text" value={subjectTaught} onChange={(e) => setSubjectTaught(e.target.value)} isInvalid={!!formErrors.subjectTaught} />
                        <Form.Control.Feedback type="invalid">{formErrors.subjectTaught}</Form.Control.Feedback>
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
                                <th>Teacher Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>DOB</th>
                                <th>Gender</th>
                                <th>Subject Taught</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data && data.length > 0 ?
                                    data.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.teacherId}</td>
                                                <td>{item.fName}</td>
                                                <td>{item.lName}</td>
                                                <td>{item.dob}</td>
                                                <td>{item.gender}</td>
                                                <td>{item.subjectTaught}</td>
                                                <td colSpan={2}>
                
                
                    <button className='btn btn-primary'  onClick={()=>handleEdit(item.teacherId)} >Edit</button> &nbsp;
                    <button className='btn btn-danger' onClick={()=> handleDelete(item.teacherId)}  >Delete</button>
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
            <Modal.Title>Modify /Update Teacher</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Row>
            <Col>
            <input type="text" className='form-control' placeholder='Enter Teacher Id'
            value={editTeacherId} onChange={(e)=> setEditTeacherId(e.target.value)} />
            </Col>
            <Col>
            <input type="text" className='form-control' placeholder='Enter First Name'
            value={editFName} onChange={(e)=> setEditFirstName(e.target.value)} />
            </Col>
            </Row>
            <Row className='pt-2'>
            <Col>
            <input type="text" className='form-control' placeholder='Enter Last Name'
            value={editLname} onChange={(e)=> setEditLastName(e.target.value)} />
            </Col>
            <Col>
            <input type="text" className='form-control' placeholder='Enter DOB'
            value={editDOB} onChange={(e)=> setEditBOB(e.target.value)} />
            </Col>
            <Col>
            <input type="text" className='form-control' placeholder='Enter Gender'
            value={editGender} onChange={(e)=> setEditGender(e.target.value)} />
            </Col>
            <Col>
            <input type="text" className='form-control' placeholder='Enter Subject Name'
            value={editSubjectTaught} onChange={(e)=> setEditSubject(e.target.value)} />
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
export default AdminTeacherManager