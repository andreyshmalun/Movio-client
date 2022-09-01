import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Header(props) {
  return (
    <Navbar expand="lg" variant="light" bg="light" fixed="top">
      <Container>
        <Button
          onClick={() => {
            props.onLoggedOut();
          }}
        >
          Log Out
        </Button>
      </Container>
    </Navbar>
  );
}

export default Header;
