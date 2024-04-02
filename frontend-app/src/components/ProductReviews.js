import React, { useState, useEffect } from 'react';
import { Container, Row, Button, Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

import ProductReviewForm from "./ProductReviewForm";

function ProductReviews() {
    const [reviews, setReviews] = useState([]);
    const [editing, setEditing] = useState(false);
    const initialFormState = { id: null, name: '', description: '', review: '' };
    const [currentReview, setCurrentReview] = useState(initialFormState);

    const baseURL = "http://localhost:8080";

    let location = useLocation();
    console.log(location)

    // The useEffect is a hook to fetch the list of items from the API when the component mounts.
    // Using fetch
    useEffect(() => {
        fetch(`${baseURL}/api/reviews`)
            .then(response => response.json())
            .then(data => setReviews(data));
    }, []);

    // Using fetch
    const addReview = review => {
        fetch(`${baseURL}/api/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(review)
        })
            .then(response => response.json())
            .then(data => {
                setReviews([...reviews, data])
            });
    };

    // Using fetch
    const deleteReview = id => {
        fetch(`${baseURL}/api/reviews/${id}`, {
            method: 'DELETE'
        }).then(() => {
            setReviews(reviews.filter(review => review.id !== id))
        });
    };

    // Using fetch
    const updateReview = (id, updatedReview) => {
        setEditing(false);
        fetch(`${baseURL}/api/reviews/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedReview)
        }).then(() => {
            setReviews(reviews.map(review => (review.id === id ? updatedReview : review)))
        });
    };

    const editRow = review => {
        setEditing(true);
        setCurrentReview({ id: review.id, name: review.name, description: review.description, review: review.review })
    };

    return (
        <>
            <Container>
                <Row>
                    <Card className="card border-primary mb-3" style={{ width: '120rem' }}>
                        <Card.Header style={{ backgroundColor: 'green' }}>
                            <h3 style={{ color: 'white', textAlign: 'center' }}>Product Reviews</h3>
                        </Card.Header>
                        <Card.Body>
                            <div>
                                <table className="table table-sm table-striped table-bordered table-hover ">
                                    <thead className="thead-light">
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Review</th>
                                        <th>Edit Review</th>
                                        <th>Delete Review</th>
                                    </tr>
                                    </thead>

                                    <tbody style={{ textAlign: 'left' }}>
                                    {reviews.map(review => (
                                        <tr key={review.id}>
                                            <td>{review.name}</td>
                                            <td>{review.description}</td>
                                            <td>{review.review}</td>

                                            <td style={{ textAlign: 'center' }}>
                                                <Button variant="outline-primary" onClick={() => editRow(review)}>Edit</Button>
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                                <Button variant="outline-danger" onClick={() => deleteReview(review.id)}>Delete</Button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>

            <Container>
                <Row>
                    {editing ? (
                        <Card className="card border-danger mb-3" style={{ width: '120' }} >
                            <Card.Header style={{ color: 'white ', backgroundColor: 'red' }}>
                                <h3 style={{ color: 'white', textAlign: 'center' }}>Edit Review</h3>
                            </Card.Header >
                            <Card.Body>
                                <div>
                                    <ProductReviewForm
                                        editing={editing}
                                        setEditing={setEditing}
                                        currentReview={currentReview}
                                        updateReview={updateReview}
                                    />
                                </div>
                            </Card.Body>
                        </Card>
                    ) : (<Card className="card border-success mb-3" >
                        <Card.Header style={{ color: 'white ', backgroundColor: 'green' }}>
                            <h3 style={{ color: 'white', textAlign: 'center' }}>Add Product Review</h3>
                        </Card.Header>
                        <Card.Body>
                            <div>
                                <ProductReviewForm addReview={addReview} />
                            </div>
                        </Card.Body>
                    </Card>)}
                </Row>
            </Container>
        </>
    );
}
export default ProductReviews;


