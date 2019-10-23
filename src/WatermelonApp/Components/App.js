import React, { Component } from 'react';
import Connection from "./Connection";
import Wallet from "./Wallet"
import { LocalStorageGetter, LocalStorageSetter } from '../Shortcut';
import '../style/App.css';

import users from '../../database/users';
import cards from '../../database/cards';
import payin from '../../database/payin';
import payout from '../../database/payout';
import wallet from '../../database/wallet';


//localStorage.clear();

if (LocalStorageGetter("users") == null) {
  LocalStorageSetter("users", users);
}
if (LocalStorageGetter("cards") == null) {
    LocalStorageSetter("cards", cards);
}
if (LocalStorageGetter("payin") == null) {
    LocalStorageSetter("payin", payin);
}
if (LocalStorageGetter("payout") == null) {
    LocalStorageSetter("payout", payout);
}
if (LocalStorageGetter("wallet") == null) {
    LocalStorageSetter("wallet", wallet);
}

console.log(users);
console.log(cards);
console.log(payin);
console.log(payout);
console.log(wallet);

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