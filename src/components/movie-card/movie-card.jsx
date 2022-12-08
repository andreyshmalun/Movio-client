import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { setUser } from '../../actions/actions';

import './movie-card.scss';

class MovieCard extends React.Component {
  //ADD MOVIE TO FAVORITE LIST
  AddFavorite = (movie) => {
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios
      .post(
        `https://movio.onrender.com/users/${Username}/movies/${movie._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        this.props.setUser(response.data);
      })
      .catch((error) => {
        console.log('Adding a movie to user list failed.', error);
      });
  };

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
        this.props.setUser(response.data);
      })
      .catch((error) => {
        console.log('Deleting a movie from user list failed.', error);
      });
  };

  render() {
    const { movie } = this.props;

    return (
      <Card
        className="h-100 gap-1"
        style={{
          maxWidth: '100%',
          textAlign: 'center',
          marginLeft: '10px',
          marginRight: '10px',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <Card.Img
            className=""
            variant="top"
            src={movie.ImagePath}
            style={{
              width: '100%',
              height: '450px',
              objectFit: 'cover',
            }}
          />
        </div>

        <Card.Body className="p-2">
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text className="movieDescription">
            {movie.Description}
          </Card.Text>

          <Link to={`/movies/${movie._id}`}>
            <Button variant="outline-dark" className="m-3">
              See more
            </Button>
          </Link>
          <Button
            variant="outline-danger"
            onClick={() =>
              this.props.user?.FavoriteMovies.includes(movie._id)
                ? this.RemoveFavorite(movie)
                : this.AddFavorite(movie)
            }
            className="pl-5"
          >
            {this.props.user?.FavoriteMovies?.includes(movie._id) ? '✕' : '♡'}
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { movies, user } = state;
  return { movies, user };
};

export default connect(mapStateToProps, { setUser })(MovieCard);

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
    }),
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func,
};
