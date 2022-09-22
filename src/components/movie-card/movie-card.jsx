import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, onAddFavorite, favorite, onRemoveFavorite } = this.props;

    return (
      <Card
        className="movieCard m-2"
        style={{ maxWidth: '100%', height: '400px', textAlign: 'center' }}
      >
        <div style={{ textAlign: 'center' }}>
          <Card.Img
            className="movieImage mt-3"
            variant="top"
            src={movie.ImagePath}
            style={{
              width: '100px',
              height: '150px',
              objectFit: 'cover',
            }}
          />
        </div>

        <Card.Body>
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
            onClick={favorite ? onRemoveFavorite : onAddFavorite}
            className="pl-5"
          >
            {favorite ? '✕' : '♡'}
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

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
