import React, { useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import ClassManagement from '../../components/Services/GetClass/ClassManagement';
import GetClassByClassId from '../../components/Services/GetClass/GetClassByClassId'
import GetClassByClassName from '../../components/Services/GetClass/GetClassByClassName';
import GetClassByTeacherId from '../../components/Services/GetClass/GetClassByTeacherId';
import ScheduleClassManagement from '../../components/Services/GetTeacher/ScheduleClassManagement';

const AdminClassManager = () => {
    const [selectedCard, setSelectedCard] = useState(null);

    const cards = [
        { id: 'management', label: 'Class Management' },
        { id: 'scheduleclass', label: 'Assign Teachers to Class' },
        { id: 'classid', label: 'Get By class ID' },
        { id: 'teacherid', label: 'Get By Teacher ID' },
        { id: 'classname', label: 'Get By Class Name' },
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

        {selectedCard === 'management' && <ClassManagement />}
        {selectedCard === 'scheduleclass' && <ScheduleClassManagement />}
        {selectedCard === 'classid' && <GetClassByClassId />}
        {selectedCard === 'teacherid' && <GetClassByClassName />}
        {selectedCard === 'classname' && <GetClassByTeacherId />}
    </Container>
    );
};

export default AdminClassManager;
