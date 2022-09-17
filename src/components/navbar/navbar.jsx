import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './navbar.scss';

export const Menubar = ({ user }) => {
  const getToken = () => {
    let userToken = localStorage.getItem('token');
    return userToken ? userToken : false;
  };

  const logOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  };

  return (
    <Navbar
      className="main-nav"
      sticky="top"
      bg="dark"
      expand="lg"
      variant="dark"
    >
      <Container>
        <Navbar.Brand className="navbar-logo" href="/">
          <h3>Movio</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav className="justify-content-end">
            {getToken() ? (
              <>
                {' '}
                <Link className="nav-link mr-2" to={`/users/${user}`}>
                  Profile
                </Link>
                <p className="nav-link" onClick={logOut}>
                  Log Out
                </p>
              </>
            ) : (
              <>
                {' '}
                <Link className="nav-link" to="/register">
                  Sign Up
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
