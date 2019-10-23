import React, { Component } from 'react';
import Connection from "./Connection";
import Wallet from "./Wallet"
import { LocalStorageGetter, LocalStorageSetter } from '../Shortcut';
import '../style/App.css';

import users from '../../database/users';


//localStorage.clear();

if (LocalStorageGetter("users") == null) {
  LocalStorageSetter("users", users);
}


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      connectedUser: ''
    };
    this.handleChangeValue = this.handleChangeValue.bind(this);
  }

  componentDidMount(){
    document.title = "Watermelon Wallet"
  }
  
  handleChangeValue = (value) => {
    this.setState({
      connected: value
    });
  }

  setConnection = (user) => {
    this.setState({
      connectedUser: user
    });
  }

  render() {
    return (
      <div>
        {!this.state.connected &&
          <div className="App">
            <header className="App-header">
              <p className="App-message">
                Welcome to Watermelon Wallet!
          </p>
              <Connection value={this.handleChangeValue} user={this.setConnection}/>
            </header>
          </div>}
        {this.state.connected &&
          <Wallet user={this.state.connectedUser}/>}
      </div>

    );
  }

}

export default App;