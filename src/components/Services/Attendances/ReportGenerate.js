
import React,{useState,useEffect} from 'react'
import axios from "axios";
import { Form, Col} from 'react-bootstrap';


const ReportGenerate=()=> {
  const [percentage, setPercentage] = useState("");
  const [totalPresentDays, settotalPresentDays] = useState("");
  const [totalAbsentDays, setTotalAbsentDays] = useState("");
  const [studentId, setStudentId] = useState("");
  const [totalWorkingDays, setTotalWorkingDays] = useState("");
  const [selectedStudentId, setselectedStudentId] = useState("");
  const [date, setDate] = useState("");
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
              //toast.error(error);
          });
  };

  const Search = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:5225/api/StudAttendence/AttendenceReport/${date}/${studentId}`)
      .then((response) => {
        console.log(response.data);
        setTotalWorkingDays(response.data.totalWorkingDays);
        setTotalAbsentDays(response.data.totalAbsentDays);
        settotalPresentDays(response.data.totalPresentDays);
        setPercentage(response.data.percentage);

      })
      .catch((error) => console.log(error));
  };

  return (
    <div className='container mt-5'>
    <h1 className="mb-4">Attendance Report</h1>
    <form>
        <div className="form-group">
            <label htmlFor="studentId">Enter Student ID</label>
            <Col>
                    <Form.Select onChange={(e) => setselectedStudentId(e.target.value)}>
                        <option value="">Select Student ID</option>
                        {data.map((item, index) => (
                            <option key={index} value={item.studentId}>{item.studentId}</option>
                        ))}
                    </Form.Select>
                </Col>
        </div>
        <br />
        <div className="form-group">
            <label htmlFor="date">Enter Date</label>
            <input
                type="month"
                id="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
        </div>
        <br />
        <button type="submit" onClick={Search} className="btn btn-primary">Generate Report</button>
    </form>
    <div className="card mt-4">
        <div className="card-header">
            Attendance Details
        </div>
        <ul className="list-group list-group-flush">
            <li className="list-group-item">Month: {date}</li>
            <li className="list-group-item">Working Days: {totalWorkingDays}</li>
            <li className="list-group-item">Days Present: {totalPresentDays}</li>
            <li className="list-group-item">Days Absent: {totalAbsentDays}</li>
            <li className="list-group-item">Percentage: {percentage}</li>
        </ul>
    </div>
</div>

  )
}
export default ReportGenerate;