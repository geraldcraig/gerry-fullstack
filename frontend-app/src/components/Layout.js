import { Outlet, NavLink } from "react-router-dom";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Card } from 'react-bootstrap';
import Header from "./Header";
import Footer from './Footer';

const Layout = () => {
  const style = ({ isActive }) => ({
    fontWeight: isActive ? "bold" : "normal",
  });

  return (
    <>
  <Container className="card border-primary mb-12">
                <Row className="card border-primary mb-12">
                    <Card style={{ width: '120rem' }}>
                        <Header />
                        <h1 style={{ color: 'blue', textAlign: 'center' }}>Stock Control Application</h1>
                        <h2 style={{ color: 'blue', textAlign: 'center' }}>Full Stack Development</h2>
                        <h3 style={{ color: 'blue', textAlign: 'center' }}>HTML-CSS-Javascript-ReactJS</h3>
                        <Card.Header style={{ color: 'red' }}></Card.Header>
                    </Card>

                    <Card.Body>
                        <nav>
                          <div className="container">
                            <div className="table-responsive">
                              <table className="table">
                                <thead>
                                <tr>
                                  <th><NavLink to="/messages" style={style}>Messages</NavLink></th>
                                  <th><NavLink to="/abouttheapp" style={style}>About The App</NavLink></th>
                                  <th><NavLink to="/listallproducts" style={style}>List All Products</NavLink></th>
                                  <th><NavLink to="/productsearchbyname" style={style}>ProductSearchByName</NavLink></th>
                                  <th><NavLink to="/producsearchtbydescription" style={style}>ProductSearchByDescription</NavLink></th>
                                  <th><NavLink to="/producsearchbystocklevel" style={style}>ProductSearchByStockLevel</NavLink></th>
                                  <th><NavLink to="/reviews" style={style}>Product Reviews</NavLink></th>
                                </tr>
                                </thead>
                              </table>
                            </div>
                            </div>
                        </nav>
                      <main style={{ padding: '1rem 0'}}>
                        <Outlet />
                      </main>
                    </Card.Body>
                    <Card.Footer>
                        <Row>
                            <Footer />
                        </Row>
                    </Card.Footer>
                </Row>
            </Container>
        </>
    );
};

export default Layout;
