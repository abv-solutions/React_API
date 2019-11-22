import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Search from './components/Search';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Search />
      </div>
    );
  }
}

export default App;
