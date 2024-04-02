import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function AddReviewForm({
  addProductReview,
  updateProductReview,
  reviewEditing,
  setReviewEditing,
  currentProductReview,
}) {
  const initialFormState = { id: null, name: "", description: "", review: "" };
  const [review, setReview] = useState(initialFormState);

  // The useEffect is a hook to fetch the list of items from the API when the component mounts.
  useEffect(() => {
      if (reviewEditing) {
          setReview(currentProductReview);
      }
  }, [currentProductReview, reviewEditing]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!review.name || !review.description || !review.review) return;
    if (reviewEditing) {
      updateProductReview(review.id, review);
    } else {
      addProductReview(review);
    }
    setReview(initialFormState);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReview({ ...review, [name]: value });
  };

  const handleCancel = (event) => {
    setReview(initialFormState);
    setReviewEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formReviewName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={review.name}
            onChange={handleChange}
            placeholder="Enter the product name"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formReviewDescription">
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={review.description}
            onChange={handleChange}
            placeholder="Enter the product description"
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formReview">
          <Form.Label>Add Product Review</Form.Label>
          <Form.Control
            type="text"
            name="review"
            value={review.review}
            onChange={handleChange}
            placeholder="Enter the product review"
          />
        </Form.Group>
      </Row>

      <div>
        {/*<td style={{ textAlign: "center" }}>*/}
        {/*  <Link to="/reviews" state={{name: product.name, description: product.description, review: "review"}}>*/}
        {/*    <Button variant="outline-primary" onClick={() => reviewRow(product)}>Add</Button>*/}
        {/*  </Link>*/}
        {/*</td>*/}
        {/*<Link to="/reviews">*/}
          <Button variant="outline-success" type="submit">
            Add Review
          </Button>
        {/*</Link>*/}
        <Button variant="outline-danger" onClick={() => handleCancel()}>
          Cancel
        </Button>
      </div>
    </Form>
  );
}

export default AddReviewForm;
