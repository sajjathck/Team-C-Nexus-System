import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button, Container, Row, Col, Table, Modal } from 'react-bootstrap';
import subjectnames from "./subjetc_list";
import sessions from "./session_list";



const ScheduleClassManagement=()=>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [scheduleId, setScheduleId] = useState("");
    const [classId, setClassid] = useState("");
    const [teacherId, setTeacherId] = useState("");
    const [teachername, setTeacherName] = useState("");
    const [subject, setSubject] = useState("");
    const [sessiontime, setSession] = useState("");
    // const subjectnames = ["English", "Malayalam", "Hindi", "Chemistry", "Physics", "Botony", "Zoology", "Maths", "History", "Geography", "Politics", "Economics"];
    // const sessions=["9:00-10:00","10:00-11:00","11:05-12:05","12:05-01:05","01:35-02:35","02:35-03:35","03:35-04:35"]
    

    const [formErrors, setFormErrors] = useState({
        scheduleId: '',
        classId: '',
        teacherId: '',
        teachername:'',
        subject: '',
        sessiontime:''
    });
    const [editscheduleId,setEditScheduleId]=useState("")
    const [editclassId,setEditClassid] = useState("")
    const [editteacherId,setEditTeacherId] = useState("")
    const [editteacherName,setEditTeacherName] = useState("")
    const [editsubject,setEditSubject] = useState("")
    const [editsessiontime,setEditSession] = useState("")
    

    const [data, setData] = useState([]);
    const [classdata, setClassData] = useState([]);
    const [teacherdata, setTeacherData] = useState([]);
    useEffect(() => {
        getData();
        getClassData();
        getTeacherData();
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
    const getClassData = () => {
        axios.get('http://localhost:5225/api/Class/GetAllClass')
            .then((result) => {
                setClassData(result.data);
            })
            .catch((error) => {
                toast.error(error);
            });
    };
    const getTeacherData = () => {
        axios.get('http://localhost:5225/api/Teacher/GetAllTeacher')
            .then((result) => {
                setTeacherData(result.data);
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    const handleEdit = (scheduleId) => {
        handleShow();
        axios.get(`http://localhost:5225/api/ScheduleClass/GetClassByClassId/${scheduleId}`)
            .then((result) => {
                console.log(result.data);
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    const handleDelete = (scheduleId) => {
        if (window.confirm("Are you sure to delete this Teacher?")) {
            axios.delete(`http://localhost:5225/api/ScheduleClass/deleteClassSchedule/${scheduleId}`)
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
        const url = 'http://localhost:5225/api/ScheduleClass/UpdateClass';
        const data = {
            "scheduleId": editscheduleId,
            "classId": editclassId,
            "teacherId": editteacherId,
            "teachername":editteacherName,
            "subject": editsubject,
            "sessiontime":editsessiontime
        };

        axios.put(url, data)
            .then((result) => {
                handleClose();
                getData();
                toast.success("Class Schedule has been updated");
            })
            .catch((error) => {
                toast.error(error);
            });
    };
    const validateForm = () => {
        let isValid = true;
        const errors = {};

        if (!scheduleId.trim()) {
            errors.scheduleId = 'Schedule ID is required';
            isValid = false;
        } else if (data.some(item => item.scheduleId === scheduleId)) {
            errors.scheduleId = 'Schedule ID already exists';
            isValid = false;
        }

        if (!classId.trim()) {
            errors.classId = 'Class Id is required';
            isValid = false;
        }

        if (!teacherId.trim()) {
            errors.teacherId = 'Teacher Id is required';
            isValid = false;
        }
        if (!teachername.trim()) {
            errors.teachername = 'Teacher Name is required';
            isValid = false;
        }

        if (!subject.trim()) {
            errors.subject = 'Subject is required';
            isValid = false;
        }
        if (!sessiontime.trim()) {
            errors.sessiontime = 'session time is required';
            isValid = false;
        }
        setFormErrors(errors);
        return isValid;
    };

    const handleSave = () => {
        if (validateForm()) {
        const url = 'http://localhost:5225/api/ScheduleClass/AddClass';
        const data = {
            "scheduleId": scheduleId,
            "classId": classId,
            "teacherId": teacherId,
            "teachername":teachername,
            "subject": subject,
            "sessiontime":sessiontime
        };

        axios.post(url, data)
            .then((result) => {
                console.log(result.data);
                toast.success("Class Schedule has been added");
                    clear();
                    getData(); // Fetch data again after adding
            })
            .catch((error) => {
                toast.error(error);
            });
        }
    };

    const clear = () => {
        setScheduleId('');
        setClassid('');
        setTeacherId('');
        setTeacherName('');
        setSubject('');
        setSession('');


        setFormErrors({
            scheduleId: '',
            classId:'',
            teacherId: '',
            teachername:'',
            subject: '',
            sessiontime:'',
            formErrors:''
        })    
    }
        return (
            <Container>
            <ToastContainer />
            <h2 className="mt-5 mb-3">Class Schedule Control</h2>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="scheduleId">
                        <Form.Label>Schedule ID</Form.Label>
                        <Form.Control type="text" value={scheduleId} onChange={(e) => setScheduleId(e.target.value)} isInvalid={!!formErrors.scheduleId} />
                        <Form.Control.Feedback type="invalid">{formErrors.scheduleId}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="classId">
                        <Form.Label>Class Id</Form.Label>
                        {/* <Form.Control type="text" value={classId} onChange={(e) => setClassid(e.target.value)} isInvalid={!!formErrors.classId} /> */}
                        <Form.Select onChange={(e) => setClassid(e.target.value)}>
                        <option value="">Select Class ID</option>
                        {classdata.map((item, index) => (
                            <option key={index} value={item.classId}>{item.classId}</option>
                        ))}
                    </Form.Select>
                        <Form.Control.Feedback type="invalid">{formErrors.classId}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="teacherId">
                        <Form.Label>Teacher Id</Form.Label>
                        {/* <Form.Control type="text" value={teacherId} onChange={(e) => setTeacherId(e.target.value)} isInvalid={!!formErrors.teacherId} /> */}
                        <Form.Select onChange={(e) => setTeacherId(e.target.value)}>
                        <option value="">Select Teacher ID</option>
                        {teacherdata.map((item, index) => (
                            <option key={index} value={item.teacherId}>{item.teacherId}</option>
                        ))}
                    </Form.Select>
                        <Form.Control.Feedback type="invalid">{formErrors.teacherId}</Form.Control.Feedback>
                    </Form.Group>
                    
                </Row>
                <Row className="mb-3">
                <Form.Group as={Col} controlId="teachername">
                        <Form.Label>Teacher Name</Form.Label>
                        <Form.Control type="text" value={teachername} onChange={(e) => setTeacherName(e.target.value)} isInvalid={!!formErrors.teachername} />
                        <Form.Control.Feedback type="invalid">{formErrors.teachername}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="subject">
                        <Form.Label>Subject</Form.Label>
                        {/* <Form.Control type="text" value={subject} onChange={(e) => setSubject(e.target.value)} isInvalid={!!formErrors.subject} /> */}
                        <Form.Select value={subject} onChange={(e) => setSubject(e.target.value)} isInvalid={!!formErrors.subjectName}>
                            <option value="">Select Subjects</option>
                            {subjectnames.map((id) => (
                                <option key={id} value={id}>{id}</option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">{formErrors.subject}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="sessiontime">
                        <Form.Label>Session Time</Form.Label>
                        {/* <Form.Control type="text" value={sessiontime} onChange={(e) => setSession(e.target.value)} isInvalid={!!formErrors.sessiontime} /> */}
                        <Form.Select value={sessiontime} onChange={(e) => setSession(e.target.value)} isInvalid={!!formErrors.subjectName}>
                            <option value="">Select Session</option>
                            {sessions.map((id) => (
                                <option key={id} value={id}>{id}</option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">{formErrors.sessiontime}</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Button variant="primary" onClick={handleSave}>Add Class SChedule Details</Button>
            </Form>
            <br></br>
                <div className='pt-2'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <td>Sl No</td>
                                <th>Schedule Id</th>
                                <th>Class Id</th>
                                <th>Teacher Id</th>
                                {/* <th>Teacher Name</th> */}
                                <th>Subject </th>
                                <th>Session Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data && data.length > 0 ?
                                    data.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.scheduleId}</td>
                                                <td>{item.classId}</td>
                                                <td>{item.teacherId}</td>
                                                {/* <td>{item.teachername}</td> */}
                                                <td>{item.subject}</td>
                                                <td>{item.sessiontime}</td>
                                                <td colSpan={2}>
                
                
                    <button className='btn btn-primary'  onClick={()=>handleEdit(item.scheduleId)} >Edit</button> &nbsp;
                    <button className='btn btn-danger' onClick={()=> handleDelete(item.scheduleId)}  >Delete</button>
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
            <Modal.Title>Modify /Update Class Schedule</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Row>
            <Col>
            <input type="text" className='form-control' placeholder='Enter Schedule Id'
            value={editscheduleId} onChange={(e)=> setEditScheduleId(e.target.value)} />
            </Col>
            <Col>
            {/* <input type="text" className='form-control' placeholder='Enter Class Id'
            value={editclassId} onChange={(e)=> setEditClassid(e.target.value)} /> */}
                <Form.Select onChange={(e) => setClassid(e.target.value)}>
                    <option value=""> Class ID</option>
                        {classdata.map((item, index) => (
                            <option key={index} value={item.classId}>{item.classId}</option>
                        ))}
                </Form.Select>
            </Col>
            </Row>
            <Row className='pt-2'>
            <Col>
            {/* <input type="text" className='form-control' placeholder='Enter Teacher Id'
            value={editteacherId} onChange={(e)=> setEditTeacherId(e.target.value)} /> */}
            <Form.Select onChange={(e) => setTeacherId(e.target.value)}>
                        <option value="">Teacher ID</option>
                        {teacherdata.map((item, index) => (
                            <option key={index} value={item.teacherId}>{item.teacherId}</option>
                        ))}
                    </Form.Select>
            </Col>
            <Col>
            {/* <input type="text" className='form-control' placeholder='Enter Subject '
            value={editsubject} onChange={(e)=> setEditSubject(e.target.value)} /> */}
                <Form.Select value={subject} onChange={(e) => setSubject(e.target.value)} isInvalid={!!formErrors.subjectName}>
                    <option value="">Subjects</option>
                        {subjectnames.map((id) => (
                            <option key={id} value={id}>{id}</option>))}
                </Form.Select>
            </Col>
            {/* <Col> */}
            {/* <input type="text" className='form-control' placeholder='Enter Session '
            value={editsessiontime} onChange={(e)=> setEditSession(e.target.value)} />
            </Col> */}
            <Col>
            <Form.Select value={sessiontime} onChange={(e) => setSession(e.target.value)} isInvalid={!!formErrors.subjectName}>
                            <option value="">Session</option>
                            {sessions.map((id) => (
                                <option key={id} value={id}>{id}</option>
                            ))}
                        </Form.Select>
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
export default ScheduleClassManagement