import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button, Container, Row, Col, Table, Modal } from 'react-bootstrap';

const StudentManagement = () => {
    // ... All your state variables, functions, and hooks here ...
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const currentUserRole = sessionStorage.getItem('role'); 
    const isAdmin = () => currentUserRole === 'admin';
    //  const [studentDetails, setStudentDetails] = useState({});
    const [studentId, setStudentId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [rollno, setRollNo] = useState("");
    // const [className, setClassName] = useState("");
    const [address, setAddress] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [regDate, setRegDate] = useState("");
    const [classId, setClassid] = useState("")
    const classIds = ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "C11", "C12"];

    const renderButtons = (item) => {
        if (isAdmin()) {
            return (
                <>
                    <button className='btn btn-primary' onClick={() => handleEdit(item.studentId)}>Edit</button>
                    <button className='btn btn-danger' onClick={() => handleDelete(item.studentId)}>Delete</button>
                </>
            );
        } else {
            return null;
        }
    };

    const [formErrors, setFormErrors] = useState({
        studentId: '',
        firstName: '',
        lastName: '',
        rollno: '',
        // className:'',
        address: '',
        dob: '',
        gender: '',
        regDate: '',
        classId: ''
    });
    const [editstudentId, seteditStudentId] = useState("");
    const [editfirstName, seteditFirstName] = useState("");
    const [editlastName, seteditLastName] = useState("");
    const [editrollno, seteditRollNo] = useState("");
    // const [editclassName, seteditClassName] = useState("");
    const [editaddress, seteditAddress] = useState("");
    const [editdob, seteditDob] = useState("");
    const [editgender, seteditGender] = useState("");
    const [editregDate, seteditRegDate] = useState("");
    const [editClassId, seteditClassId] = useState("");

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [pendingStudentId, setPendingStudentId] = useState(null);

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

    const handleEdit = (studentId) => {
        handleShow();
        axios.get(`http://localhost:5225/api/Student/GetStudentById/${studentId}`)
            .then((result) => {
                console.log(result.data);
            })
            .catch((error) => {
                toast.error(error);
            });
    };
    const handleDelete = (studentId) => {
        setPendingStudentId(studentId);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        axios.delete(`http://localhost:5225/api/Student/DeleteStudent/${pendingStudentId}`)
            .then((result) => {
                if (result.status === 200) {
                    toast.success("Deleted successfully");
                    getData();
                }
            })
            .catch((error) => {
                toast.error(error);
            })
            .finally(() => {
                setShowDeleteModal(false);
            });
    };
    const closeDeleteModal = () => {
        setShowDeleteModal(false);
    };
    const DeleteConfirmationModal = () => (
        <Modal show={showDeleteModal} onHide={closeDeleteModal}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this student?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeDeleteModal}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={confirmDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );

    const handleUpdate = () => {
        const url = 'http://localhost:5225/api/Student/EditStudent';
        const data = {
            "studentId": editstudentId,
            "firstName": editfirstName,
            "lastName": editlastName,
            "rollno": editrollno,
            // "className":editclassName,
            "address": editaddress,
            "dob": editdob,
            "gender": editgender,
            "regDate": editregDate,
            "classId": editClassId
        };
        console.log(data)
        axios.put(url, data)
            .then((result) => {
                handleClose();
                getData();
                // setStudentDetails({});

                toast.success("student has been updated");
            })
            .catch((error) => {
                toast.error(error);
            });
    };
    const validateForm = () => {
        let isValid = true;
        const errors = {};

        if (!studentId.trim()) {
            errors.studentId = 'Student ID is required';
            isValid = false;
        } else if (data.some(item => item.studentId === studentId)) {
            errors.studentId = 'Student ID already exists';
            isValid = false;
        }

        if (!firstName.trim()) {
            errors.firstName = 'First name is required';
            isValid = false;
        }

        if (!lastName.trim()) {
            errors.lastName = 'Last name is required';
            isValid = false;
        }

        if (!rollno.trim()) {
            errors.rollno = 'Roll No is required';
            isValid = false;
        }
        else if (data.some(item => item.rollno === rollno)) {
            errors.rollno = 'Roll No already exists ';
            isValid = false;
        }
        // if (!className.trim()) {
        //     errors.className = 'Class Name is required';
        //     isValid = false;
        // }
        if (!address.trim()) {
            errors.address = 'Address is required';
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
        if (!regDate.trim()) {
            errors.regDate = 'Registration date is required';
            isValid = false;
        }
        if (!classId.trim()) {
            errors.classId = 'Class Id is required';
            isValid = false;
        }
        setFormErrors(errors);
        return isValid;
    };

    const handleSave = () => {
        if (validateForm()) {
            const url = 'http://localhost:5225/api/Student/AddStudent';
            const data = {
                "studentId": studentId,
                "firstName": firstName,
                "lastName": lastName,
                "rollno": rollno,
                // "className":className,
                "address": address,
                "dob": dob,
                "gender": gender,
                "regDate": regDate,
                "classId": classId
            };
            console.log(data)
            axios.post(url, data)

                .then((result) => {
                    toast.success("student has been added");
                    clear();

                    getData(); // Fetch data again after adding
                })
                .catch((error) => {
                    toast.error(error);
                });
        }
    };

    const clear = () => {
        setStudentId('');
        setFirstName('');
        setLastName("");
        setRollNo('');
        // setClassName('');
        setAddress('');
        setDob('');
        setGender('');
        setRegDate('');
        setClassid('')



        setFormErrors({
            studentId: '',
            firstName: '',
            lastName: '',
            rollno: '',
            // className:'',
            address: '',
            dob: '',
            gender: '',
            regDate: '',
            classId: '',
            formErrors: ''
        })
    }
    return (
        <Container>
        <ToastContainer />
        <h2 className="mt-5 mb-3">Student Control</h2>
        {isAdmin() ? (
        <Form>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="studentId">
                    <Form.Label>Student ID</Form.Label>
                    <Form.Control type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} isInvalid={!!formErrors.studentId} />
                    <Form.Control.Feedback type="invalid">{formErrors.studentId}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} isInvalid={!!formErrors.firstName} />
                    <Form.Control.Feedback type="invalid">{formErrors.firstName}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} isInvalid={!!formErrors.lastName} />
                    <Form.Control.Feedback type="invalid">{formErrors.lastName}</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="rollno">
                    <Form.Label>Roll No</Form.Label>
                    <Form.Control type="text" value={rollno} onChange={(e) => setRollNo(e.target.value)} isInvalid={!!formErrors.rollno} />
                    <Form.Control.Feedback type="invalid">{formErrors.rollno}</Form.Control.Feedback>
                </Form.Group>
                {/* <Form.Group as={Col} controlId="className">
                    <Form.Label>Class Name</Form.Label>
                    <Form.Control type="text" value={className} onChange={(e) => setClassName(e.target.value)} isInvalid={!!formErrors.className} />
                    <Form.Control.Feedback type="invalid">{formErrors.className}</Form.Control.Feedback>
                </Form.Group> */}
                <Form.Group as={Col} controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} isInvalid={!!formErrors.address} />
                    <Form.Control.Feedback type="invalid">{formErrors.address}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="dob">
                    <Form.Label>DOB</Form.Label>
                    <Form.Control type="date" value={dob} onChange={(e) => setDob(e.target.value)} isInvalid={!!formErrors.dob} />
                    <Form.Control.Feedback type="invalid">{formErrors.dob}</Form.Control.Feedback>
                </Form.Group>

            </Row>
            <Row className="mb-3">

                <Form.Group as={Col} controlId="gender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select value={gender} onChange={(e) => setGender(e.target.value)} isInvalid={!!formErrors.gender}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{formErrors.gender}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="regDate">
                    <Form.Label>Registration Date</Form.Label>
                    <Form.Control type="date" value={regDate} onChange={(e) => setRegDate(e.target.value)} isInvalid={!!formErrors.regDate} />
                    <Form.Control.Feedback type="invalid">{formErrors.regDate}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="classId">
                    <Form.Label>Class Id</Form.Label>
                    <Form.Select value={classId} onChange={(e) => setClassid(e.target.value)} isInvalid={!!formErrors.classId}>
                        <option value="">Select Class</option>
                        {classIds.map((id) => (
                            <option key={id} value={id}>{id}</option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{formErrors.classId}</Form.Control.Feedback>
                </Form.Group>

            </Row>

            <Button variant="primary" onClick={handleSave}>Add Student Details</Button>
        </Form>
        ): (
            <div>
                <p>To Add Student Contact Admin.</p>
            </div>
        )}

        <br></br>
        <div className='pt-2'>
            <Table striped border-none hover>
                <thead>
                    <tr>
                        <td>Sl No</td>
                        <th>Student Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Roll No </th>
                        <th>Class Name</th>
                        <th>Address</th>
                        <th>DOB</th>
                        <th>Gender</th>
                        <th>Register Date</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.length > 0 ?
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.studentId}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.rollno}</td>
                                        <td>{item.className}</td>
                                        <td>{item.address}</td>
                                        <td>{item.dob}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.regDate}</td>
                                        <td colSpan={1}>

                                        {renderButtons(item)}
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

        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Modify / Update Student</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="editstudentId">
                        <Form.Label>Student Id</Form.Label>
                        <Form.Control type="text" placeholder="Enter Student Id" value={editstudentId} onChange={(e) => seteditStudentId(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="editfirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter First Name" value={editfirstName} onChange={(e) => seteditFirstName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="editlastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Last Name" value={editlastName} onChange={(e) => seteditLastName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="editrollno">
                        <Form.Label>Roll No</Form.Label>
                        <Form.Control type="text" placeholder="Enter Roll No" value={editrollno} onChange={(e) => seteditRollNo(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="editaddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter Address" value={editaddress} onChange={(e) => seteditAddress(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="editdob">
                        <Form.Label>DOB</Form.Label>
                        <Form.Control type="date" placeholder="Enter DoB" value={editdob} onChange={(e) => seteditDob(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="editgender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select value={editgender} onChange={(e) => seteditGender(e.target.value)}>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="editregDate">
                        <Form.Label>Reg Date</Form.Label>
                        <Form.Control type="date" value={editregDate} onChange={(e) => seteditRegDate(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="editClassId">
                        <Form.Select value={editClassId} onChange={(e) => seteditClassId(e.target.value)} isInvalid={!!formErrors.classId}>
                            <option value="">Select Class</option>
                            {classIds.map((id) => (
                                <option key={id} value={id}>{id}</option>
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
        <DeleteConfirmationModal />
    </Container>

    );
};


export default StudentManagement;
