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

import { localStorageGetter } from '../shortcut';

/*
    History component is managing the pay-in, pay-out and transfer operations a user have done since the creation of his account - it's an option menu of the wallet
*/
class HistoryMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayT: false,
            displayPI: false,
            displayPO: false
        }

        this.display = this.display.bind(this);
        this.getName = this.getName.bind(this);
    }

    getName(idWallet) {
        let name;
        localStorageGetter("users").forEach((user) => {
            if (user.id == idWallet) {
                name = user.last_name.toUpperCase() + " " + user.first_name;
            }
        });
        if (name != undefined) {
            return (<span id="return">{name}</span>)
        } else {
            return (<span id="return-deleted">[DELETED ACCOUNT]</span>)
        }
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
                <header><img alt="img" src={icoHistory} className="ico" /><span>HISTORY</span></header>
                <section className="section-action" id="min-width" onClick={this.display.bind(this, 'payin')}>
                    <div className='section-header'><img alt="img" src={icoPayIn} className="ico" /><span >Pay-in</span></div>
                    {localStorageGetter('connectedPayin').length != 0 && <div>
                        {this.state.displayPI && localStorageGetter('connectedPayin').map(function (object, i) {
                            return (
                                <div id="pay" className="history-container">
                                    {object.wallet_id == localStorageGetter('connectedWallet').id &&
                                        <div className="element">
                                            <img src={icoAdd} alt="img" className="ico-non-reverse" /> <img alt="img" src={icoEuro} className="ico" /> <span className="display-value">{object.amount}</span>
                                        </div>
                                    }
                                </div>
                            );
                        }, this)}
                    </div>}
                    {localStorageGetter('connectedPayin').length == 0 && this.state.displayPI &&
                        <div className="history-container">
                            <div className="element">
                                <span className="display-none">No pay-in has been found.</span>
                            </div>
                        </div>
                    }
                </section>
                <section className="section-action" id="min-width" onClick={this.display.bind(this, 'payout')}>
                    <div className='section-header'><img alt="img" src={icoPayOut} className="ico" /><span >Pay-out</span></div>
                    {localStorageGetter('connectedPayout').length != 0 && <div>
                        {this.state.displayPO && localStorageGetter('connectedPayout').map(function (object, i) {
                            return (
                                <div id="pay" className="history-container">
                                    {object.wallet_id == localStorageGetter('connectedWallet').id &&
                                        <div className="element">
                                            <img src={icoMinus} alt="img" className="ico-non-reverse" /> <img alt="img" src={icoEuro} className="ico" /> <span className="display-value">{object.amount}</span>
                                        </div>
                                    }
                                </div>
                            );
                        }, this)}
                    </div>}
                    {localStorageGetter('connectedPayout').length == 0 && this.state.displayPO &&
                        <div className="history-container">
                            <div className="element">
                                <span className="display-none">No pay-out has been found.</span>
                            </div>
                        </div>
                    }
                </section>
                <section className="section-action" id="min-width" onClick={this.display.bind(this, 'transfer')}>
                    <div className='section-header'><img alt="104" src={icoTransfer} className="ico" /><span >Transfer</span></div>
                    {localStorageGetter('connectedTransfIn').length != 0 && <div>
                        {this.state.displayT && localStorageGetter('connectedTransfIn').map(function (object, i) {
                            return (
                                <div id="transfer" className="history-container">
                                    {object.credited_wallet_id = localStorageGetter('connectedWallet').id &&
                                        <div className="element">
                                            <img src={icoTransferIn} alt="img" className="ico-non-reverse" /> <img alt="img" src={icoEuro} className="ico" /> <span className="display-value">{object.amount} from {this.getName(object.debited_wallet_id)}</span>
                                        </div>
                                    }
                                </div>
                            );
                        }, this)}
                    </div>}
                    {localStorageGetter('connectedTransfIn').length == 0 && this.state.displayT &&
                        <div id="transfer" className="history-container">
                            <div className="element">
                                <span className="display-none">No money has been received.</span>
                            </div>
                        </div>
                    }
                    {localStorageGetter('connectedTransfOut').length != 0 && <div>
                        {this.state.displayT && localStorageGetter('connectedTransfOut').map(function (object, i) {
                            return (
                                <div id="transfer" className="history-container">
                                    {object.debited_wallet_id == localStorageGetter('connectedWallet').id &&
                                        <div className="element">
                                            <img src={icoTransferOut} alt="img" className="ico-non-reverse" /> <img alt="img" src={icoEuro} className="ico" /> <span className="display-value">{object.amount} to {this.getName(object.credited_wallet_id)}</span>
                                        </div>
                                    }
                                </div>
                            );
                        }, this)}
                    </div>}
                    {localStorageGetter('connectedTransfOut').length == 0 && this.state.displayT &&
                        <div id="transfer" className="history-container">
                            <div className="element">
                                <span className="display-none">No money has been sent.</span>
                            </div>
                        </div>
                    }
                </section>
            </div>
        );
    }
}

export default HistoryMenu;