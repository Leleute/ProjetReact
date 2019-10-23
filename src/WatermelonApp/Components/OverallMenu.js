import React, { Component } from 'react';

import '../style/overallmenu.css';

import icoEuro from '../img/ico_euro.png';
import username from "../img/username.png";
import name from "../img/name.png";

class OverallMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user : this.props.userMenu
        }
    }

    render() {
        return(
            <div className="container">
                <section>
                <header>BALANCE</header>
                    <img src={icoEuro} className='ico'/><span className="ico-text">50</span> 
                </section>
                <section>
                <header>ACCOUNT</header>
                    <li><img src={username} className="logo"/><p className="display-value">{this.state.user.last_name}</p></li>
                    <li><img src={username} className="logo"/><p className="display-value">{this.state.user.first_name}</p></li>
                    <li><img src={name} className="logo"/><p className="display-value"> {this.state.user.email}</p></li>
            </section>
            </div>
        );
    }
}

export default OverallMenu;