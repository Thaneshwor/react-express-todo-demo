import React, { Component } from 'react';
import './App.css';
import './assets/css/reset.css'
import Main from './components/main/Main';
import { Provider } from 'react-redux';
import store from '../src/store/store';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

export default App;
