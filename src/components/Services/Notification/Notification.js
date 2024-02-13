import { React, useState } from "react";
import axios from "axios";
const Notification = () => {
  const [id, setId] = useState("");
  const [msg, setMessage] = useState("");
  const [dat, setDate] = useState("");
  const [rol, setRole] = useState("");
  const [errors, setErrors] = useState({});
 
  function validateForm() {
    const errors = {};
    let isValid = true;
 
    if (!id) {
        errors.id = "ID is required";
        isValid = false;
    }
    if (!msg) {
        errors.msg = "Message is required";
        isValid = false;
    }
    if (!dat) {
        errors.dat = "Date is required";
        isValid = false;
    }
    if (!rol) {
        errors.rol = "Role is required";
        isValid = false;
    }
   
    setErrors(errors);
    return isValid;
}
 
  const Save = (e) => {
    e.preventDefault();
   
    if(validateForm()){
    let notification = {
    notificationId: id,
    message: msg,
    date: dat,
    role: rol,
    };
    console.log(notification);
    axios
      .post("http://localhost:5135/AddNotification/",notification)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
    }
  };
  const Search = () => {
    axios
      .get("http://localhost:5135/GetNotification/" + id)
      .then((response) => {
        console.log(response.data);
        setId(response.data.id);
        setMessage(response.data.msg);
        setDate(response.data.dat);
        setRole(response.data.rol);
      })
      .catch((error) => console.log(error));
  };
  const Edit = () => {
    let notification = {
        notificationId: id,
        message: msg,
        date: dat,
        role: rol,
    };
    axios
      .put("http://localhost:5135/EditNotification/", notification)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };
  const Delete = (e) => {
    e.preventDefault();
    axios
      .delete("http://localhost:5135/DeleteNotification/" + id)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };
 
 
return (
  <div className="container py-4">
  <h2 className="text-center mb-4">Mail Communication</h2>
  <form onSubmit={Save} className="needs-validation" noValidate>
    <div className="mb-3">
      <label htmlFor="notificationId" className="form-label">Notification ID</label>
      <input
        type="text"
        className="form-control"
        id="notificationId"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
      />
      {errors.id && <div className="invalid-feedback">{errors.id}</div>}
    </div>
    <div className="mb-3">
      <label htmlFor="message" className="form-label">Message</label>
      <textarea
        className="form-control"
        id="message"
        rows="3"
        value={msg}
        onChange={(e) => setMessage(e.target.value)}
        required
      ></textarea>
      {errors.msg && <div className="invalid-feedback">{errors.msg}</div>}
    </div>
    <div className="mb-3">
      <label htmlFor="date" className="form-label">Date</label>
      <input
        type="date"
        className="form-control"
        id="date"
        value={dat}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      {errors.dat && <div className="invalid-feedback">{errors.dat}</div>}
    </div>
    <div className="mb-3">
      <label className="form-label">Select Recipients</label>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="checkbox"
          id="teacherCheckbox"
          value="teacher"
          onChange={(e) => setRole(e.target.checked ? e.target.value : '')}
        />
        <label className="form-check-label" htmlFor="teacherCheckbox">Teacher</label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="checkbox"
          id="studentsCheckbox"
          value="students"
          onChange={(e) => setRole(e.target.checked ? e.target.value : '')}
        />
        <label className="form-check-label" htmlFor="studentsCheckbox">Students</label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="checkbox"
          id="usersCheckbox"
          value="users"
          onChange={(e) => setRole(e.target.checked ? e.target.value : '')}
        />
        <label className="form-check-label" htmlFor="usersCheckbox">Users</label>
      </div>
      {errors.rol && <div className="invalid-feedback">{errors.rol}</div>}
    </div>
    <button type="submit" className="btn btn-primary">Send</button>
  </form>
</div>
   
  );
};
 
export default Notification;