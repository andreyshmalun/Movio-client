import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

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
          <Button onClick={() => onMovieClick(movie)} variant="link">
            Open
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
  onMovieClick: PropTypes.func.isRequired,
};
