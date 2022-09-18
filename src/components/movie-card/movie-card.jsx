import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {
  // AddFavorite = (movie) => {
  //   const Username = localStorage.getItem('user');
  //   const token = localStorage.getItem('token');
  //   console.log(this.props);
  //   axios
  //     .post(
  //       `https://movio-app.herokuapp.com/users/${Username}/movies/${movie._id}`,
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     )
  //     .then((response) => {
  //       const updatedUser = response.data;
  //       console.log('Movie added to fav list');
  //       localStorage.setItem('user', JSON.stringify(updatedUser));
  //       window.location.reload();
  //     })
  //     .catch((error) => {
  //       console.log('Adding a movie to user list failed.', error);
  //     });
  // };

  render() {
    const { movie } = this.props;

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
            // onClick={() => this.AddFavorite(movie)}
            data-toggle="tooltip"
            data-placement="center"
            title="Favourite a movie"
            className="pl-5"
          >
            ♥
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
