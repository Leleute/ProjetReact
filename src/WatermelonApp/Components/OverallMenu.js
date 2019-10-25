import React, { Component } from 'react';

import '../style/overallmenu.css';

import icoEuro from '../img/ico_euro.png';
import username from "../img/username.png";
import name from "../img/name.png";
import { LocalStorageGetter } from '../Shortcut';

class OverallMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: LocalStorageGetter("connectedUser"),
            wallet: LocalStorageGetter("connectedWallet")
        }
    }

    render() {
        console.log("wallet")
        
        return (
            <div className="container">
                <section> <div className='section-header'>BALANCE</div>
                    <img src={icoEuro} className='ico' />
                    {typeof this.state.wallet !== "undefined" && <span className="ico-text">{(this.state.wallet.balance / 100).toFixed(2)}</span>}
                </section>
                <section> <div className='section-header'>ACCOUNT</div>
                    <li><img src={username} className="ico" /><p className="display-value">{this.state.user.last_name}</p></li>
                    <li><img src={username} className="ico" /><p className="display-value">{this.state.user.first_name}</p></li>
                    <li><img src={name} className="ico" /><p className="display-value"> {this.state.user.email}</p></li>
                </section>
            </div>
        );
    }
}

export default OverallMenu;