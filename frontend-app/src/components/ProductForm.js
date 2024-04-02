import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Form, Button, Row, Col } from 'react-bootstrap';

function ProductForm({ addProduct, updateProduct, editing, setEditing, currentProduct }) {
    const initialFormState = { id: null, name: '', description: '', price: '', stock: '' };
    const [product, setProduct] = useState(initialFormState);


    // The useEffect is a hook to fetch the list of items from the API when the component mounts.
    useEffect(() => {
        if (editing) {
            setProduct(currentProduct);
        }
    }, [currentProduct, editing]);

    const handleSubmit = event => {
        event.preventDefault();
        if (!product.name || !product.description || !product.price || !product.stock) return;
        if (editing) {
            updateProduct(product.id, product);
        } else {
            addProduct(product);
        }
        setProduct(initialFormState);
    };

    const handleChange = event => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    };

    const handleCancel = event => {
        setProduct(initialFormState);
        setEditing(false);
    };
    
    return (
        <Form onSubmit={handleSubmit}>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formProductName">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control type="text" name="name" value={product.name} onChange={handleChange} placeholder="Enter the product name" />
                </Form.Group>

                <Form.Group as={Col} controlId="formProductDescription">
                    <Form.Label>Product Description</Form.Label>
                    <Form.Control type="text" name="description" value={product.description} onChange={handleChange} placeholder="Enter the product description" />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formProductPrice">
                    <Form.Label>Product Price</Form.Label>
                    <Form.Control type="number" name="price" value={product.price} onChange={handleChange} placeholder="Enter the product price" />
                </Form.Group>

                <Form.Group as={Col} controlId="formProductQuantity">
                    <Form.Label>Stock Quantity</Form.Label>
                    <Form.Control type="number" name="stock" value={product.stock} onChange={handleChange} placeholder="Enter the stock level" />
                </Form.Group>
            </Row>

            {editing ? (
                <div>
                    <Button variant="outline-success" type="submit">Update Product</Button>
                    <Button variant="outline-danger" onClick={() => handleCancel()}>Cancel</Button>

                </div>
            ) : (
                <div>
                    <Button variant="outline-success" type="submit">Add product</Button>
                </div>
            )}
        </Form>
    );
}

export default ProductForm;