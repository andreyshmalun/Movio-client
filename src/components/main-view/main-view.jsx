import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { setMovies, setUser } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';

import { LoginView } from '../login-view/login-view';

import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';
import { Menubar } from '../navbar/navbar';
import ProfileView from '../profile-view/profile-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class MainView extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getMovies(accessToken);
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    const user = localStorage.getItem('user');
    axios
      .get(`https://movio.onrender.com/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const findUser = response.data.find((u) => u.Username === user);
        this.props.setUser(findUser);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getMovies(token) {
    axios
      .get('https://movio.onrender.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
    this.getUser(authData.token);
  }

  render() {
    let { movies, user } = this.props;
    return (
      <Router>
        <Menubar user={user} />
        <Row className="main-view justify-content-md-center">
          <Route
            exact
            path="/"
            render={() => {
              if (!user.Username)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return <MoviesList movies={movies} />;
            }}
          />
          <Route
            path="/register"
            render={() => {
              if (user.Username) return <Redirect to="/" />;
              return (
                <Col>
                  <RegistrationView />
                </Col>
              );
            }}
          />

          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              if (!user.Username)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/directors/:name"
            render={({ match, history }) => {
              if (!user.Username)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <DirectorView
                    director={
                      movies.find((m) => m.Director.Name === match.params.name)
                        .Director
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/genres/:name"
            render={({ match, history }) => {
              if (!user.Username)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <GenreView
                    genre={
                      movies.find((m) => m.Genre.Name === match.params.name)
                        .Genre
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path={`/users/${user.Username}`}
            render={({ history }) => {
              if (!user.Username) return <Redirect to="/" />;
              return (
                <Col>
                  <ProfileView
                    onBackClick={() => history.goBack()}
                    movies={movies}
                  />
                </Col>
              );
            }}
          />
        </Row>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies, user: state.user };
};

export default connect(mapStateToProps, { setMovies, setUser })(MainView);
