import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import Navbar from '../navbar/navbar';

import { Col, Row } from 'react-bootstrap';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      step: 'login', // can be   login / register / app
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    if (accessToken && user) {
      this.setState({
        step: 'app',
        user,
      });
      this.getMovies(accessToken);
    } else {
      this.setState({
        step: 'login',
      });
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
      step: 'app',
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
      step: 'login',
    });
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
      user: newUser,
    });
  }

  render() {
    const { movies, selectedMovie, user, step } = this.state;
    if (step === 'login')
      return (
        <LoginView
          onLoggedIn={(authData) => this.onLoggedIn(authData)}
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

    if (!user) {
      return null;
    }

    if (movies.length === 0)
      return <div className="main-view">The list is empty!</div>;

    return (
      // <div>
      //   <Navbar onLoggedOut={() => this.onLoggedOut()} />
      //   <Row className="main-view mt-5">
      //     {selectedMovie ? (
      //       <Col md={8}>
      //         <MovieView
      //           movie={selectedMovie}
      //           onBackClick={(newSelectedMovie) => {
      //             this.setSelectedMovie(newSelectedMovie);
      //           }}
      //         />
      //       </Col>
      //     ) : (
      //       movies.map((movie) => (
      //         <Col key={movie._id} lg={3} md={4} sm={5}>
      //           <MovieCard
      //             key={movie._id}
      //             movie={movie}
      //             onMovieClick={(movie) => {
      //               this.setSelectedMovie(movie);
      //             }}
      //           />
      //         </Col>
      //       ))
      //     )}
      //   </Row>
      // </div>

      <Router>
        <Navbar onLoggedOut={() => this.onLoggedOut()} />
        <Row className="main-view justify-content-md-center">
          <Routes>
            <Route
              exact
              path="/"
              render={() => {
                return movies.map((m) => (
                  <Col md={3} key={m._id}>
                    <MovieCard movie={m} />
                  </Col>
                ));
              }}
            />
            <Route
              path="/movies/:movieId"
              render={({ match }) => {
                return (
                  <Col md={8}>
                    <MovieView
                      movie={movies.find((m) => m._id === match.params.movieId)}
                    />
                  </Col>
                );
              }}
            />
          </Routes>
        </Row>
      </Router>
    );
  }
}
