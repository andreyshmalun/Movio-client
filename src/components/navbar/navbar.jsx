import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Header(props) {
  return (
    <Container>
      <Navbar expand="lg" variant="light" bg="light">
        <Container>
          <Button
            onClick={() => {
              props.onLoggedOut();
            }}
          >
            LogOut
          </Button>
        </Container>
      </Navbar>
    </Container>
  );
}

export default Header;
