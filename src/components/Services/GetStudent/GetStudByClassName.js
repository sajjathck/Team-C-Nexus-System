import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button, Container, Row, Col, Table, Modal } from 'react-bootstrap';
 
 //For admin
const GetStudByClassName = () => {

    const handleClose = () => setShow(false);
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
    const [editClassName, setEditClassName] = useState("");
    const [editClassId, setEditClassId] = useState("")
    const classIds = ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "C11", "C12"];

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
            "address": editAddress,
            "dob": editDOB,
            "gender": editGender,
            "regDate": editRegDate,
            "classId": editClassId
        };
    
        axios.put(url, data)
            .then((result) => {
                handleClose();
                getData();
                // Reset all edit state variables to empty strings after update
                setEditStudentId("");
                setEditFirstName("");
                setEditLastName("");
                setEditRoll("");
                setEditAddress("");
                setEditDOB("");
                setEditGender("");
                setEditRegDate("");
                setEditClassId("");
                toast.success("Student has been updated");
            })
            .catch((error) => {
                toast.error(error);
            });
    };
    
    
    return (
        <Container>
            <ToastContainer />
            <h2 className="mt-5 mb-3">Student By Class (admin)</h2>
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
                        <th></th>
                        <th></th>
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
                                <td>
                                    <Button variant="primary" onClick={() => setShow(true)}>Edit</Button></td>
                                <td>
                                    <Button variant="danger" onClick={() => handleDelete(item.studentId)}>Delete</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            {/* <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modify / Update Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="editFirstName">
                            <Form.Label>Student Id</Form.Label>
                            <Form.Control type="text" placeholder="Enter student Id" value={editStudentId} onChange={(e) => setEditStudentId(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="editFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter First Name" value={editFirstName} onChange={(e) => setEditFirstName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="editLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="type" placeholder="Enter Last Name" value={editLastName} onChange={(e) => setEditLastName(e.target.value)} />
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
                            <Form.Control type="date" value={editRegDate} onChange={(e) => setEditRegDate(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="setClassId">
                            <Form.Label>Class Id</Form.Label>
                            <Form.Control type="text" placeholder="Enter Class Id" value={editClassId} onChange={(e) => setClassId(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                    <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
                </Modal.Footer>
            </Modal> */}
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
                        {/* <Form.Group className="mb-3" controlId="editClassId">
                            <Form.Label>Class Id</Form.Label>
                            <Form.Control type="text" placeholder="Enter Class Id" value={editClassId} onChange={(e) => setEditClassId(e.target.value)} />
                        </Form.Group> */}
                        <Form.Group className="mb-3" controlId="seteditClassId">
                        <Form.Label>Class Id</Form.Label>
                        <Form.Select value={editClassId} onChange={(e) => setEditClassId(e.target.value)} >
                            <option value="">Select Class</option>
                            {classIds.map((editClassId) => (
                                <option key={editClassId} value={editClassId}>{editClassId}</option>
                            ))}
                        </Form.Select>
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
 
export default GetStudByClassName;

// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Form, Button, Container, Row, Col, Table, Modal } from 'react-bootstrap';
 
// const GetTeacherByClass = () => {
//     const [show, setShow] = useState(false);
//     const [selectedExamId, setSelectedExamId] = useState("");
//     const [examDetails, setExamDetails] = useState({});
//     const [editExamId, setEditExamId] = useState("");
//     const [editExamName, setEditExamName] = useState("");
//     const [editExamDate, setEditExamDate] = useState("");
//     const [editClassId, setEditClassId] = useState("");
//     const [editSubjectName, setEditSubject] = useState("");
//     const [data, setData] = useState([]);
   
//     useEffect(() => {
//         getData();
//     }, []);
 
//     const getData = () => {
//         axios.get('http://localhost:5225/api/Examination/GetAllExam')
//             .then((result) => {
//                 setData(result.data);
//             })
//             .catch((error) => {
//                 toast.error(error);
//             });
//     };
 
//     const handleSearch = () => {
//         axios.get(`http://localhost:5225/api/Examination/GetExamByExamId/${selectedExamId}`)
//             .then((result) => {
//                 setExamDetails(result.data);
//             })
//             .catch((error) => {
//                 toast.error(error);
//             });
//     };
 
//     const handleDelete = (examId) => {
//         if (window.confirm("Are you sure to delete this exam?")) {
//             axios.delete(`http://localhost:5225/api/Examination/DeleteExam/${examId}`)
//                 .then((result) => {
//                     if (result.status === 200) {
//                         toast.success("Deleted successfully");
//                         getData();
//                         setExamDetails({});
//                     }
//                 })
//                 .catch((error) => {
//                     toast.error(error);
//                 });
//         }
//     };
 
//     const handleUpdate = () => {
//         const url = 'http://localhost:5225/api/Examination/EditExamination';
//         const data = {
//             "examId": editExamId,
//             "examName": editExamName,
//             "examDate": editExamDate,
//             "classId": editClassId,
//             "subjectName": editSubjectName
//         };
 
//         axios.put(url, data)
//             .then((result) => {
//                 // handleClose();
//                 getData();
//                 setExamDetails({});
//                 toast.success("Exam has been updated");
//             })
//             .catch((error) => {
//                 toast.error(error);
//             });
//     };
 
//     return (
//         <Container>
//             <ToastContainer />
//             <h2 className="mt-5 mb-3">Exam Control</h2>
//             <Row className="mb-3">
//                 <Col>
//                     <Form.Select onChange={(e) => setSelectedExamId(e.target.value)}>
//                         <option value="">Select Exam ID</option>
//                         {data.map((item, index) => (
//                             <option key={index} value={item.examId}>{item.examId}</option>
//                         ))}
//                     </Form.Select>
//                 </Col>
//                 <Col>
//                     <Button variant="primary" onClick={handleSearch}>Search</Button>
//                 </Col>
//             </Row>
//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>Exam Id</th>
//                         <th>Exam Name</th>
//                         <th>Exam Date</th>
//                         <th>Class ID</th>
//                         <th>Subject Name</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td>{examDetails.examId}</td>
//                         <td>{examDetails.examName}</td>
//                         <td>{examDetails.examDate}</td>
//                         <td>{examDetails.classId}</td>
//                         <td>{examDetails.subjectName}</td>
//                         <td>
//                             <Button variant="primary" onClick={() => setShow(true)}>Edit</Button>
//                             <Button variant="danger" onClick={() => handleDelete(examDetails.examId)}>Delete</Button>
//                         </td>
//                     </tr>
//                 </tbody>
//             </Table>
//             <Modal show={show} onHide={() => setShow(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Modify / Update Exam</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form>
//                         <Form.Group className="mb-3" controlId="editExamName">
//                             <Form.Label>Exam Name</Form.Label>
//                             <Form.Control type="text" placeholder="Enter Exam Name" value={editExamName} onChange={(e) => setEditExamName(e.target.value)} />
//                         </Form.Group>
//                         <Form.Group className="mb-3" controlId="editExamDate">
//                             <Form.Label>Exam Date</Form.Label>
//                             <Form.Control type="date" value={editExamDate} onChange={(e) => setEditExamDate(e.target.value)} />
//                         </Form.Group>
//                         <Form.Group className="mb-3" controlId="editClassId">
//                             <Form.Label>Class ID</Form.Label>
//                             <Form.Control type="text" placeholder="Enter Class ID" value={editClassId} onChange={(e) => setEditClassId(e.target.value)} />
//                         </Form.Group>
//                         <Form.Group className="mb-3" controlId="editSubjectName">
//                             <Form.Label>Subject Name</Form.Label>
//                             <Form.Control type="text" placeholder="Enter Subject Name" value={editSubjectName} onChange={(e) => setEditSubject(e.target.value)} />
//                         </Form.Group>
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
//                     <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
//                 </Modal.Footer>
//             </Modal>
//         </Container>
//     );
// };
 
// export default GetTeacherByClass;


