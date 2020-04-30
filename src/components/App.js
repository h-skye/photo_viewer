import React, { Component } from 'react';
import { Provider } from 'react-redux'
import configureStore from '../redux/store'
import PhotoGallery from './PhotoGallery';

const store = configureStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
          <PhotoGallery />
        </div>
      </Provider>
    );
  }
}

export default App;
