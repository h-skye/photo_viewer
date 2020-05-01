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
          
          <PhotoGallery />
        </div>
      </Provider>
    );
  }
}

export default App;