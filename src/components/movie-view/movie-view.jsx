import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';

export class MovieView extends React.Component {
  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Row justify-content-md-center className="m-5">
        <Col>
          <img
            style={{ height: '35vw' }}
            src={movie.ImagePath}
            crossOrigin="anonymous"
          />
        </Col>

        <Col>
          <div className="movie-title">
            <span className="label">Title: </span>
            <span className="value">{movie.Title}</span>
          </div>
          <div className="movie-description">
            <span className="label">Description: </span>
            <span className="value">{movie.Description}</span>
          </div>
          <Button
            className="mt-3"
            onClick={() => {
              onBackClick(null);
            }}
          >
            Back
          </Button>
        </Col>
      </Row>
    );
  }
}
