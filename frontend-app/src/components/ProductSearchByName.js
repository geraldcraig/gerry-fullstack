import React, { useState } from 'react';
import { Container, Row, Form, Card, Button, Table } from 'react-bootstrap';
import axios from 'axios';

function ProductSearchByName() {
    const [name, setName] = useState('');
    const [productsByName, setProductsByName] = useState([]);
    const [searched, setSearched] = useState(false);
    var [itemsfound, setItemsfound] = useState(false);
    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/api/products/searchname?name=${name}`);
            setProductsByName(response.data);
            if (response.data.length > 0) {
                setSearched(true);
                setItemsfound(true);
            }
            else {
                setSearched(true);
                setItemsfound(false);
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <Container>
                <Row>
                    <Card className="card border-primary mb-3" style={{ width: '120rem' }} >
                        <Card.Header style={{ backgroundColor: 'blue' }}>
                            <h3 style={{ color: 'white', textAlign: 'center' }}>Search By Product Name</h3>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSearch}>
                                <Form.Group controlId="formName">
                                    <Form.Label>Search Products by Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter product name"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="outline-primary" type="submit">
                                    Search
                                </Button>
                            </Form><br />
                            {
                                itemsfound && searched ?
                                    (
                                        <Table striped bordered hover>
                                            <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Description</th>
                                                <th>Price</th>
                                                <th>Stock Level</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {productsByName.map((product) => (
                                                <tr key={product.id}>
                                                    <td>{product.id}</td>
                                                    <td>{product.name}</td>
                                                    <td>{product.description}</td>
                                                    <td>{product.price}</td>
                                                    <td>{product.stock}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </Table>
                                    ) :
                                    (
                                        (searched && (itemsfound === false)) ?
                                            (<h1 style={{ color: 'red', textAlign: 'center' }}>No matches found</h1>) : (<div></div>)
                                    )
                            }
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </>
    );
}
export default ProductSearchByName
