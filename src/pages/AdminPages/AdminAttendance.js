import React, { useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import RecordTeacherAttendance from '../../components/Services/Attendances/RecordTeacherAttendance';
import TeacherReportGenerate from '../../components/Services/Attendances/TeacherReportGenerate';
import StudentResultsPage from '../../components/Services/Attendances/ViewAttendance';
import ViewAttendance from '../../components/Services/Attendances/ViewAttendance';
import ReportGenerate from '../../components/Services/Attendances/ReportGenerate';

const AdminClassManager = () => {
    const [selectedCard, setSelectedCard] = useState(null);

    const cards = [
        { id: 'recordattendance', label: 'Record Teacher Attendance' },
        { id: 'teacherattendance', label: 'Teachers Attendance Report' },
        { id: 'studentattendance', label: 'Student Attendance Report' },
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

        {selectedCard === 'recordattendance' && <RecordTeacherAttendance />}
        {selectedCard === 'teacherattendance' && <TeacherReportGenerate />}
        {selectedCard === 'studentattendance' && <ReportGenerate />}

    </Container>
    );
};

export default AdminClassManager;
