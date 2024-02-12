import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function AdminProfilePage() {
  const [user, setUser] = useState([]); 

  useEffect(() => {
    const emailFromSessionStorage = sessionStorage.getItem("email");
    const url = `http://localhost:5225/api/User/GetById/${emailFromSessionStorage}`;
    
    axios.get(url)
      .then(response => {
        console.log(response.data)
        setUser(response.data); 
      })
      .catch(error => console.error('Error fetching data: ', error));
  }, []); 

  return (
    <div className="container">
      <h1>Admin Profile Page</h1>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Phone Number</th>
              <th>Email ID</th>
              <th>Admission ID</th>
            </tr>
          </thead>
          <tbody>
            
              <tr key={user.admissionId}>
                <td>{user.userName}</td>
                <td>{user.phoneNum}</td>
                <td>{user.emailid}</td>
                <td>{user.admissionId}</td>
              </tr>
           
          </tbody>
        </table>
      </div>
    </div>
  );
}
