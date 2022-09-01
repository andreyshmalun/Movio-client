import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import { Col, Row } from 'react-bootstrap';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      currentUser: null,
      step: 'login', // can be   login / register / app
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getMovies(accessToken);
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  // onLoggedIn(user) {
  //   this.setState({
  //     currentUser: user,
  //     step: 'app',
  //   });
  // }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      currentUser: authData.user.Username,
      step: 'app',
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios
      .get('https://movio-app.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  toRegister() {
    this.setState({
      step: 'register',
    });
  }

  toLogin() {
    this.setState({
      step: 'login',
    });
  }

  onRegister(newUser) {
    this.setState({
      step: 'app',
      currentUser: newUser,
    });
  }

  render() {
    const { movies, selectedMovie, currentUser, step } = this.state;

    if (step === 'login')
      return (
        <LoginView
          onLoggedIn={(user) => this.onLoggedIn(user)}
          toRegister={() => this.toRegister()}
        />
      );

    if (step === 'register')
      return (
        <RegistrationView
          onRegister={(register) => this.onRegister(register)}
          toLogin={() => this.toLogin()}
        />
      );

    if (!currentUser) {
      return null;
    }

    if (movies.length === 0)
      return <div className="main-view">The list is empty!</div>;

    return (
      <Row className="main-view justify-content-md-center">
        {selectedMovie ? (
          <Col md={8}>
            <MovieView
              movie={selectedMovie}
              onBackClick={(newSelectedMovie) => {
                this.setSelectedMovie(newSelectedMovie);
              }}
            />
          </Col>
        ) : (
          movies.map((movie) => (
            <Col lg={3} md={4} sm={6}>
              <MovieCard
                key={movie._id}
                movie={movie}
                onMovieClick={(movie) => {
                  this.setSelectedMovie(movie);
                }}
              />
            </Col>
          ))
        )}
      </Row>
    );
  }
}
