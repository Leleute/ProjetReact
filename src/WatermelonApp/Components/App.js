import React, { Component } from 'react';
import Connection from "./Connection";
import Wallet from "./Wallet"
import { localStorageGetter, localStorageSetter } from '../shortcut';
import '../style/App.css';

import users from '../../database/users';
import cards from '../../database/cards';
import payin from '../../database/payin';
import payout from '../../database/payout';
import wallet from '../../database/wallet';
import transfer from '../../database/transfer';

if (localStorageGetter("users") == null) {
    localStorageSetter("users", users);
}
if (localStorageGetter("cards") == null) {
    localStorageSetter("cards", cards);
}
if (localStorageGetter("payin") == null) {
    localStorageSetter("payin", payin);
}
if (localStorageGetter("payout") == null) {
    localStorageSetter("payout", payout);
}
if (localStorageGetter("wallet") == null) {
    localStorageSetter("wallet", wallet);
}
if (localStorageGetter("transfer") == null) {
    localStorageSetter("transfer", transfer);
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
                    </div>}
                {this.state.connected &&
                    <Wallet />}
            </div>

        );
    }

}

export default App;