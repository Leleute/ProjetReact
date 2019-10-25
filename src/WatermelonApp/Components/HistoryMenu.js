import React, { Component } from 'react';

import '../style/historymenu.css';

import icoHistory from '../img/ico_history.png';
import icoTransfer from '../img/ico_exchange.png';
import icoPayIn from '../img/ico_payin.png';
import icoPayOut from '../img/ico_payout.png';
import icoEuro from '../img/ico_euro.png';
import icoAdd from '../img/ico_add.png';
import icoMinus from '../img/ico_minus.png';
import icoTransferIn from '../img/ico_transfer_in.png';
import icoTransferOut from '../img/ico_transfer_out.png';

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
                    {LocalStorageGetter('connectedPayin') != null && <div>
                        {this.state.displayPI && LocalStorageGetter('connectedPayin').map(function (object, i) {
                            return (
                                <div id="pay" className="history-container">
                                    {object.wallet_id == LocalStorageGetter('connectedWallet').id &&
                                        <div className="element">
                                            <img src={icoAdd} className="ico_non_reverse" /> <img src={icoEuro} className="ico" /> <span className="display-value">{object.amount}</span>
                                        </div>
                                    }
                                </div>
                            );
                        }, this)}
                    </div>}
                    {LocalStorageGetter('connectedPayin') == null && this.state.displayPI &&
                        <div className="history-container">
                            <div className="element">
                                <span className="display-none">No pay-in has been found.</span>
                            </div>
                        </div>
                    }
                </section>
                <section className="section-action" onClick={this.display.bind(this, 'payout')}>
                    <div className='section-header'><img src={icoPayOut} className="ico" /><span >Pay-out</span></div>
                    {LocalStorageGetter('connectedPayout') != null && <div>
                        {this.state.displayPO && LocalStorageGetter('connectedPayout').map(function (object, i) {
                            return (
                                <div id="pay" className="history-container">
                                    {object.wallet_id == LocalStorageGetter('connectedWallet').id &&
                                        <div className="element">
                                            <img src={icoMinus} className="ico_non_reverse" /> <img src={icoEuro} className="ico" /> <span className="display-value">{object.amount}</span>
                                        </div>
                                    }
                                </div>
                            );
                        }, this)}
                    </div>}
                    {LocalStorageGetter('connectedPayout') == null && this.state.displayPO &&
                        <div className="history-container">
                            <div className="element">
                                <span className="display-none">No pay-out has been found.</span>
                            </div>
                        </div>
                    }
                </section>
                <section className="section-action" onClick={this.display.bind(this, 'transfer')}>
                    <div className='section-header'><img src={icoTransfer} className="ico" /><span >Transfer</span></div>

                    {this.state.displayT && LocalStorageGetter('connectedTransfIn').map(function (object, i) {
                        return (
                            <div id="transfer" className="history-container">
                                {LocalStorageGetter('connectedTransfIn') != null && <div>
                                    {object.credited_wallet_id = LocalStorageGetter('connectedWallet').id &&
                                        <div className="element">
                                            <img src={icoTransferIn} className="ico_non_reverse" /> <img src={icoEuro} className="ico" /> <span className="display-value">{object.amount}</span>
                                        </div>
                                    }
                                </div>}
                                {LocalStorageGetter('connectedTransfIn') == null &&
                                    <div className="history-container">
                                        <div className="element">
                                            <span className="display-none">No money has been received.</span>
                                        </div>
                                    </div>
                                }
                            </div>
                        );
                    }, this)}
                    {this.state.displayT && LocalStorageGetter('connectedTransfOut').map(function (object, i) {
                        return (
                            <div id="transfer" className="history-container">
                                {LocalStorageGetter('connectedTransfOut') != null && <div>
                                    {object.debited_wallet_id == LocalStorageGetter('connectedWallet').id &&
                                        <div className="element">
                                            <img src={icoTransferOut} className="ico_non_reverse" /> <img src={icoEuro} className="ico" /> <span className="display-value">{object.amount}</span>
                                        </div>
                                    }
                                </div>}
                                {LocalStorageGetter('connectedTransfOut') == null && 
                                    <div className="history-container">
                                        <div className="element">
                                            <span className="display-none">No money has been sent.</span>
                                        </div>
                                    </div>
                                }
                            </div>
                        );
                    }, this)}
                </section>
            </div>
        );
    }
}

export default HistoryMenu;