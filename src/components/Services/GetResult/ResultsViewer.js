import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResultsViewer = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get('http://localhost:5225/api/Examination/GetAllResult')
            .then((result) => {
                setData(result.data);
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    return (
        <div className='pt-2'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <td>Sl No</td>
                        <th>Mark Id</th>
                        <th>Student Id</th>
                        <th>Exam Id</th>
                        <th>Mark </th>
                        <th>Subject</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.length >  0 ?
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index +  1}</td>
                                        <td>{item.markId}</td>
                                        <td>{item.studentId}</td>
                                        <td>{item.examId}</td>
                                        <td>{item.marks}</td>
                                        <td>{item.subjectName}</td>
                                    </tr>
                                );
                            })
                        :
                        'Loading.......'
                    }
                </tbody>
            </Table>
        </div>
    );
};

export default ResultsViewer;
