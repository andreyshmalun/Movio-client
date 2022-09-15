import React from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
      <Container>
        <Row className="mt-2">
          <Col>
            <img
              style={{ height: '35vw' }}
              src={movie.ImagePath}
              crossOrigin="anonymous"
            />
          </Col>

          <Col>
            <div className="mb-2">
              <span className="label">Title: </span>
              <span className="value">{movie.Title}</span>
            </div>
            <div className="mb-2">
              <span className="label">Description: </span>
              <span className="value">{movie.Description}</span>
            </div>
            <div>
              <p>
                Director:
                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button variant="link" className="pt-0">
                    {movie.Director.Name}
                  </Button>
                </Link>
              </p>
              <p>
                Genre:
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button variant="link" className="pt-0">
                    {movie.Genre.Name}
                  </Button>
                </Link>
              </p>
            </div>
            <Button
              variant="outline-dark"
              className=""
              onClick={() => {
                onBackClick(null);
              }}
            >
              Back
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
