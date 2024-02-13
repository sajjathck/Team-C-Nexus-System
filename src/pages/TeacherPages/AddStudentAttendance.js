import React, { useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import TeacherReportGenerate from '../../components/Services/Attendances/TeacherReportGenerate';
import ReportGenerate from '../../components/Services/Attendances/ReportGenerate';
import AddAttendanceStudent from '../../components/Services/Attendances/AddAttendanceStudent';
import AttendanceForteacher from '../../components/Services/Attendances/AttendanceForteacher';

const AddStudentAttendance = () => {
    const [selectedCard, setSelectedCard] = useState(null);

    const cards = [
        { id: 'recordattendance', label: 'Record Student Attendance' },
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

        {selectedCard === 'recordattendance' && <AddAttendanceStudent />}
        {selectedCard === 'teacherattendance' && <AttendanceForteacher />}
        {selectedCard === 'studentattendance' && <ReportGenerate />}

    </Container>
    );
};

export default AddStudentAttendance;
