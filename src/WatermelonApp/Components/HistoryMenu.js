import React, { Component } from 'react';

import '../style/historymenu.css';

import icoHistory from '../img/ico_history.png';
import icoTransfer from '../img/ico_exchange.png';
import icoPayIn from '../img/ico_payin.png';
import icoPayOut from '../img/ico_payout.png';
import icoEuro from '../img/ico_euro.png';
import icoCardAddOption from '../img/ico_add.png';
import icoCardMinusOption from '../img/ico_minus.png';

import { LocalStorageGetter } from '../Shortcut';

class HistoryMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayT: false,
            displayPI: false,
            displayPO: false
        }

        this.display = this.display.bind(this);
    }

    display(compName, e) {
        if (compName == 'transfer') {
            this.setState({ displayT: !this.state.displayT })
        } else if (compName == 'payin') {
            this.setState({ displayPI: !this.state.displayPI })
        } else {
            this.setState({ displayPO: !this.state.displayPO })
        }
    }


    render() {
        return (
            <div className="container">
                <header><img src={icoHistory} className="ico" />HISTORY</header>
                <section className="section-action" onClick={this.display.bind(this, 'payin')}>
                    <div className='section-header'><img src={icoPayIn} className="ico" /><span >Pay-in</span></div>
                    {this.state.displayPI && LocalStorageGetter('connectedPayin').map(function (object, i) {
                        return (
                            <div className="history-container">
                                {object.wallet_id != LocalStorageGetter('wallet').id &&
                                    <div className="element">
                                        <img src={icoCardAddOption} className="ico_non_reverse" /> <img src={icoEuro} className="ico" /> <span className="display-value">{object.amount}</span>
                                    </div>
                                }
                            </div>
                        );
                    }, this)}
                </section>
                <section className="section-action" onClick={this.display.bind(this, 'payout')}>
                    <div className='section-header'><img src={icoPayOut} className="ico" /><span >Pay-out</span></div>
                    {this.state.displayPO && LocalStorageGetter('connectedPayout').map(function (object, i) {
                        return (
                            <div className="history-container">
                                {object.wallet_id != LocalStorageGetter('wallet').id &&
                                    <div className="element">
                                        <img src={icoCardMinusOption} className="ico_non_reverse" /> <img src={icoEuro} className="ico" /> <span className="display-value">{object.amount}</span>
                                    </div>
                                }
                            </div>
                        );
                    }, this)}
                </section>
                <section className="section-action" onClick={this.display.bind(this, 'transfer')}>
                    <div className='section-header'><img src={icoTransfer} className="ico" /><span >Transfer</span></div>
                    {this.state.displayT && LocalStorageGetter('connectedTransfIn').map(function (object, i) {
                        return (
                            <div className="history-container">
                            </div>
                        );
                    }, this)}
                    {this.state.displayT && LocalStorageGetter('connectedTransfOut').map(function (object, i) {
                        return (
                            <div className="history-container">
                            </div>
                        );
                    }, this)}
                </section>
            </div>
        );
    }
}

export default HistoryMenu;