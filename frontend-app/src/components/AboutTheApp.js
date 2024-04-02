import React from "react";
import Card from 'react-bootstrap/Card';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AboutTheApp = () => {
    return (
        <div className="container">
            <Card>
                <Card.Header>
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-10">
                            <h2 align="center">Stock Control Application Using React and Spring Boot</h2>
                            <h2 align="center">Gerry Byrne</h2>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Title>Creating a frontend application as a React Single Page Application (SPA)</Card.Title>
                    <Card.Text>
                    <br></br>
                    We will build components that use the Fetch API to connect with a h2 backend database and enable a user to:
                    <br></br>
                    <br></br>
                    <ul>
                        <li>add stock items to the database (a <b>C</b>REATE request)</li>
                        <li>display stock items from the database (a <b>R</b>EAD request)</li>
                        <li>update stock items in the database (an <b>U</b>PDATE request)</li>
                        <li>delete stock items from the database (a <b>D</b>ELETE request)</li>
                    </ul>
                    <b>These CRUD requests equate to the HTTP methods - POST, GET, UPDATE and DELETE</b>
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-12">
                            <h1 style={{ color: 'blue', textAlign: 'center' }}>About The App</h1>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </Card.Footer> 
            </Card>
        </div>
    );
}

export default AboutTheApp;