import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button, Container, Row, Col, Table, Modal } from 'react-bootstrap';

const GetTeacherById = () => {
    const [show, setShow] = useState(false);
    const subjectnames = ["English", "Malayalam", "Hindi", "Chemistry", "Physics", "Botony", "Zoology", "Maths", "History", "Geography", "Politics", "Economics"];
    const handleClose = () => setShow(false);
    const [selectedTeacherId, setSelectedTeacherId] = useState("");
    const [teacherDetails, setTeacherDetails] = useState({});
    const [editFirstName, setEditFirstName] = useState("");
    const [editLastName, setEditLastName] = useState("");
    const [editTeacherDob, setEditTeacherDob] = useState("");
    const [editGender, setEditGender] = useState("");
    const [editSubjectName, setEditSubject] = useState("");
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

    const handleSearch = () => {
        axios.get(`http://localhost:5225/api/Teacher/GetTeachersById/${selectedTeacherId}`)
            .then((result) => {
                setTeacherDetails(result.data);
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
                        setTeacherDetails({});
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
            "teacherId": selectedTeacherId,
            "fName": editFirstName,
            "lName": editLastName,
            "dob": editTeacherDob,
            "gender": editGender,
            "subjectTaught": editSubjectName,

        };

        axios.put(url, data)
            .then((result) => {
                handleClose();
                getData();
                setTeacherDetails({});
                toast.success("Teacher has been updated");
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    return (
        <Container>
            <ToastContainer />
            <h2 className="mt-5 mb-3">Get By Id</h2>
            <Row className="mb-3">
                <Col>
                    <Form.Select onChange={(e) => setSelectedTeacherId(e.target.value)}>
                        <option value="">Select Teacher ID</option>
                        {data.map((item, index) => (
                            <option key={index} value={item.teacherId}>{item.teacherId}</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col>
                    <Button variant="primary" onClick={handleSearch}>Search</Button>
                </Col>
            </Row>
            <Table striped border-none hover>
                <thead>
                    <tr>
                        <th>Teacher Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>DOB</th>
                        <th>Gender</th>
                        <th>Subject Taught</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{teacherDetails.teacherId}</td>
                        <td>{teacherDetails.fName}</td>
                        <td>{teacherDetails.lName}</td>
                        <td>{teacherDetails.dob}</td>
                        <td>{teacherDetails.gender}</td>
                        <td>{teacherDetails.subjectTaught}</td>
                        <td>
                            <Button variant="primary" onClick={() => setShow(true)}>Edit</Button></td>
                        <td>
                            <Button variant="danger" onClick={() => handleDelete(teacherDetails.teacherId)}>Delete</Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modify / Update Teachers</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="editFirstName">
                            <Form.Label>Teacher First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter First Name" value={editFirstName} onChange={(e) => setEditFirstName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="editLastName">
                            <Form.Label>Teacher Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter First Name" value={editLastName} onChange={(e) => setEditLastName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="editTeacherDob">
                            <Form.Label> Date Of Birth</Form.Label>
                            <Form.Control type="date" value={editTeacherDob} onChange={(e) => setEditTeacherDob(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="editGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select value={editGender} onChange={(e) => setEditGender(e.target.value)} >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>

                            </Form.Select>
                            {/* <Form.Control type="text" placeholder="Enter Gender" value={editGender} onChange={(e) => setEditGender(e.target.value)} /> */}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="editSubjectName">
                            <Form.Label>Subject Name</Form.Label>
                            <Form.Select value={editSubjectName} onChange={(e) => setEditSubject(e.target.value)} >
                                <option value="">Select Class</option>
                                {subjectnames.map((id) => (
                                    <option key={id} value={id}>{id}</option>
                                ))}
                            </Form.Select>
                            {/* <Form.Control type="text" placeholder="Enter Subject Name" value={editSubjectName} onChange={(e) => setEditSubject(e.target.value)} /> */}
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

export default GetTeacherById;