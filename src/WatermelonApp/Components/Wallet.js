import React, { Component } from 'react';

import App from './App';
import OverallMenu from './OverallMenu';
import SettingsMenu from './SettingsMenu';
import WalletMenu from './WalletMenu';
import TransferMenu from './TransferMenu';
import HistoryMenu from './HistoryMenu';
import UserManagerMenu from './UserManagerMenu';
import TransferManagerMenu from './TransferManagerMenu';

import '../style/wallet.css';

import icoOverall from '../img/ico_overall.png';
import icoWallet from '../img/ico_wallet.png';
import icoTransfer from '../img/ico_exchange.png';
import icoHistory from '../img/ico_history.png';
import icoSettings from '../img/ico_settings.png';
import icoSignOut from '../img/ico_sign_out.png';
import icoUserManager from '../img/ico_manager_users.png';
import icoTransferManager from '../img/ico_manager_transaction.png';
import logo from '../img/logo.png';
import { localStorageGetter } from '../shortcut';

class Wallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOption: 0,
            wallet: localStorageGetter("connectedWallet"),
            user: localStorageGetter("connectedUser"),
            payin: localStorageGetter("connectedPayin"),
            payout: localStorageGetter("connectedPayout"),
            card: localStorageGetter("connectedCard"),
            transferIn: localStorageGetter("connectedTransfIn"),
            transferOut: localStorageGetter("connectedTransfOut")
        }

    }
    logOut = (e) => {
        this.setState({ menuOption: 5 });
    }

    changeMenu(choice, e) {
        this.setState({ menuOption: choice });
    }

    render() {
        return (
            <div className="wallet">
                {this.state.menuOption !== 5 &&
                    <div className="navigation">
                        <div className="logo-element">
                            <img src={logo} alt="img" className="logo" /><span className="logo-text">Watermelon</span>
                        </div>
                        <li onClick={this.changeMenu.bind(this, 0)}><img alt="img" src={icoOverall} /><span>Overall</span></li>
                        <li onClick={this.changeMenu.bind(this, 1)}><img alt="img" src={icoWallet} /><span>Wallet</span></li>
                        <li onClick={this.changeMenu.bind(this, 2)}><img alt="img" src={icoTransfer} /><span>Transfer</span></li>
                        <li onClick={this.changeMenu.bind(this, 3)}><img alt="img" src={icoHistory} /><span>History</span></li>
                        <div className="list-bottom">
                            {localStorageGetter("connectedUser").is_admin && <li id="admin" onClick={this.changeMenu.bind(this, 6)}><img alt="img"id="text-ico-below" src={icoUserManager} /><span id="text-ico-below">User Manager</span></li>}
                            {localStorageGetter("connectedUser").is_admin && <li id="admin" onClick={this.changeMenu.bind(this, 7)}><img alt="img"id="text-ico-below" src={icoTransferManager} /><span id="text-ico-below">Transfer Manager</span></li>}
                            <li onClick={this.changeMenu.bind(this, 4)}><img alt="img" src={icoSettings} /><span>Account</span></li>
                            <li onClick={this.changeMenu.bind(this, 5)}><img alt="img" src={icoSignOut} /><span>Sign-out</span></li>
                        </div>
                    </div>}
                <div>
                    {this.state.menuOption === 0 && <OverallMenu />}
                    {this.state.menuOption === 1 && <WalletMenu />}
                    {this.state.menuOption === 2 && <TransferMenu />}
                    {this.state.menuOption === 3 && <HistoryMenu />}
                    {this.state.menuOption === 4 && <SettingsMenu isDeleted={this.logOut} />}
                    {this.state.menuOption === 6 && <UserManagerMenu />}
                    {this.state.menuOption === 7 && <TransferManagerMenu />}
                    {this.state.menuOption === 5 && <App />}
                </div>
            </div>
        );
    }
}

export default Wallet;