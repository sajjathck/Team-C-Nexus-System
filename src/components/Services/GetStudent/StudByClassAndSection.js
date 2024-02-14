import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button, Container, Row, Col, Table, Modal } from 'react-bootstrap';
 
 
const StudByClassAndSection = () => {
    const [show, setShow] = useState(false);
    const [selectedclassName, setselectedClassName] = useState("");
    const [selectedSection, setselectedSection] = useState("");
    const [section, setSection] = useState([]);
    
    const [studentDetails, setStudentDetails] = useState([]);
    const [editStudentId, setEditStudentId] = useState("");
    const [editFirstName, setEditFirstName] = useState("");
    const [editLastName, setEditLastName] = useState("");
    const [editRoll, setEditRoll] = useState("");
    const [editAddress, setEditAddress] = useState("");
    const [editDOB, setEditDOB] = useState("");
    const [editGender, setEditGender] = useState("");
    const [editRegDate, setEditRegDate] = useState("");
    const [ediClassName, setEditClassName] = useState("");
    const[editClassId,setEditClassId]=useState("")
    const classIds = ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "C11", "C12"];

 
    const [data, setData] = useState([]);
   
    useEffect(() => {
        getData();
    }, []);
 
    const getData = () => {
        axios.get('http://localhost:5225/api/Student/GetAllStudents')
            .then((result) => {
                setData(result.data);
                // console.log(result.data)
            })
            .catch((error) => {
                toast.error(error);
            });
    };
    useEffect(() => {
        if (selectedclassName) {
            getSection();
        }
    }, [selectedclassName]); 
    
 const getSection =() =>{
    axios.get(`http://localhost:5225/api/Class/GetClassByClassName/${selectedclassName}`)
            .then((result) => {
                setSection(result.data);
              //  console.log(result.data);
            })
            .catch((error) => {
                toast.error(error);
            });
 }
    const handleSearch = () => {
        axios.get(`http://localhost:5225/api/Student/GetAllStudentsByClassandSec/${selectedclassName}/${selectedSection}`)
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
            "classId": editClassId
        };
 
        axios.put(url, data)
            .then((result) => {
                // handleClose();
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
            <h2 className="mt-5 mb-3">Student By Class and Section</h2>
            <Row className="mb-3">
                <Col>
                    <Form.Select onChange={(e) => setselectedClassName(e.target.value)}>
                        <option value="">Select Class Name</option>
                        {data.map((item, index) => (
                            <option key={index} value={item.className}>{item.className}</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col>
                <Form.Select onChange={(e) => setselectedSection(e.target.value)}>
                    <option value="">Select Section</option>
                    {section && <option value={section.section}>{section.section}</option>}
                </Form.Select>
                </Col>
                <Col>
                    <Button variant="primary" onClick={handleSearch}>Search</Button>
                </Col>
            </Row>
            <Table striped border-none hover>
                <thead>
                    <tr>
                        <th>Student Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Roll No</th>
                        <th>Address</th>
                        <th>DOB</th>
                        <th>Gender</th>
                        <th>RegDate</th>
                        <th>Class Name</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {studentDetails.map((detail, index) => (
                    <tr key={index}>
                        <td>{detail.studentId}</td>
                        <td>{detail.firstName}</td>
                        <td>{detail.lastName}</td>
                        <td>{detail.rollno}</td>
                        <td>{detail.address}</td>
                        <td>{detail.dob}</td>
                        <td>{detail.gender}</td>
                        <td>{detail.regDate}</td>
                        <td>{detail.className}</td>
                        <td>
                            <Button variant="primary" onClick={() => {
                                // Set the current student details for editing
                                setEditStudentId(detail.studentId);
                                setEditFirstName(detail.firstName);
                                setEditLastName(detail.lastName);
                                setEditRoll(detail.rollno);
                                setEditAddress(detail.address);
                                setEditDOB(detail.dob);
                                setEditGender(detail.gender);
                                setEditRegDate(detail.regDate);
                                setEditClassName(detail.className);
                                setShow(true);
                            }}>Edit</Button></td>
                            <td>
                            <Button variant="danger" onClick={() => handleDelete(detail.studentId)}>Delete</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
            </Table>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modify / Update Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Form.Group className="mb-3" controlId="editStudentId">
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
                            <Form.Control type="dob" placeholder="Enter DoB" value={editDOB} onChange={(e) => setEditDOB(e.target.value)} />
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
                        {/* <Form.Group className="mb-3" controlId="seteditClassId">
                        <Form.Label>Class Id</Form.Label>
                        <Form.Select value={editClassId} onChange={(e) => setEditClassId(e.target.value)} >
                            <option value="">Select Class</option>
                            {classIds.map((editClassId) => (
                                <option key={editClassId} value={editClassId}>{editClassId}</option>
                            ))}
                        </Form.Select>
                    </Form.Group> */}
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
 
export default StudByClassAndSection;