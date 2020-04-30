import React, { Component } from 'react';
import { connect } from 'react-redux';
import PhotoGallery from './PhotoGallery'



class App extends Component {
  render() {
    return (
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
        {/* <PhotoGallery /> */}
      </div>
    );
  }
}

export default App;
// export default connect()(App);


