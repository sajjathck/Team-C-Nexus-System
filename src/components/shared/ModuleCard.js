import { Link } from "react-router-dom";
import { Card, Container, Row, Col } from 'react-bootstrap';
import lightColors from '../../assets/LightColors'
function ModuleCard({ link, name }) {
  function getRandomLightColor() {
    const index = Math.floor(Math.random() * lightColors.length);
    return lightColors[index];
  }
  
  return (
<Col sm={6} md={4} lg={6} key={name}>
      <Link to={link} className="card-title text-decoration-none">
      <Card className='mb-3 ' style={{ cursor: 'pointer' }}>
      <Card.Body style={{ backgroundColor: getRandomLightColor() }}>
      <Card.Title>{name}</Card.Title>
            </Card.Body>
          </Card>
      </Link>
      </Col>
  );
}
export default ModuleCard;
