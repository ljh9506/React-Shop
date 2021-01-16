import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { Row, Col, Image, Card } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from '../components/Product';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);

  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  console.log(products);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Row>
            <Col sm={12} md={6} lg={4} xl={6}>
              <Card className='my-5'>
                <Link to={`/product/123`}>
                  <Card.Img src='/images/sofa.jfif' variant='top'></Card.Img>
                </Link>
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text as='div'>
                    <Rating value={5} text={`3 reviews`} />
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={12} md={6} lg={4} xl={6}>
              <Card className='my-5'>
                <Link to={`/product/123`}>
                  <Card.Img src='/images/sofa.jfif' variant='top'></Card.Img>
                </Link>
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text as='div'>
                    <Rating value={5} text={`3 reviews`} />
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
