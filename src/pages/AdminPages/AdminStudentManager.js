import React, { useState } from 'react';

import GetStudByRollNo from "../../components/Services/GetStudent/GetStudByRollNo";
import GetStudByStudentId from "../../components/Services/GetStudent/GetStudByStudentId";
import GetStudByClassName from "../../components/Services/GetStudent/GetStudByClassName";
import StudentManagement from "../../components/Services/GetStudent/StudentManagement";
import StudByClassAndSection from "../../components/Services/GetStudent/StudByClassAndSection";
import GetResultByStudentAdmin from "../../components/Services/GetStudent/GetResultByStudentAdmin"
import { Card, Container, Row, Col } from 'react-bootstrap';

const AdminStudentManager = () => {
    const [selectedCard, setSelectedCard] = useState(null);

    const cards = [
        { id: 'management', label: 'Student Management' },
        { id: 'rollno', label: 'Get By Roll Number' },
        { id: 'studentid', label: 'Get By Student ID' },
        { id: 'classname', label: 'Get By Class Name' },
        { id: 'class&Section', label: 'Get By Class And Section' },
        { id: 'ProgressReport', label: 'Get Student Result By Id' },
    ];

    const handleCardClick = (cardId) => {
        setSelectedCard(cardId);
    };

    return (
        <Container>
        <Row>
            {cards.map((card) => (
                <Col sm={6} md={4} lg={3} key={card.id}>
                    <Card className={`mb-3 ${selectedCard === card.id ? 'border-primary' : ''}`} style={{ cursor: 'pointer' }} onClick={() => handleCardClick(card.id)}>
                        <Card.Body className={card.bgColor}>
                            <Card.Title>{card.label}</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>

        {selectedCard === 'management' && <StudentManagement />}
        {selectedCard === 'rollno' && <GetStudByRollNo />}
        {selectedCard === 'studentid' && <GetStudByStudentId />}
        {selectedCard === 'classname' && <GetStudByClassName />}
        {selectedCard === 'class&Section' && <StudByClassAndSection />}
        {selectedCard === 'ProgressReport' && <GetResultByStudentAdmin />}
    </Container>
    );
};

export default AdminStudentManager;
