import React, { Component } from 'react';

import '../style/transfermenu.css';

import icoTransfer from '../img/ico_exchange.png';
import icoTransferReceiver from '../img/ico_transfer_receiver.png';
import icoUsername from "../img/username.png";
import icoEmail from "../img/name.png";
import icoEuro from '../img/ico_euro.png';
import ico1 from '../img/ico_1.png';
import ico2 from '../img/ico_2.png';
import icoCardBrand from '../img/ico_card_brand.png';

import { localStorageGetter, localStorageSetter } from '../shortcut';

class TransferMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idReceiver: '',
            idCreditCard: '',
            amount: ''
        }
        this.setSelectedCard = this.setSelectedCard.bind(this);
        this.updateInputAmount = this.updateInputAmount.bind(this);
        this.proceedTransfer = this.proceedTransfer.bind(this);
    }

    proceedTransfer(event) {
        if (this.state.amount != '' && this.state.idCreditCard != '' && this.state.idReceiver) {
            /// --------------------------------------------------------
            let idtransfer = 0;
            let listTransfer = localStorageGetter("transfer");
            listTransfer.forEach((t) => {
                if (t.id > idtransfer) idtransfer = t.id;
            });

            let newTransfer = {
                id: idtransfer + 1,
                debited_wallet_id: localStorageGetter("connectedWallet").id,
                credited_wallet_id: this.state.idReceiver,
                amount: parseInt(this.state.amount)
            }
            listTransfer.push(newTransfer);
            localStorageSetter("transfer", listTransfer);
            let actifTransf = localStorageGetter("connectedTransfOut");
            actifTransf.push(newTransfer);
            localStorageSetter("connectedTransfOut", actifTransf);

            //recuperation du wallet cible
            let balanceCible = 0;
            let listWallet = localStorageGetter("wallet");
            listWallet.forEach((w) => {
                if (w.id == this.state.idReceiver) {
                    balanceCible = w.balance;
                }
            });
            this.state.amount = this.state.amount * 100;
            let walletPresent = localStorageGetter("connectedWallet");
            walletPresent.balance = parseInt(walletPresent.balance) - parseInt(this.state.amount);
            balanceCible = parseInt(balanceCible) + parseInt(this.state.amount);
            listWallet.forEach((w) => {
                if (w.id == walletPresent.id) {
                    w.balance = walletPresent.balance;
                }
                if (w.id == this.state.idReceiver) {
                    w.balance = balanceCible;
                }
            });
            localStorageSetter("wallet", listWallet);
            localStorageSetter("connectedWallet", walletPresent);
            this.setState({ amount: '   ', idReceiver: '', idCreditCard: ''});
        } else {
            alert("Please choose a card and/or select an amount")
        }

    }

    updateInputAmount(event) {
        if (isNaN(event.target.value)) {
            alert(event.target.value + " is not a number");
        } else if (Number(event.target.value) < Number(0)) {
            alert(event.target.value + " must be greater than 0");
        } else if (Number(event.target.value) > Number(((localStorageGetter("connectedWallet").balance) / 100).toFixed(2))) {
            alert(event.target.value + " must not exceed wallet's balance");
        }
        else {
            this.setState({ amount: event.target.value });
        }
    }

    setSelectedCard(event) {
        this.setState({ idCreditCard: event.target.value });
    }

    setReceiver = (e, object) => {
        if (object.id != this.state.idReceiver) {
            this.setState({ idReceiver: object.id });
        } else {
            this.setState({ idReceiver: '' });
        }
    }

    render() {
        return (
            <div className="container">
                <header><img alt="img"src={icoTransfer} className="ico" /><span>TRANSFER</span></header>
                <section>
                    {localStorageGetter('connectedCard').length != 0 && <div>
                        <div className='section-header'><img alt="img"src={icoTransferReceiver} className="ico" /><span >Transfer receiver</span></div>
                        {localStorageGetter('users').map(function (object, i) {
                            return (
                                <div className="user-choice">
                                    {object.id != localStorageGetter('connectedUser').id && object.id != this.state.idReceiver &&
                                        <div className="element" name={object.id} onClick={((e) => this.setReceiver(e, object))}>
                                            <div className="item"><img alt="img"src={icoUsername} className="ico" /> <p className="display-value">{object.last_name.toUpperCase()} {object.first_name}</p></div>
                                            <div className="item"><img alt="img"src={icoEmail} className="ico" /><p className="display-value"> {object.email}</p></div>
                                        </div>
                                    }
                                    {object.id != localStorageGetter('connectedUser').id && object.id == this.state.idReceiver &&
                                        <div className="selected" name={object.id} onClick={((e) => this.setReceiver(e, object))}>
                                            <div className="item"><img alt="img"src={icoUsername} className="ico" /> <p className="display-value">{object.last_name.toUpperCase()} {object.first_name}</p></div>
                                            <div className="item"><img alt="img"src={icoEmail} className="ico" /><p className="display-value"> {object.email}</p></div>
                                        </div>
                                    }
                                </div>
                            );
                        }, this)}
                    </div>}
                    {localStorageGetter('connectedCard').length == 0 &&
                        <div className="element">
                            <span className="display-none">You need at least one credit card registered to transfer money.</span>
                        </div>
                    }
                </section>
                {this.state.idReceiver != '' &&
                    <section>
                        <div className='section-header'><img alt="img"src={icoEuro} className="ico" /><span >Payment option</span></div>
                        <div className='payin-description'>
                            <img alt="img"src={ico1} className="ico_number" /> <p>Select a credit card</p>
                            <div className="card-description">
                                {localStorageGetter('connectedCard').map(function (object, i) {
                                    return (
                                        <div onChange={this.setSelectedCard.bind(this)}>
                                            <li> <input type="radio" name="card_selected_payin" value={object.id} /><img alt="img"src={icoCardBrand} className="ico" /> <p className="display-value">{object.brand.toUpperCase()} **** **** **** {object.last_4}</p></li>
                                        </div>
                                    );
                                }, this)}
                            </div>
                            <img alt="img"src={ico2} className="ico_number" /> <p>Select an amount of money</p>
                            <div className="section-element">
                                <img alt="img"src={icoEuro} className="ico" /><span>Amount</span><input name='amount' type="text" value={this.state.amount} onChange={this.updateInputAmount} />
                            </div>
                            <div className="submit" onClick={this.proceedTransfer}>Confirm</div>
                        </div>
                    </section>}
            </div>

        );
    }
}

export default TransferMenu;