import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function GetResultByStudent() {
  const [data, setData] = useState({ stdDisplay: [], percentage: '', totalMarks: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentid = sessionStorage.getItem("id");
        const response = await axios.get(`http://localhost:5225/api/Examination/GetResultStudentby/${studentid}`);
        setData(response.data);
        console.log(response.data); // Update state with the fetched data
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-5">
    <div className="card shadow">
      <div className="card-header bg-primary text-white">
        <h3 className="card-title">Progress Card</h3>
      </div>
      <div className="card-body">
        <h4 className="card-subtitle mb-2 text-muted">Student Name: {data.stdDisplay[0]?.studentName}</h4>
        <h4 className="card-subtitle mb-2 text-muted">Class: {data.stdDisplay[0]?.className}</h4>
        <h4 className="card-subtitle mb-2 text-muted">Section: {data.stdDisplay[0]?.section}</h4>
        <hr />
        <h5 className="card-text"> Marks Obtained: {data.totalMarks}</h5>
        <h5 className="card-text"> Total Marks: {data.stdDisplay.length*100}</h5>
        <h5 className="card-text">Overall Percentage: {parseFloat(data.percentage).toFixed(2)}%</h5>
        <hr />
        <h5 className="card-text">Subjects:</h5>
        <ul className="list-group list-group-flush">
          {data.stdDisplay.map((item, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              {item.subject}: {item.result} ({item.mark})
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
  );
}
