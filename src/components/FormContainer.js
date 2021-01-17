import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className='justify-content-center'>
        <Col xs={12} md={6} className=''>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
