import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

import './navbar.scss';

export function Menubar({ user }) {
  onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  };

  const isAuth = () => {
    if (typeof window == 'undefined') {
      return false;
    }
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return false;
    }
  };

  return (
    <Navbar
      className="main-nav"
      sticky="top"
      bg="dark"
      expand="lg"
      variant="dark"
    >
      <Container className="container-fluid">
        <Navbar.Brand className="navbar-logo" href="/">
          <h3>Movio</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {isAuth() && <Nav.Link href={`/users/${user}`}>Profile</Nav.Link>}
            {isAuth() && (
              <Nav.Link
                variant="dark"
                onClick={() => {
                  this.onLoggedOut();
                }}
              >
                Log Out
              </Nav.Link>
            )}
            {!isAuth() && <Nav.Link href="/">Sign-in</Nav.Link>}
            {!isAuth() && <Nav.Link href="/register">Sign-up</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
