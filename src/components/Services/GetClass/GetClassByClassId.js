import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button, Container, Row, Col, Table, Modal } from 'react-bootstrap';
 
 
const GetClassByClassId= () => {
    const [show, setShow] = useState(false);
    const [selectedClassId, setselectedClassId] = useState("");
    const [classDetails, setClassDetails] = useState([]);
    
 
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
        axios.get(`http://localhost:5225/api/ScheduleClass/GetClassByClassId/${selectedClassId}`)
            .then((result) => {
                console.log(result.data)
                setClassDetails(result.data);
                
            })
            .catch((error) => {
                toast.error(error);
            });
    };
 
    
    return (
        <Container>
            <ToastContainer />
            <h2 className="mt-5 mb-3">Class By Class Id </h2>
            <Row className="mb-3">
                <Col>
                    <Form.Select onChange={(e) => setselectedClassId(e.target.value)}>
                        <option value="">Select Class</option>
                        {data.map((item, index) => (
                            <option key={index} value={item.classId}>{item.classId}</option>
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
                        <th>Schedule Id</th>
                        <th>Class Id</th>
                        <th>Teacher Id</th>
                        <th>Subject</th>
                        <th>Session Time</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {classDetails.map((item)=>{
                        return(
                                <tr> 
                                <td>{item.scheduleId}</td>
                                <td>{item.classId}</td>
                                <td>{item.teacherId}</td>
                                <td>{item.subject}</td>
                                <td>{item.sessiontime}</td>
                                
                               
                            </tr>
                            )
                    })}
                    
                </tbody>
            </Table>
           
        </Container>
    );
};
 
export default GetClassByClassId;