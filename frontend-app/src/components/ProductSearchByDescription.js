import React, { useState } from 'react';
import { Container, Row, Form, Card, Button, Table } from 'react-bootstrap';
import ProductForm from './ProductForm';
import axios from 'axios';

function ProductSearchByDescription() {
    const [description, setDescription] = useState('');
    const [productsbydescription, setProductsByDescription] = useState([]);
    const [searched, setSearched] = useState(false);
    var [itemsfound, setItemsfound] = useState(false);
    const initialFormState = { id: null, name: '', description: '', price: '', stock: '' };
    const [editing, setEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(initialFormState);

    const baseURL = "http://localhost:8080";


    const handleDescriptionSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/api/products/searchdescription?description=${description}`);
            setProductsByDescription(response.data);
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

    const deleteProduct = id => {
        fetch(`${baseURL}/api/products/${id}`, {
            method: 'DELETE'
        }).then(() => {
            setProductsByDescription(productsbydescription.filter(product => product.id !== id))
        });

    };

    const updateProduct = (id, updatedProduct) => {
        setEditing(false);
        fetch(`${baseURL}/api/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProduct)
        }).then(() => {
            setProductsByDescription(productsbydescription.map(product => (product.id === id ? updatedProduct : product)))
        });
    };

    const editRow = product => {
        setEditing(true);
        setCurrentProduct({ id: product.id, name: product.name, description: product.description, price: product.price, stock: product.stock })
    };

    return (
        <>
            <Container>
                <Row>
                    <Card className="card border-info mb-3" style={{ width: '120rem' }}>
                        <Card.Header style={{ color: '#85DDE9', backgroundColor: '#85DDE9' }} >
                            <h3 style={{ color: 'white', textAlign: 'center' }}>Search By Product Description</h3>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleDescriptionSearch}>
                                <Form.Group controlId="formDescription">
                                    <Form.Label>Search Products by Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter product description"
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="outline-info" type="submit">
                                    Search
                                </Button>
                            </Form>
                            <br />
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
                                                <th>Edit Product</th>
                                                <th>Delete Product</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {productsbydescription.map((product) => (
                                                <tr key={product.id}>
                                                    <td>{product.id}</td>
                                                    <td>{product.name}</td>
                                                    <td>{product.description}</td>
                                                    <td>{product.price}</td>
                                                    <td>{product.stock}</td>
                                                    <td>
                                                        <Button variant="outline-primary" onClick={() => editRow(product)}>Edit</Button>
                                                    </td>
                                                    <td>
                                                        <Button variant="outline-danger" onClick={() => deleteProduct(product.id)}>Delete</Button>
                                                    </td>
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

                {editing ? (
                        <Row>
                            <Card className="card border-danger mb-3" style={{ width: '120' }} >
                                <Card.Header style={{ color: 'white  ', backgroundColor: 'red' }}>
                                    <h3 style={{ color: 'white', textAlign: 'center' }}>Edit Product</h3>
                                </Card.Header >
                                <Card.Body>
                                    <div>
                                        <ProductForm
                                            editing={editing}
                                            setEditing={setEditing}
                                            currentProduct={currentProduct}
                                            updateProduct={updateProduct}
                                        />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Row>)
                    : (<Row><div></div></Row>)}

            </Container>
        </>
    );
}

export default ProductSearchByDescription;