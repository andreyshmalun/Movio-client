import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { setMovies, setUser } from '../../actions/actions';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Figure } from 'react-bootstrap';
class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      FormEmail: null,
      FormUsername: null,
      FavoriteMovies: [],
    };
  }

  componentDidMount() {
    this.setState({ FavoriteMovies: this.props.user.FavoriteMovies });
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
    window.open('/', '_self');
  }

  editUser = (e) => {
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios
      .put(
        `https://movio.onrender.com/users/${Username}`,
        {
          Username: this.state.FormUsername,
          Password: this.state.Password,
          Email: this.state.FormEmail,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
        });

        localStorage.setItem('user', response.data.Username);
        const data = response.data;
        alert('Profile is updated!');
        window.open(`/users/${response.data.Username}`, '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //DELETE USER
  onDeleteUser() {
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios
      .delete(`https://movio.onrender.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        alert('Profile has been deleted!');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open(`/`, '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //DELETE MOVIE FROM FAVORITE LIST
  RemoveFavorite = (movie) => {
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios
      .delete(
        `https://movio.onrender.com/users/${Username}/movies/${movie._id}`,

        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        this.setState({ FavoriteMovies: response.data.FavoriteMovies });
      })
      .catch((error) => {
        console.log('Deleting a movie from user list failed.', error);
      });
  };

  setFormUsername(value) {
    this.setState({
      FormUsername: value,
    });
    this.FormUsername = value;
  }

  setPassword(value) {
    this.setState({
      Password: value,
    });
    this.Password = value;
  }

  setFormEmail(value) {
    this.setState({
      FormEmail: value,
    });
    this.FormEmail = value;
  }

  render() {
    const { movies } = this.props;
    const { Username, Email } = this.props.user;
    const { FavoriteMovies } = this.state;

    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md={5} className="mt-2 ">
            <Card>
              <Card.Header>User info</Card.Header>
              <Card.Body>
                <Card.Text>Name: {Username}</Card.Text>
                <Card.Text>Email: {Email}</Card.Text>
              </Card.Body>
            </Card>

            <Card className="mt-3">
              <Card.Header>Update profile</Card.Header>
              <Card.Body>
                <Form
                  className="update-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    this.editUser(
                      e,
                      this.FormUsername,
                      this.Password,
                      this.FormEmail
                    );
                  }}
                >
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="FormUsername"
                      placeholder="New Username"
                      onChange={(e) => this.setFormUsername(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="Password"
                      placeholder="New Password"
                      onChange={(e) => this.setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="FormEmail"
                      placeholder="New Email"
                      onChange={(e) => this.setFormEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Button variant="dark" type="submit">
                      Update User
                    </Button>
                    <Button
                      className="m-3"
                      variant="danger"
                      onClick={() => this.onDeleteUser()}
                    >
                      Delete User
                    </Button>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="mt-5">
          <Card.Body>
            <Row>
              <Col xs={12}>
                <h4>Favorite Movies</h4>
              </Col>
            </Row>
            <Row>
              {FavoriteMovies.map((_id) => {
                const movie = movies?.find((m) => m._id === _id);
                if (!movie) {
                  return null;
                }

                return (
                  <Col key={_id}>
                    <Figure>
                      <Link to={`/movies/${_id}`}>
                        <Figure.Image
                          width={200}
                          src={movie.ImagePath}
                          alt={movie.Title}
                        />
                        <Figure.Caption>{movie.Title}</Figure.Caption>
                      </Link>
                      <Button
                        className="my-2"
                        variant="outline-danger"
                        onClick={() => this.RemoveFavorite(movie)}
                      >
                        Delete from list
                      </Button>
                    </Figure>
                  </Col>
                );
              })}
            </Row>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies, user: state.user };
};

export default connect(mapStateToProps, { setMovies, setUser })(ProfileView);
