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
    <Navbar className="navbar-dark bg-dark" sticky="top" expand="lg">
      <Container>
        <Navbar.Brand className="navbar-logo m-1" href="/">
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
                <Link className="nav-link m-1" to={`/users/${user}`}>
                  Profile
                </Link>
                <p className="nav-link m-1" onClick={logOut}>
                  Log Out
                </p>
              </>
            ) : (
              <>
                {' '}
                <Link className="nav-link" to="/">
                  Sign In
                </Link>
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
