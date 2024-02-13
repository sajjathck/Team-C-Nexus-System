import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button, Container, Row, Col, Table, Modal } from 'react-bootstrap';

const GetTeacherBySubject = () => {

    //   const classIds = ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "C11", "C12"];
    //   const subjectnames = ["English", "Malayalam", "Hindi", "Chemistry", "Physics", "Botony", "Zoology", "Maths", "History", "Geography", "Politics", "Economics"];
    // const subjectnames = ["English", "Malayalam", "Hindi", "Chemistry", "Physics", "Botony", "Zoology", "Maths", "History", "Geography", "Politics", "Economics"];

    const handleClose = () => setShow(false);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [selectedSubject, setSelectedSubject] = useState("");
    const [teacherDetails, setTeacherDetails] = useState([]);


    const [scheduleId, setScheduleId] = useState("");
    const [classId, setClassid] = useState("");
    // const [teacherId, setTeacherId] = useState("");
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [subject, setSubject] = useState("");
    const [sessiontime, setSession] = useState("");


    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
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

    const handleSearch = () => {
        axios.get(`http://localhost:5225/api/ScheduleClass/GetClassBySubject/${selectedSubject}`)
            .then((result) => {
                console.log(result.data);
                setTeacherDetails(result.data);
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

    // const handleEdit = (scheduleId) => {
    //     handleShow();
    //     axios.get(`http://localhost:5225/api/ScheduleClass/GetClassByClassId/${scheduleId}`)
    //         .then((result) => {
    //             console.log(result.data);
    //         })
    //         .catch((error) => {
    //             toast.error(error);
    //         });
    // };

    const handleUpdate = () => {
        const url = 'http://localhost:5225/api/ScheduleClass/UpdateClass';
        const data = {
            "scheduleId": scheduleId,
            "classId": classId,
            // "teacherId": teacherId,
            "fName": fName,
            "lName": lName,
            "subject": subject,
            "sessiontime": sessiontime
        };

        axios.put(url, data)
            .then((result) => {
                handleClose();
                getData();
                setScheduleId("");
                setClassid("");
                // setTeacherId("");
                setFName("");
                setLName("");
                setSubject("");
                setSession("");
                toast.success("Class Schedule has been updated");
            })
            .catch((error) => {
                toast.error(error);
            });
    };
    return (
        <Container>
            <ToastContainer />
            <h2 className="mt-5 mb-3">teacher by subject</h2>

            <Row className="mb-3">
                <Col>
                    <Form.Select onChange={(e) => setSelectedSubject(e.target.value)}>
                        <option value="">Select subject</option>
                        {data.map((item, index) => (
                            <option key={index} value={item.subject}>{item.subject}</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col>
                    <Button variant="primary" onClick={handleSearch}>Search</Button>
                </Col>
            </Row>
            <br></br>
            <div className='pt-2'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <td>Sl No</td>
                            {/* <th>Schedule Id</th> */}
                            <th>Class Id</th>
                            {/* <th>Teacher Id</th> */}
                            <td>Name</td>

                            <th>Subject </th>
                            <th>Session Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            teacherDetails && teacherDetails.length > 0 ?
                                teacherDetails.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            {/* <td>{item.scheduleId}</td> */}
                                            <td>{item.classId}</td>
                                            {/* <td>{item.teacherId}</td> */}
                                            <td>{item.teachername}</td>

                                            <td>{item.subject}</td>
                                            <td>{item.sessiontime}</td>
                                            {/* <td colSpan={2}>          
                                                <button className='btn btn-primary'  onClick={()=>setShow(item.scheduleId)} >Edit</button> &nbsp;
                                                <button className='btn btn-danger' onClick={()=> handleDelete(item.scheduleId)}  >Delete</button>    
                                                </td> */}
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
                        {/* <Col>
                        <input type="text" className='form-control' placeholder='Enter Schedule Id'
                        value={scheduleId} onChange={(e)=> setScheduleId(e.target.value)} />
                        </Col> */}
                        <Col>
                            <input type="text" className='form-control' placeholder='Enter Class Id'
                                value={classId} onChange={(e) => setClassid(e.target.value)} />
                        </Col>
                    </Row>
                    <Row className='pt-2'>
                        {/* <Col>
                        <input type="text" className='form-control' placeholder='Enter Teacher Id'
                        value={teacherId} onChange={(e)=> setTeacherId(e.target.value)} />
                        </Col> */}
                        <Col>
                            <input type="text" className='form-control' placeholder='Enter First Name'
                                value={fName} onChange={(e) => setFName(e.target.value)} />
                        </Col>
                        <Col>
                            <input type="text" className='form-control' placeholder='Enter Last Name'
                                value={lName} onChange={(e) => setLName(e.target.value)} />
                        </Col>
                        <Col>
                            <input type="text" className='form-control' placeholder='Enter Subject '
                                value={subject} onChange={(e) => setSubject(e.target.value)} />
                        </Col>
                        <Col>
                            <input type="text" className='form-control' placeholder='Enter Session '
                                value={sessiontime} onChange={(e) => setSession(e.target.value)} />
                        </Col>
                    </Row>

                </Modal.Body>
                {/* <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleUpdate}>
                            Save Changes
                        </Button>
                        </Modal.Footer> */}
            </Modal>
        </Container>
    )
}
export default GetTeacherBySubject