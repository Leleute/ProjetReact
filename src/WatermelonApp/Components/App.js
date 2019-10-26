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
import transfer from '../../database/transfer';

import logo from '../img/logo.png';
import logoECE from '../img/logo_ece.png';
import logoINSEEC from '../img/logo_inseec.png';
import logoAndroid from '../img/logo_android.png';
import logoAppStore from '../img/logo_appstore.png';

localStorage.clear();

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
if (LocalStorageGetter("transfer") == null) {
  LocalStorageSetter("transfer", transfer);
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      connected: false,
    };
    this.handleChangeValue = this.handleChangeValue.bind(this);
  }

  componentDidMount() {
    document.title = "Watermelon Wallet"
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
                Welcome to Watermelon Wallet App!
          </p>
              <Connection value={this.handleChangeValue} />
            </header>
            <div className="footer">
            <div className="logo-footer-left">
                <img src={logoINSEEC} />
                <img src={logoECE } />
              </div>
              <div className="logo-footer-right">
                <img src={logoAppStore} />
                <img src={logoAndroid } />
              </div>
              <img className="logo-disclaimer" src={logo} />
              <p>&copy; Copyright 2020, ECE Paris, All Rights Reserved.<br />Created and designed by LE GUERN Bastien, LELEU Matthieu, ING4 SI </p>
              <img className="logo-disclaimer" src={logo} />
              <br />
            </div>
          </div>}
        {this.state.connected &&
          <Wallet />}

      </div>


    );
  }

}

export default App;