import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button, Container, Row, Col, Table, Modal } from 'react-bootstrap';
 
 
const GetStudByRollNo = () => {

    const handleClose = () => setShow(false);
    const [show, setShow] = useState(false);
    const [selectedRoll, setselectedRoll] = useState("");
    const [studentDetails, setStudentDetails] = useState({});
    const [editStudentId, setEditStudentId] = useState("");
    const [editFirstName, setEditFirstName] = useState("");
    const [editLastName, setEditLastName] = useState("");
    const [editRoll, setEditRoll] = useState("");
    const [editAddress, setEditAddress] = useState("");
    const [editDOB, setEditDOB] = useState("");
    const [editGender, setEditGender] = useState("");
    const [editRegDate, setEditRegDate] = useState("");
    const [ediClassName, setEditClassName] = useState("");
 
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
 
    const handleSearch = () => {
        axios.get(`http://localhost:5225/api/Student/GetStudentByRoll/${selectedRoll}`)
            .then((result) => {
                console.log(result.data)
                setStudentDetails(result.data);
            })
            .catch((error) => {
                toast.error(error);
            });
    };
 
    const handleDelete = (studentId) => {
        if (window.confirm("Are you sure to delete this student?")) {
            axios.delete(`http://localhost:5225/api/Student/DeleteStudent/${studentId}`)
                .then((result) => {
                    if (result.status === 200) {
                        toast.success("Deleted successfully");
                        getData();
                        setStudentDetails({});
                    }
                })
                .catch((error) => {
                    toast.error(error);
                });
        }
    };
 
    const handleUpdate = () => {
        const url = 'http://localhost:5225/api/Student/EditStudent';
        const data = {
            "studentId": editStudentId,
            "firstName": editFirstName,
            "lastName": editLastName,
            "rollno": editRoll,
            "address":editAddress,
            "dob": editDOB,
            "gender": editGender,
            "regDate": editRegDate,
            "classId": ediClassName
        };
 
        axios.put(url, data)
            .then((result) => {
                handleClose();
                getData();
                setStudentDetails({});
                toast.success("Student has been updated");
            })
            .catch((error) => {
                toast.error(error);
            });
    };
 
    return (
        <Container>
            <ToastContainer />
            <h2 className="mt-5 mb-3">Student By Roll No</h2>
            <Row className="mb-3">
                <Col>
                    <Form.Select onChange={(e) => setselectedRoll(e.target.value)}>
                        <option value="">Select Roll no</option>
                        {data.map((item, index) => (
                            <option key={index} value={item.rollno}>{item.rollno}</option>
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
                        <th>Student Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Roll No</th>
                        <th>Address</th>
                        <th>dob</th>
                        <th>gender</th>
                        <th>regDate</th>
                        <th>className</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{studentDetails.studentId}</td>
                        <td>{studentDetails.firstName}</td>
                        <td>{studentDetails.lastName}</td>
                        <td>{studentDetails.rollno}</td>
                        <td>{studentDetails.address}</td>
                        <td>{studentDetails.dob}</td>
                        <td>{studentDetails.gender}</td>
                        <td>{studentDetails.regDate}</td>
                        <td>{studentDetails.className}</td>
                        <td>
                            <Button variant="primary" onClick={() => setShow(true)}>Edit</Button>
                            <Button variant="danger" onClick={() => handleDelete(studentDetails.studentId)}>Delete</Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modify / Update Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Form.Group className="mb-3" controlId="">
                            <Form.Label>Student Id</Form.Label>
                            <Form.Control type="text" placeholder="Enter student id" value={editStudentId} onChange={(e) => setEditStudentId(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="editFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter First Name" value={editFirstName} onChange={(e) => setEditFirstName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="editLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="type" placeholder="Enter Last Name"value={editLastName} onChange={(e) => setEditLastName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="editRoll">
                            <Form.Label>Roll No</Form.Label>
                            <Form.Control type="text" placeholder="Enter Roll No" value={editRoll} onChange={(e) => setEditRoll(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="editAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Enter Address" value={editAddress} onChange={(e) => setEditAddress(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="editDOB">
                            <Form.Label>DOB</Form.Label>
                            <Form.Control type="date" placeholder="Enter DoB" value={editDOB} onChange={(e) => setEditDOB(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="editGender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select value={editGender} onChange={(e) => setEditGender(e.target.value)}>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="editRegDate">
                            <Form.Label>Reg Date</Form.Label>
                            <Form.Control type="date"  value={editRegDate} onChange={(e) => setEditRegDate(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="setEditClassName">
                            <Form.Label>Class Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Class Name" value={ediClassName} onChange={(e) => setEditClassName(e.target.value)} />
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
 
export default GetStudByRollNo;