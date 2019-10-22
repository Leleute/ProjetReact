import React, { Component } from 'react';

import '../style/wallet.css';

import icoOverall from '../img/ico_overall.png'
import icoWallet from '../img/ico_wallet.png'
import icoExchange from '../img/ico_exchange.png'
import icoHistory from '../img/ico_history.png'
import icoSettings from '../img/ico_settings.png'
import icoSignOut from '../img/ico_sign_out.png'
import logo from '../img/logo.png'

class Wallet extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="wallet">
                <div className="navigation">
                    <div className="logo-element">
                     <img src={logo} className="logo"/><span className="logo-text">Watermelon</span> 
                    </div>
                    <li><img src={icoOverall}/>Overall</li>
                    <li><img src={icoWallet}/>Wallet</li>
                    <li><img src={icoExchange}/>Exchange</li>
                    <li><img src={icoHistory}/>History</li>
                    <div className="list-bottom">
                        <li><img src={icoSettings} />Settings</li>
                        <li><img src={icoSignOut} />Sign-out</li>
                    </div>
                </div>
                <div>
                    YOUHOU
                </div>
            </div>
        );
    }
}

export default Wallet;