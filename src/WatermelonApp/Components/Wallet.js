import React, { Component } from 'react';

import App from './App';
import OverallMenu from './OverallMenu';
import SettingsMenu from './SettingsMenu';
import WalletMenu from './WalletMenu';

import '../style/wallet.css';

import icoOverall from '../img/ico_overall.png';
import icoWallet from '../img/ico_wallet.png';
import icoExchange from '../img/ico_exchange.png';
import icoHistory from '../img/ico_history.png';
import icoSettings from '../img/ico_settings.png';
import icoSignOut from '../img/ico_sign_out.png';
import logo from '../img/logo.png';
import { LocalStorageGetter } from '../Shortcut';

class Wallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : this.props.data,
            menuOption: 0,
            wallet: LocalStorageGetter("connectedWallet"),
            user: LocalStorageGetter("connectedUser"),
            payin: LocalStorageGetter("connectedPayin"),
            payout: LocalStorageGetter("connectedPayout"),
            card: LocalStorageGetter("connectedCard")
        }
    
    }

    changeMenu(choice, e){
       this.setState({menuOption:choice});
       console.log("this.state");
        console.log(this.state);
        console.log(this.state.wallet, this.state.user, this.state.payin, this.state.payout, this.state.card);
    }

    render() {
        return (
            <div className="wallet">
                {this.state.menuOption !=5 && 
                <div className="navigation">
                    <div className="logo-element">
                     <img src={logo} className="logo"/><span className="logo-text">Watermelon</span> 
                    </div>
                    <li onClick={this.changeMenu.bind(this, 0)}><img src={icoOverall}/>Overall</li>
                    <li onClick={this.changeMenu.bind(this, 1)}><img src={icoWallet}/>Wallet</li>
                    <li onClick={this.changeMenu.bind(this, 2)}><img src={icoExchange}/>Exchange</li>
                    <li onClick={this.changeMenu.bind(this, 3)}><img src={icoHistory}/>History</li>
                    <div className="list-bottom">
                        <li onClick={this.changeMenu.bind(this, 4)}><img src={icoSettings} />Account</li>
                        <li onClick={this.changeMenu.bind(this, 5)}><img src={icoSignOut} />Sign-out</li>
                    </div>
                </div>}
                <div>
                   {this.state.menuOption == 0 && <OverallMenu data={this.state.data}/>}
                   {this.state.menuOption == 1 && <WalletMenu data={this.state.data}/> }
                   {this.state.menuOption == 2 && <div>Exchange</div>}
                   {this.state.menuOption == 3 && <div>History</div>}
                   {this.state.menuOption == 4 && <SettingsMenu data={this.state.data}/>}
                   {this.state.menuOption == 5 && <App/>}                   
                </div>
            </div>
        );
    }
}

export default Wallet;