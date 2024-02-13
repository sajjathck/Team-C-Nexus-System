import React, { useState } from 'react';
import "react-toastify/dist/ReactToastify.css";
import {  Card, Container, Row, Col } from 'react-bootstrap';
import GetTeacherById from "../../components/Services/GetTeacher/GetTeacherById";
import TeacherManager from "../../components/Services/GetTeacher/TeacherManager";
import GetTeacherByClass from "../../components/Services/GetTeacher/GetTeacherByClass"
import ScheduleClassManagement from '../../components/Services/GetTeacher/ScheduleClassManagement';
import GetTeacherBySubject from '../../components/Services/GetTeacher/GetTeacherBySubject';

const AdminTeacherManager = () => {
    const [selectedCard, setSelectedCard] = useState(null);

    const cards = [
        { id: 'management', label: 'Teacher Management' },
        { id: 'teacherId', label: 'Get By Teacher ID' },
        { id: 'scheduleclass', label: 'Assign Teachers to Class' },
        { id: 'classname', label: 'Get By Class Name' },
        { id: 'subject', label: 'Get By Subject' },
        // { id: 'ProgressReport', label: 'Get Student Result By Id' },
    ];

    const handleCardClick = (cardId) => {
        setSelectedCard(cardId);
    };

    return (
        <Container>
        <Row>
            {cards.map((card) => (
                <Col sm={6} md={4} lg={6} key={card.id}>
                    <Card className={`mb-3 ${selectedCard === card.id ? 'border-primary' : ''}`} style={{ cursor: 'pointer' }} onClick={() => handleCardClick(card.id)}>
                        <Card.Body className={card.bgColor}>
                            <Card.Title>{card.label}</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>

        {selectedCard === 'management' && <TeacherManager />}
        {selectedCard === 'teacherId' && <GetTeacherById />}
        {selectedCard === 'scheduleclass' && <ScheduleClassManagement />}
        {selectedCard === 'classname' && <GetTeacherByClass />}
        {selectedCard === 'subject' && <GetTeacherBySubject />}
    </Container>
    );
}
export default AdminTeacherManager