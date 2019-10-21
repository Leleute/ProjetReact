import React, { Component } from 'react';
import Connection from "./WatermelonApp/Components/Connection";
import './App.css';

class App extends Component {

  state = {};

  render() {
    return (
      <div className="App">
         {this.state.connect}
        <header className="App-header">
          <p className="App-message">
           Welcome to WatermelonApp!
          </p>
          <Connection/>	 
        </header>
      </div>
    );
  }
}

export default App;