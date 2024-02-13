import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button, Container, Row, Col, Table, Modal } from 'react-bootstrap';
import subjectnames from "../../shared/Subjects";
import sessions from "../../shared/Sessions";



const ViewScheduleClass=()=>{
    const [data, setData] = useState([]);
    const [classdata, setClassData] = useState([]);
    useEffect(() => {
        getData();
        getClassData();
        // getTeacherData();
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

        return (
            <Container>
            <ToastContainer />
            <h2 className="mt-5 mb-3">View Class</h2>

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
                                                
                </tr>
                )
            })
            :
            'Loading.......'
            }
        
        </tbody>
        </Table>
        </div>

        </Container>
        )
    }
export default ViewScheduleClass