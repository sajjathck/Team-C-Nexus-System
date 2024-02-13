import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button, Container, Row, Col, Table, Modal } from 'react-bootstrap';
 
 //for teacher
const GetStudByClass = () => {
    const [show, setShow] = useState(false);
    const [selectedClass, setselectedClass] = useState("");
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
    const [editClassId, setClassId] = useState("")
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
        axios.get(`http://localhost:5225/api/Student/GetAllStudentByClass/${selectedClass}`)
            .then((result) => {
                console.log(result.data)
                setStudentDetails(result.data);
            })
            .catch((error) => {
                toast.error(error);
            });
    };
 
    // const handleDelete = (studentId) => {
    //     if (window.confirm("Are you sure to delete this student?")) {
    //         axios.delete(`http://localhost:5225/api/Student/DeleteStudent/${studentId}`)
    //             .then((result) => {
    //                 if (result.status === 200) {
    //                     toast.success("Deleted successfully");
    //                     getData();
    //                     setStudentDetails({});
    //                 }
    //             })
    //             .catch((error) => {
    //                 toast.error(error);
    //             });
    //     }
    // };
 
    // const handleUpdate = () => {
    //     const url = 'http://localhost:5225/api/Student/EditStudent';
    //     const data = {
    //         "studentId": editStudentId,
    //         "firstName": editFirstName,
    //         "lastName": editLastName,
    //         "rollno": editRoll,
    //         "address": editAddress,
    //         "dob": editDOB,
    //         "gender": editGender,
    //         "regDate": editRegDate,
    //         "classId": editClassId
    //     };
 
    //     axios.put(url, data)
    //         .then((result) => {
    //             // handleClose();
    //             getData();
    //             setStudentDetails({});
    //             toast.success("Student has been updated");
    //         })
    //         .catch((error) => {
    //             toast.error(error);
    //         });
    // };
 
    return (
        <Container>
            <ToastContainer />
            <h2 className="mt-5 mb-3">Student By Class(teacher)</h2>
            <Row className="mb-3">
                <Col>
                    <Form.Select onChange={(e) => setselectedClass(e.target.value)}>
                        <option value="">Select class Name</option>
                        {data.map((item, index) => (
                            <option key={index} value={item.className}>{item.className}</option>
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
                    {studentDetails.map((item) => {
                        return (
                            <tr>
                                <td>{item.studentId}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.rollno}</td>
                                <td>{item.address}</td>
                                <td>{item.dob}</td>
                                <td>{item.gender}</td>
                                <td>{item.regDate}</td>
                                <td>{item.className}</td>
                                {/* <td>
                                    <Button variant="primary" onClick={() => setShow(true)}>Edit</Button>
                                    <Button variant="danger" onClick={() => handleDelete(item.studentId)}>Delete</Button>
                                </td> */}
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </Container>
    );
};
 
export default GetStudByClass;