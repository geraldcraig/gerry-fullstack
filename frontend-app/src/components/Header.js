import React from "react";
import { Container,Row, Col } from "react-bootstrap";
import headingimage from '../images/books.jpg';

const Header = () => {
    return (
        <Container>
            <Row>
                <Col md={2}>
                </Col>
                <Col md={8}>
                    <img src={headingimage} alt="headingimage" style={{ width: '100%'}}/>
                </Col>
                <Col md={2}>
                </Col>
            </Row>
        </Container>
    );
};

export default Header;