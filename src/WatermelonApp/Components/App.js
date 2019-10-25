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
      data: ''
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

  setData = (myData) => {
    this.setState({
      data: myData
    });
  }


  render() {
    return (
      <div>
        {!this.state.connected &&
          <div className="App">
            <header className="App-header">
              <p className="App-message">
                Welcome to Watermelon Wallet App!
          </p>
              <Connection value={this.handleChangeValue} data={this.setData}/>
            </header>
          </div>}
        {this.state.connected &&
          <Wallet data={this.state.data}/>}
      </div>

    );
  }

}

export default App;