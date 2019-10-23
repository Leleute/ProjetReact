import React, { Component } from 'react';

import '../style/walletmenu.css';

import icoWallet from '../img/ico_wallet.png';


class WalletMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showPI: false,
            showPO: false,
            showCC: false,
        }
    }

    displaySubMenu(choice, e){
        if(choice == 'CC'){
            this.setState({
                showCC : true,
                showPI : false,
                showPO : false
            })
        } else if(choice == 'PI') {
            this.setState({
                showCC : false,
                showPI : true,
                showPO : false
            })
        } else {
            this.setState({
                showCC : false,
                showPI : false,
                showPO : true
            })
        }
     }
    
    render() {
        return(
                <div className="container">
                    <section><img src={icoWallet} className="logo"/>MY WALLET</section>
                    <div className="column-list">
                        <div className="menu" onClick={this.displaySubMenu.bind(this, 'CC')}>Credit cards</div>
                        <div className="menu" onClick={this.displaySubMenu.bind(this, 'PI')}>Pay in</div>
                        <div className="menu" onClick={this.displaySubMenu.bind(this, 'PO')}>Pay out</div>
                    </div>
                    {this.state.showCC &&
                    <div className="sub-menu">Credit cards - Edit</div>}
                    {this.state.showPI &&
                    <div className="sub-menu">Pay In - Please provide the information</div>}
                    {this.state.showPO &&
                    <div className="sub-menu">Pay Out - Please provide the information</div>}
                </div>
        );
    }
}

export default WalletMenu;