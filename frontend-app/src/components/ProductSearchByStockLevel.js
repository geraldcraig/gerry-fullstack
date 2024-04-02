import React, { useState } from 'react';
import { Container, Row, Form, Card, Button, Table } from 'react-bootstrap';
import ProductForm from './ProductForm';
import axios from 'axios';

function ProductSearchByStockLevel() {
    const [stockLevel, setStockLevel] = useState('');
    const [productsByStockLevel, setProductsByStockLevel] = useState([]);
    const [searched, setSearched] = useState(false);
    var [itemsFound, setItemsFound] = useState(false);
    const initialFormState = { id: null, name: '', description: '', price: '', stock: '' };
    const [editing, setEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(initialFormState);

    const baseURL = "http://localhost:8080";


    const handleStockLevelSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/api/products/searchstocklevel?stocklevel=${stockLevel}`);
            setProductsByStockLevel(response.data);
            if (response.data.length > 0) {
                setSearched(true);
                setItemsFound(true);
            }
            else {
                setSearched(true);
                setItemsFound(false);
            }

        } catch (error) {
            console.error(error);
        }
    };

    const deleteProduct = id => {
        fetch(`${baseURL}/api/products/${id}`, {
            method: 'DELETE'
        }).then(() => {
            setProductsByStockLevel(productsByStockLevel.filter(product => product.id !== id))
        });

    };

    const updateProduct = (id, updatedProduct) => {
        setEditing(false);
        fetch(`${baseURL}/api/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProduct)
        }).then(() => {
            setProductsByStockLevel(productsByStockLevel.map(product => (product.id === id ? updatedProduct : product)))
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
                            <h3 style={{ color: 'white', textAlign: 'center' }}>Search By Stock Level</h3>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleStockLevelSearch}>
                                <Form.Group controlId="formName">
                                    <Form.Label>Search Products by Stock Level</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter the stock level"
                                        value={stockLevel}
                                        onChange={(event) => setStockLevel(event.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="outline-info" type="submit">
                                    Search
                                </Button>
                            </Form>
                            <br />
                            {
                                itemsFound && searched ?
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
                                            {productsByStockLevel.map((product) => (
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
                                        (searched && (itemsFound === false)) ?
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

export default ProductSearchByStockLevel;