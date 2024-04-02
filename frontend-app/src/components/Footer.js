import React from "react";
import { Container,Row, Col } from "react-bootstrap";

const Footer = () => {
    return (
        <Container>
            <Row><hr style={{ color: "blue" }}></hr></Row>
            <Row style={{ color: 'blue', textAlign: 'center' }}>
                <Col md={2}><h3>ReactJS</h3></Col>
                <Col md={8}><h3>Fullstack Development Project Application</h3></Col>
                <Col md={2}><h3>Gerry Byrne</h3></Col>
            </Row>
            <Row>
                <Col md={8}></Col>
            </Row>
            <Row><hr style={{ color: 'green' }}></hr></Row>
        </Container>
    );
};

export default Footer;