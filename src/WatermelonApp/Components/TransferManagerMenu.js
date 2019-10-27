import React, { Component } from 'react';

import '../style/transfermanagermenu.css';

import icoManagerTransfer from '../img/ico_manager_transaction.png';
import icoTransfer from '../img/ico_exchange.png';
import icoTransferIn from '../img/ico_transfer_in.png';
import icoTransferOut from '../img/ico_transfer_out.png';
import icoEuro from '../img/ico_euro.png';
import icoTrashOption from '../img/ico_trash.png';
import icoOperation from '../img/ico_operation.png';


import {localStorageGetter, localStorageSetter
} from '../shortcut';

class TransferManagerMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idTransfer: '',
            isAdmin: ''
        }
        this.getUser = this.getUser.bind(this);
        this.getName = this.getName.bind(this);
        this.deleteTransfer = this.deleteTransfer.bind(this);
    }

    getUser(idWallet) {
        let foundUser;
        localStorageGetter("users").map((user) => {
            if (user.id == idWallet) {
                foundUser = user;
            }
        });
        return foundUser;
    }

    getName(idWallet) {
        let name;
        localStorageGetter("users").map((user) => {
            if (user.id == idWallet) {
                name = user.last_name.toUpperCase() + " " + user.first_name;

            }
        });
        return (<span id="return">{name}</span>)
    }

    setTransfer = (e, object) => {

        if (object.id != this.state.idTransfer) {
            this.setState({ idTransfer: object.id, isAdmin: false });
        } else {
            this.setState({ idTransfer: '', isAdmin: '' });
        }
    }
    setTransferAdmin = (e, object) => {
        if (object.id != this.state.idTransfer) {
            this.setState({ idTransfer: object.id, isAdmin: true });
        } else {
            this.setState({ idTransfer: '', isAdmin: '' });
        }

    }

    deleteTransfer(event) {
        //idTransfer
        let walletReceiverid = 0;
        let walletSenderid = 0;
        let amount = 0;
        let listTransfer = localStorageGetter("transfer")
        listTransfer.map((t) => {
            if (t.id = this.state.idTransfer) {
                walletSenderid = t.debited_wallet_id;
                walletReceiverid = t.credited_wallet_id;
                amount = t.amount * 100;
            }
        });
        //recuperation des wallet et modification des balances
        let listWallet = localStorageGetter("wallet");
        listWallet.map((w) => {
            if (w.id == walletReceiverid) {
                w.balance = parseInt(w.balance) - parseInt(amount);
            }
            if (w.id == walletSenderid) {
                w.balance = parseInt(w.balance) + parseInt(amount);
            }
        });
        //mise a jour du local Storage des transfer et wallet
        let alltransfer = localStorageGetter("transfer");
        let postDelete = new Array();
        alltransfer.map((u) => {
            if (u.id != this.state.idTransfer) {
                postDelete.push(u);
            }
        });
        localStorageSetter("transfer", postDelete);
        localStorageSetter("wallet", listWallet);
        let connectedWallet;

        //actualisation des transfers actif et de la balance active
        let wallets = localStorageGetter("wallet");
        wallets.map((wallet) => {
            if (wallet.user_id == localStorageGetter("connectedUser").id) {
                connectedWallet = wallet;
            }
        });
        var connectedTransfIn = new Array();
        let transIns = localStorageGetter("transfer");
        transIns.map((transIn) => {
            if (transIn.credited_wallet_id == localStorageGetter("connectedWallet").id) {
                connectedTransfIn.push(transIn);
            }
        });
        var connectedTransfOut = new Array();
        let transOuts = localStorageGetter("transfer");
        transOuts.map((transOut) => {
            if (transOut.debited_wallet_id == localStorageGetter("connectedWallet").id) {
                connectedTransfOut.push(transOut);
            }
        });

        localStorageSetter("connectedWallet", connectedWallet);
        localStorageSetter("connectedTransfIn", connectedTransfIn);
        localStorageSetter("connectedTransfOut", connectedTransfOut);
        this.setState({ idTransfer: '' });
    }

    render() {
        return (
            <div className="container">
                <header ><img src={icoManagerTransfer} className="ico" /><span id="admin-text-color">TRANSFER MANAGER</span></header>
                <section>
                    <div className='section-header'><img src={icoTransfer} className="ico" /><span >User & Administrator Transfers</span></div>
                    {localStorageGetter("transfer").length != 0 && <div>
                        {localStorageGetter("transfer").map(function (object, i) {
                            return (
                                <div className="transfer-choice">
                                    {object.id != this.state.idTransfer && (!this.getUser(object.credited_wallet_id).is_admin && !this.getUser(object.debited_wallet_id).is_admin) &&
                                        <div className="element" name="false" onClick={((e) => this.setTransfer(e, object))}>
                                            <div className="item"> <img src={icoEuro} className="ico" /> <span className="display-value" id="amount">{object.amount}</span></div>
                                            <div className="item" id="list"><img src={icoTransferOut} id="ico-stable" className="ico-non-reverse" /> <span className="display-value"> {this.getName(object.debited_wallet_id)}</span></div>
                                            <div className="item" id="list"> <img src={icoTransferIn} id="ico-stable" className="ico-non-reverse" /> <span className="display-value"> {this.getName(object.credited_wallet_id)}</span></div>
                                        </div>
                                    }
                                    {object.id == this.state.idTransfer && (!this.getUser(object.credited_wallet_id).is_admin && !this.getUser(object.debited_wallet_id).is_admin) &&
                                        <div className="element" id="element-selected" name="false" onClick={((e) => this.setTransfer(e, object))}>
                                            <div className="item"> <img src={icoEuro} className="ico" /> <span className="display-value" id="amount">{object.amount}</span></div>
                                            <div className="item" id="list"><img src={icoTransferOut} id="ico-stable" className="ico-non-reverse" /> <span className="display-value"> {this.getName(object.debited_wallet_id)}</span></div>
                                            <div className="item" id="list"> <img src={icoTransferIn} id="ico-stable" className="ico-non-reverse" /> <span className="display-value"> {this.getName(object.credited_wallet_id)}</span></div>
                                        </div>
                                    }
                                    {(this.getUser(object.credited_wallet_id).is_admin || this.getUser(object.debited_wallet_id).is_admin) &&
                                        <div className="element" id="admin-selected" name="true" onClick={((e) => this.setTransferAdmin(e, object))}>
                                            <div className="item"> <img src={icoEuro} className="ico" /> <span className="display-value" id="amount">{object.amount}</span></div>
                                            <div className="item" id="list"><img src={icoTransferOut} id="ico-stable" className="ico-non-reverse" /> <span className="display-value"> {this.getName(object.debited_wallet_id)}</span></div>
                                            <div className="item" id="list"> <img src={icoTransferIn} id="ico-stable" className="ico-non-reverse" /> <span className="display-value"> {this.getName(object.credited_wallet_id)}</span></div>
                                        </div>
                                    }
                                </div>
                            );
                        }, this)}
                    </div>}
                    {localStorageGetter("transfer").length == 0 &&
                        <div className="element">
                            <span className="display-none">No transfer has been recorded yet</span>
                        </div>
                    }
                </section>
                {console.log(this.state)}
                {this.state.idTransfer != '' && <div>
                    {!this.state.isAdmin &&
                        <section>
                            <div className='section-header'><img src={icoOperation} className="ico" /><span >Operation</span></div>
                            <div className="operation"><img src={icoTrashOption} className="ico-non-reverse" id="ico-margin" onClick={this.deleteTransfer} /><p>Delete the selected transfer</p></div>
                        </section>}
                    {this.state.isAdmin &&
                        <section>
                            <div className='section-header'><img src={icoOperation} className="ico" /><span >Operation</span></div>
                            <div className="operation"><p id="red">Impossible to delete a transfer involving an administrator</p></div>
                        </section>}
                </div>}
            </div>
        );
    }
}

export default TransferManagerMenu;