import React from 'react';
import ReactDOM from 'react-dom/client';
import Container from 'react-bootstrap/Container';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';

import MainView from './components/main-view/main-view';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

const store = createStore(moviesApp);

// Main component (will eventually use all the others)
class MovioApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container
          fluid
          style={{
            padding: '0px',
          }}
        >
          <MainView />
        </Container>
      </Provider>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];
const root = ReactDOM.createRoot(container);
// Tells React to render your app in the root DOM element
root.render(React.createElement(MovioApplication));
