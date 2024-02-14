import React from "react";
import ModuleCard from "../../components/shared/ModuleCard";
import AdminModules from "./AdminModules";
import { Card, Container, Row, Col } from 'react-bootstrap';

export default function AdminHome() {
  return (
   
    <Container>
    <Row>
              
                  {AdminModules.map((module) => (
                    <ModuleCard
                      key={module.name}
                      link={module.link}
                      name={module.name}
                    ></ModuleCard>
                  ))}
           
                </Row>
                </Container>
  );
}
