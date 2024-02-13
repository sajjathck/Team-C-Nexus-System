import React, { useState } from 'react';
import MailCommunication from '../../components/Services/Notification/MailCommunication';
import Notification from '../../components/Services/Notification/Notification';

export default function AdminCommunication() {
  // State to toggle the visibility of the components
  const [showNotification, setShowNotification] = useState(false);
  const [showMailCommunication, setShowMailCommunication] = useState(false);

  // Function to toggle the visibility of the Notification component
  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  // Function to toggle the visibility of the MailCommunication component
  const toggleMailCommunication = () => {
    setShowMailCommunication(!showMailCommunication);
  };

  return (
    <div>
      {showNotification && <Notification />}
      {showMailCommunication && <MailCommunication />}
      <button className='btn btn-outline-dark me-3' onClick={toggleNotification}>Mail Notification</button>
      <button className='btn btn-outline-dark' onClick={toggleMailCommunication}>Communication</button>
    </div>
  );
}
