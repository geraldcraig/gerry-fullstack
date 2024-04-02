import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Form, Button, Row, Col } from 'react-bootstrap';

function ProductReviewForm({ addReview, updateReview, editing, setEditing, currentReview }) {
    const initialFormState = { id: null, name: '', description: '', review: '' };
    const [review, setReview] = useState(initialFormState);


    // The useEffect is a hook to fetch the list of items from the API when the component mounts.
    useEffect(() => {
        if (editing) {
            setReview(currentReview);
        }
    }, [currentReview, editing]);

    const handleSubmit = event => {
        event.preventDefault();
        if (!review.name || !review.description || !review.review) return;
        if (editing) {
            updateReview(review.id, review);
        } else {
            addReview(review);
        }
        setReview(initialFormState);
    };

    const handleChange = event => {
        const { name, value } = event.target;
        setReview({ ...review, [name]: value });
    };

    const handleCancel = event => {
        setReview(initialFormState);
        setEditing(false);
    };
    
    return (
        <Form onSubmit={handleSubmit}>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formReviewName">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control type="text" name="name" value={review.name} onChange={handleChange} placeholder="Enter the product name" />
                </Form.Group>

                <Form.Group as={Col} controlId="formReviewDescription">
                    <Form.Label>Product Description</Form.Label>
                    <Form.Control type="text" name="description" value={review.description} onChange={handleChange} placeholder="Enter the product description" />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formReview">
                    <Form.Label>Product Review</Form.Label>
                    <Form.Control type="text" name="review" value={review.review} onChange={handleChange} placeholder="Enter the product review" />
                </Form.Group>
            </Row>

            {editing ? (
                <div>
                    <Button variant="outline-success" type="submit">Update Review</Button>
                    <Button variant="outline-danger" onClick={() => handleCancel()}>Cancel</Button>

                </div>
            ) : (
                <div>
                    <Button variant="outline-success" type="submit">Add review</Button>
                </div>
            )}
        </Form>
    );
}

export default ProductReviewForm;