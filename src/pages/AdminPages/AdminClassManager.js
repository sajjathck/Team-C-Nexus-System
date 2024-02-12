import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button, Container, Row, Col, Table, Modal } from 'react-bootstrap';
import GetClassByClassId from "../../components/Services/GetClass/GetClassByClassId";
import GetClassByTeacherId from "../../components/Services/GetClass/GetClassByTeacherId";

const AdminClassManager=()=>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [classId, setClassId] = useState("");
    const [className, setClassName] = useState("");
    const [section, setSection] = useState("");
    const [teacherId, setTeacherId] = useState("");
    

    const [formErrors, setFormErrors] = useState({
        classId: '',
        className: '',
        section: '',
        teacherId: ''
    });
    const [editClassId,setEditClassId]=useState("")
    const [editClassName,setEditClassName] = useState("")
    const [editSection,setEditSection] = useState("")
    const [editTeacherId,setEditTeacherId] = useState("")
    

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get('http://localhost:5225/api/Class/GetAllClass')
            .then((result) => {
                setData(result.data);
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    const handleEdit = (classId) => {
        handleShow();
        axios.get(`http://localhost:5225/api/Class/GetClassByClassName/${className}`)
            .then((result) => {
                console.log(result.data);
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    const handleDelete = (classId) => {
        if (window.confirm("Are you sure to delete this Teacher?")) {
            axios.delete(`http://localhost:5225/api/Class/deleteClass/${classId}`)
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
        const url = 'http://localhost:5225/api/Class/UpdateClass';
        const data = {
            "classId": editClassId,
            "className": editClassName,
            "section": editSection,
            "teacherId": editTeacherId
        };

        axios.put(url, data)
            .then((result) => {
                handleClose();
                getData();
                toast.success("Class has been updated");
            })
            .catch((error) => {
                toast.error(error);
            });
    };
    const validateForm = () => {
        let isValid = true;
        const errors = {};

        if (!classId.trim()) {
            errors.classId = 'Class ID is required';
            isValid = false;
        } else if (data.some(item => item.classId === classId)) {
            errors.classId = 'Class ID already exists';
            isValid = false;
        }

        if (!className.trim()) {
            errors.className = 'Class Name is required';
            isValid = false;
        }

        if (!section.trim()) {
            errors.section = 'section is required';
            isValid = false;
        }

        if (!teacherId.trim()) {
            errors.teacherId = 'Teacher Id is required';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };


    const handleSave = () => {
        if (validateForm()) {
        const url = 'http://localhost:5225/api/Class/AddClass';
        const data = {
            "classId": classId,
            "className": className,
            "section": section,
            "teacherId": teacherId
        };

        axios.post(url, data)
            .then((result) => {
                toast.success("Class has been added");
                    clear();
                    getData(); // Fetch data again after adding
            })
            .catch((error) => {
                toast.error(error);
            });
        }
    };

    const clear = () => {
        setClassId('');
        setClassName('');
        setSection("");
        setTeacherId('');
        setFormErrors({
            classId: '',
            className:'',
            section: '',
            teacherId: '',
            formErrors:''
        })    
    }
        return (
            <Container>
            <ToastContainer />
            <h2 className="mt-5  mb-3">Class Control</h2>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="classId">
                        <Form.Label>Class ID</Form.Label>
                        <Form.Control type="text" value={classId} onChange={(e) => setClassId(e.target.value)} isInvalid={!!formErrors.classId} />
                        <Form.Control.Feedback type="invalid">{formErrors.classId}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="className">
                        <Form.Label>Class Name</Form.Label>
                        <Form.Control type="text" value={className} onChange={(e) => setClassName(e.target.value)} isInvalid={!!formErrors.className} />
                        <Form.Control.Feedback type="invalid">{formErrors.className}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="section">
                        <Form.Label>Section</Form.Label>
                        <Form.Control type="text" value={section} onChange={(e) => setSection(e.target.value)} isInvalid={!!formErrors.section} />
                        <Form.Control.Feedback type="invalid">{formErrors.section}</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="teacherId">
                        <Form.Label>Teacher Id</Form.Label>
                        <Form.Control type="text" value={teacherId} onChange={(e) => setTeacherId(e.target.value)} isInvalid={!!formErrors.teacherId} />
                        <Form.Control.Feedback type="invalid">{formErrors.teacherId}</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Button variant="primary" onClick={handleSave}>Add Class Details</Button>
            </Form>
            <br></br>
                <div className='pt-2'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <td>Sl No</td>
                                <th>Class Id</th>
                                <th>Class Name</th>
                                <th>Section</th>
                                <th>Teacher Id</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data && data.length > 0 ?
                                    data.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.classId}</td>
                                                <td>{item.className}</td>
                                                <td>{item.section}</td>
                                                <td>{item.teacherId}</td>
                                                <td colSpan={2}>
                
                
                    <button className='btn btn-primary'  onClick={()=>handleEdit(item.classId)} >Edit</button> &nbsp;
                    <button className='btn btn-danger' onClick={()=> handleDelete(item.classId)}  >Delete</button>
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
            <Modal.Title>Modify /Update Class</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Row>
            <Col>
            <input type="text" className='form-control' placeholder='Enter Class Id'
            value={editClassId} onChange={(e)=> setEditClassId(e.target.value)} />
            </Col>
            <Col>
            <input type="text" className='form-control' placeholder='Enter Class Name'
            value={editClassName} onChange={(e)=> setEditClassName(e.target.value)} />
            </Col>
            </Row>
            <Row className='pt-2'>
            <Col>
            <input type="text" className='form-control' placeholder='Enter Section'
            value={editSection} onChange={(e)=> setEditSection(e.target.value)} />
            </Col>
            <Col>
            <input type="text" className='form-control' placeholder='Enter Teacher Id'
            value={editTeacherId} onChange={(e)=> setEditTeacherId(e.target.value)} />
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
        <GetClassByClassId />
        <GetClassByTeacherId />
        </Container>
        )
    }
export default AdminClassManager