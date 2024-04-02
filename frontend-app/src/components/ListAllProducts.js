import React, {useEffect, useState} from "react";
import {Button, Card, Container, Row} from "react-bootstrap";
import ProductForm from "./ProductForm";
import AddReviewForm from "./AddReviewForm";

function ListAllProducts() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(false);
  const initialFormState = {
    id: null,
    name: "",
    description: "",
    price: "",
    stock: "",
  };
  const [currentProduct, setCurrentProduct] = useState(initialFormState);

  const [reviews, setReviews] = useState([]);
  const [reviewEditing, setReviewEditing] = useState(false);
  const initialReviewState = {
    id: null,
    name: "",
    description: "",
    review: "",
  };
  const [currentProductReview, setCurrentProductReview] = useState(initialReviewState);

  const baseURL = "http://localhost:8080";

  // The useEffect is a hook to fetch the list of items from the API when the component mounts.
  // Using fetch
  useEffect(() => {
    fetch(`${baseURL}/api/products`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  // useEffect(() => {
  //   fetch(`${baseURL}/api/reviews`)
  //       .then(response => response.json())
  //       .then(data => setReviews(data));
  // }, []);

  // Using fetch
  const addProduct = (product) => {
    fetch(`${baseURL}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts([...products, data]);
      });
  };

  // Using fetch
  const deleteProduct = (id) => {
    fetch(`${baseURL}/api/products/${id}`, {
      method: "DELETE",
    }).then(() => {
      setProducts(products.filter((product) => product.id !== id));
    });
  };

  // Using fetch
  const updateProduct = (id, updatedProduct) => {
    setEditing(false);
    fetch(`${baseURL}/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    }).then(() => {
      setProducts(
        products.map((product) =>
          product.id === id ? updatedProduct : product
        )
      );
    });
    console.log(updatedProduct);
  };

  const addProductReview = (review) => {
    fetch(`${baseURL}/api/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review),
    })
        .then(response => response.json())
        .then(data => {
          setReviews([...reviews, data])
        });
  };

  const updateProductReview = (id, updatedReview) => {
    setEditing(false);
    fetch(`${baseURL}/api/reviews/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedReview)
    }).then(() => {
      setReviews(reviews.map(review => (review.id === id ? updatedReview : review)))
    });
  };

  const editRow = (product) => {
    setEditing(true);
    setCurrentProduct({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });
    console.log(currentProduct);
  };

  const reviewRow = (product) => {
    setReviewEditing(true);
    setCurrentProductReview({
      // id: product.id,
      name: product.name,
      description: product.description,
    });
    console.log(currentProductReview);
  };

  return (
    <>
      <Container>
        <Row>
          <Card
            className="card border-primary mb-3"
            style={{ width: "120rem" }}
          >
            <Card.Header style={{ backgroundColor: "green" }}>
              <h3 style={{ color: "white", textAlign: "center" }}>
                Product List
              </h3>
            </Card.Header>
            <Card.Body>
              <div>
                <table className="table table-sm table-striped table-bordered table-hover ">
                  <thead className="thead-light">
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Edit Product</th>
                      <th>Delete Product</th>
                      <th>Review Product</th>
                    </tr>
                  </thead>

                  <tbody style={{ textAlign: "left" }}>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td style={{ textAlign: "right" }}>{product.stock}</td>
                        <td style={{ textAlign: "center" }}>
                          <Button
                            variant="outline-primary"
                            onClick={() => editRow(product)}
                          >
                            Edit
                          </Button>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Button
                            variant="outline-danger"
                            onClick={() => deleteProduct(product.id)}
                          >
                            Delete
                          </Button>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Button
                            variant="outline-primary"
                            onClick={() => reviewRow(product)}
                          >
                            Add
                          </Button>
                        </td>
                        {/*<td style={{ textAlign: "center" }}>*/}
                        {/*  <Link to="/reviews" state={{name: product.name, description: product.description, review: "review"}}>*/}
                        {/*    <Button variant="outline-primary" onClick={() => reviewRow(product)}>Add</Button>*/}
                        {/*  </Link>*/}
                        {/*</td>*/}
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
            <Card className="card border-danger mb-3" style={{ width: "120" }}>
              <Card.Header style={{ color: "white ", backgroundColor: "red" }}>
                <h3 style={{ color: "white", textAlign: "center" }}>
                  Edit Product
                </h3>
              </Card.Header>
              <Card.Body>
                <div>
                  <ProductForm
                    editing={editing}
                    setEditing={setEditing}
                    currentProduct={currentProduct}
                    updateProduct={updateProduct}
                    // reviewProduct={reviewProduct}
                  />
                </div>
              </Card.Body>
            </Card>
          ) : reviewEditing ? (
            <Container>
              <Row>
                <Card
                  className="card border-danger mb-3"
                  style={{ width: "120" }}
                >
                  <Card.Header
                    style={{ color: "white ", backgroundColor: "blue" }}
                  >
                    <h3 style={{ color: "white", textAlign: "center" }}>
                      Add Product Review
                    </h3>
                  </Card.Header>
                  <Card.Body>
                    <div>
                      <AddReviewForm
                        // reviewEditing={reviewEditing}
                        // setReviewEditing={setReviewEditing}
                        // currentProductReview={currentProductReview}
                        // updateProductReview={updateProductReview}
                        addProductReview={addProductReview}
                      />
                    </div>
                    {/*<div>*/}
                    {/*  <AddReviewForm addProductReview={addProductReview} />*/}
                    {/*</div>*/}
                  </Card.Body>
                </Card>
              </Row>
            </Container>
          ) : (
            <Card className="card border-success mb-3">
              <Card.Header
                style={{ color: "white ", backgroundColor: "green" }}
              >
                <h3 style={{ color: "white", textAlign: "center" }}>
                  Add New Product Details
                </h3>
              </Card.Header>
              <Card.Body>
                <div>
                  <ProductForm addProduct={addProduct} />
                </div>
              </Card.Body>
            </Card>
          )}
        </Row>
      </Container>
    </>
  );
}

export default ListAllProducts;
