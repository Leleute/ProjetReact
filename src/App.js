import React, { Component } from 'react';
import Connection from "./WatermelonApp/Components/Connection";
import Wallet from "./WatermelonApp/Components/Wallet"
import { LocalStorageGetter, LocalStorageSetter } from './WatermelonApp/Shortcut';
import './App.css';

import users from './database/users';

//localStorage.clear();

if (LocalStorageGetter("users") == null) {
  LocalStorageSetter("users", users);
}


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      connected: false
    };
    this.handleChangeValue = this.handleChangeValue.bind(this);
  }


  handleChangeValue = (value) => {
    this.setState({
      connected: value
    });
  }

  render() {
    return (
      <div>
        {!this.state.connected &&
          <div className="App">
            <header className="App-header">
              <p className="App-message">
                Welcome to WatermelonApp!
          </p>
              <Connection value={this.handleChangeValue} />
            </header>
          </div>}
        {this.state.connected &&
          <Wallet />}
      </div>

    );
  }

}

export default App;