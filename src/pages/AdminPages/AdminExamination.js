import React, { useState } from 'react';

import ExamManagement from '../../components/Services/Exams/ExamManagement'
import { Card, Container, Row, Col } from 'react-bootstrap';
import GetResultByStudentAdmin from '../../components/Services/GetStudent/GetResultByStudentAdmin';
import ResultsViewer from '../../components/Services/GetResult/ResultsViewer';

const AdminExamination = () => {
    const [selectedCard, setSelectedCard] = useState(null);

    const cards = [
        { id: 'management', label: 'Exam Management' },
        { id: 'viewresult', label: 'View Result' },
        { id: 'resultbystudent', label: 'Get By Student ID' },
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

        {selectedCard === 'management' && <ExamManagement />}
        {selectedCard === 'viewresult' && <ResultsViewer />}
        {selectedCard === 'resultbystudent' && <GetResultByStudentAdmin />}
    </Container>
    );
};

export default AdminExamination;
