import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg='light' variant='light' expand='lg' collapseOnSelect>
      <Container>
        <Navbar.Brand href='/'>THE DESIGN SHOP</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <Nav.Link href='/'>
              <i className='fas fa-home'></i> Home
            </Nav.Link>
            <Nav.Link href='/link'>
              <i className='fas fa-user'></i>Link
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
