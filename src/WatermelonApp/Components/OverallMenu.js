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
            data: this.props.data
        
        }
    }

    render() {
        console.log(LocalStorageGetter("connectedWallet"));
        return (
            <div className="container">
                <section> <div className='section-header'>BALANCE</div>
                    <img src={icoEuro} className='ico' />
                    {typeof this.state.data['wallet'] !== "undefined" && <span className="ico-text">{LocalStorageGetter("connectedWallet").balance}</span>}
                </section>
                <section> <div className='section-header'>ACCOUNT</div>
                    <li><img src={username} className="ico" /><p className="display-value">{LocalStorageGetter("connectedUser").last_name}</p></li>
                    <li><img src={username} className="ico" /><p className="display-value">{LocalStorageGetter("connectedUser").first_name}</p></li>
                    <li><img src={name} className="ico" /><p className="display-value"> {LocalStorageGetter("connectedUser").email}</p></li>
                </section>
            </div>
        );
    }
    //this.state.data['user'].last_name
    //this.state.data['user'].first_name
    //this.state.data['user'].email
    //(this.state.data['wallet'].balance / 100).toFixed(2)
}

export default OverallMenu;