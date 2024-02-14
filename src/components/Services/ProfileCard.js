// ProfileCard.js
import React from 'react';
import { Card ,Button} from 'react-bootstrap';


const ProfileCard = ({ studentDetails, showProfileCard, toggleProfileCard }) => {

  if (!studentDetails || !showProfileCard) {
    return null;
  }

  return (
    <div className="container mt-5">
      <Card className="shadow">
        <Card.Header className="bg-primary text-white">
          <h3 className="card-title">Profile Card</h3>
        </Card.Header>
        <Card.Body>
          <h4 className="card-subtitle mb-2 text-muted"><strong>Name:</strong> {studentDetails.name}</h4>
          <h4 className="card-subtitle mb-2 text-muted"><strong>Email:</strong> {studentDetails.email}</h4>
          <h4 className="card-subtitle mb-2 text-muted"><strong>Phone:</strong> {studentDetails.phone}</h4>
          <hr />
          <h5 className="card-text"><strong>Username:</strong> {studentDetails.username}</h5>
          <h5 className="card-text"><strong>Role:</strong> {studentDetails.role}</h5>
          <hr />
          <h5 className="card-text"><strong>Additional Information:</strong></h5>
          <ul className="list-group list-group-flush">
            {Object.entries(studentDetails).map(([key, value], index) => (
              <li key={key} className="list-group-item d-flex justify-content-between align-items-center">
               <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>  {value}
              </li>
            ))}
          </ul>
        </Card.Body>
        <Card.Footer className="bg-white d-flex justify-content-between align-items-center py-2 px-3">
          <span>&nbsp;</span>
          <Button variant="outline-secondary" size="sm" onClick={toggleProfileCard}>
            Close
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default ProfileCard;
