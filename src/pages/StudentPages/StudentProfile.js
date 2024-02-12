import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Col ,Table, Modal, Button, Form } from 'react-bootstrap';
import { Card } from 'react-bootstrap';

export default function StudentProfile() {
  const [users, setUsers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState({});
  const [editingUser, setEditingUser] = useState(null); // User currently being edited
  const [editUserName, setEditUserName] = useState("");
  const [editPhoneNum, setEditPhoneNum] = useState("");

  useEffect(() => {
    // Fetch data from the API on component mount
    getDatas();
  }, []);

  const getDatas = () => {
    const emailFromSessionStorage = sessionStorage.getItem("email");
    const url = `http://localhost:5225/api/User/GetById/${emailFromSessionStorage}`;

    axios.get(url)
      .then(response => {
        setUsers([response.data]); // Assuming the data is in the response body
      })
      .catch(error => console.error('Error fetching data: ', error));
  };

  const handleViewDetailsClick = (admissionId) => {
    axios.get(`http://localhost:5225/api/Student/GetStudentById/${admissionId}`)
      .then(response => {
        setSelectedTeacher(response.data);
      })
      .catch(error => console.error('Error fetching teacher data:', error));
  };

  const handleEdit = (user) => {
    console.log('Edit button clicked for user:', user);
    setEditingUser(user);
    setEditUserName(user.userName);
    setEditPhoneNum(user.phoneNum);
    setShow(true);
  };

  const handleUpdate = () => {
    const url = 'http://localhost:5225/api/User/UpdateUser';
    const updatedData = {
      ...editingUser, // Spread the original user details
      userName: editUserName, // Overwrite the username with the updated value
      phoneNum: editPhoneNum, // Overwrite the phone number with the updated value
      // Do not include emailid and admissionId here
    };

    axios.put(url, updatedData)
      .then((result) => {
        handleClose();
        getDatas();
        toast.success("User details have been updated");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleClose = () => {
    setShow(false);
    setEditingUser(null); // Clear the editing state
  };


  const [show, setShow] = useState(false);

  return (
    <Container>
      <ToastContainer />
      <h2 className="mt-2 mb-3">Student Profile Page</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Phone Number</th>
            <th>Email ID</th>
            <th>Admission ID</th>
            <th>Actions</th>
            <th></th>

          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.admissionId}>
              <td>{user.userName}</td>
              <td>{user.phoneNum}</td>
              <td>{user.emailid}</td>
              <td>{user.admissionId}</td>
              <td>
                <div className='btn-primary'>
                  <Button onClick={() => handleEdit(user)}>Edit</Button>
                </div>
              </td>
              <td>
              <div className='btn-success'>
                  <Button onClick={() => handleViewDetailsClick(user.admissionId)}>
                    View Full Details
                  </Button>
                </div>
              </td>
            </tr>
            
          ))}
        </tbody>
      </Table>

      {Object.keys(selectedTeacher).length >  0 && (
      <div className="mt-4">
        <h2>Full Details</h2>
        <div className="row">
          {Object.entries(selectedTeacher).map(([key, value]) => (
            <div className="col-md-4 mb-4" key={key}>
              <Card>
                <Card.Header>{key.charAt(0).toUpperCase() + key.slice(1)}</Card.Header>
                <Card.Body>
                  <Card.Text>{value}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} controlId="editUserName">
              <Form.Label column sm={4}>Username</Form.Label>
              <Col sm={8}>
                <Form.Control type="text" placeholder='Enter Username'
                  value={editUserName} onChange={(e) => setEditUserName(e.target.value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="editPhoneNum">
              <Form.Label column sm={4}>Phone Number</Form.Label>
              <Col sm={8}>
                <Form.Control type="tel" placeholder='Enter Phone Number'
                  value={editPhoneNum} onChange={(e) => setEditPhoneNum(e.target.value)} />
              </Col>
            </Form.Group>
          </Form>
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
    </Container>
  );
}
