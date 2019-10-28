import React, { Component } from 'react';

import '../style/overallmenu.css';

import icoOverall from '../img/ico_overall.png';
import icoCardBrand from '../img/ico_card_brand.png';
import icoEuro from '../img/ico_euro.png';
import username from "../img/username.png";
import name from "../img/name.png";
import { localStorageGetter } from '../shortcut';

class OverallMenu extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container" id='inline-container'>
                <header id="inline-header"><img src={icoOverall} className="ico" /><span>OVERALL</span></header>
                <div id="inline">
                    <section id="inline-section">
                        <div className='section-header'>BALANCE</div>
                        <img src={icoEuro} className='ico' />
                        {typeof localStorageGetter("connectedWallet") !== "undefined" && <span className="ico-text">{Math.trunc(localStorageGetter("connectedWallet").balance / 100)}</span>}
                    </section>
                    <section id="inline-section">
                        <div className='section-header'>ACCOUNT</div>
                        <li><img src={username} className="ico" /><p className="overall-field">{localStorageGetter("connectedUser").last_name.toUpperCase()} {localStorageGetter("connectedUser").first_name}</p></li>
                        <li><img src={name} className="ico" /><p className="overall-field"> {localStorageGetter("connectedUser").email}</p></li>
                    </section>
                    <section id="inline-section">
                        <div className='section-header'>CARDS</div>
                        <div className='payout-description'>
                            <div className="card-description" id="border-bottom-less">
                                {localStorageGetter('connectedCard').map(function (object, i) {
                                    return (
                                        <li><img src={icoCardBrand} className="ico" /> <p className="display-value">{object.brand.toUpperCase()} **** **** **** {object.last_4} [{object.expired_at.slice(0, 10)}]</p></li>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default OverallMenu;