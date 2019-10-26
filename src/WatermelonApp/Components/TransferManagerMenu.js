import React, { Component } from 'react';

import '../style/transfermanagermenu.css';

import icoManagerTransfer from '../img/ico_manager_transaction.png';
import icoTransfer from '../img/ico_exchange.png';
import icoTransferIn from '../img/ico_transfer_in.png';
import icoTransferOut from '../img/ico_transfer_out.png';
import icoEuro from '../img/ico_euro.png';
import icoTrashOption from '../img/ico_trash.png';
import icoOperation from '../img/ico_operation.png';


import { LocalStorageGetter, LocalStorageSetter } from '../Shortcut';

class TransferManagerMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idTransfer: '',
            boolTransfer: false
        }
        this.getUser = this.getUser.bind(this);
        this.getName = this.getName.bind(this);
        this.deleteTransfer = this.deleteTransfer.bind(this);
    }

    componentDidMount() {
        LocalStorageGetter("users").map((user) => {
            if (!user.is_admin) {
                LocalStorageGetter("transfer").map((tf) => {
                    if (tf.credited_wallet_id == user.id || tf.debited_wallet_id == user.id) {
                        this.setState({ boolTransfer: true });
                    }
                });
            }
        });
    }

    getUser(idWallet) {
        let foundUser;
        LocalStorageGetter("users").map((user) => {
            if (user.id == idWallet) {
                foundUser = user;
            }
        });
        return foundUser;
    }

    getName(idWallet) {
        let name;
        LocalStorageGetter("users").map((user) => {
            if (user.id == idWallet) {
                name = user.last_name.toUpperCase() + " " + user.first_name;

            }
        });
        return (<span id="return">{name}</span>)
    }

    setTransfer = (e, object) => {
        if (object.id != this.state.idTransfer) {
            this.setState({ idTransfer: object.id });
        } else {
            this.setState({ idTransfer: '' });
        }
    }

    deleteTransfer(event) {
        //idTransfer
        let walletReceiverid = 0;
        let walletSenderid = 0;
        let amount = 0;
        let listTransfer = LocalStorageGetter("transfer")
        listTransfer.map((t) => {
            if (t.id = this.state.idTransfer) {
                walletSenderid = t.debited_wallet_id;
                walletReceiverid = t.credited_wallet_id;
                amount = t.amount * 100;
            }
        });      
        //recuperation des wallet et modification des balances
        let listWallet = LocalStorageGetter("wallet");
        listWallet.map((w) => {
            if (w.id == walletReceiverid) {
                w.balance = parseInt(w.balance) - parseInt(amount);
            }
            if (w.id == walletSenderid) {
                w.balance = parseInt(w.balance) + parseInt(amount);
            }
        });
        //mise a jour du local Storage des transfer et wallet
        let alltransfer = LocalStorageGetter("transfer");
        let postDelete = new Array();
        alltransfer.map((u) => {
            if (u.id != this.state.idTransfer) {
                postDelete.push(u);
            }
        });
        LocalStorageSetter("transfer", postDelete);
        LocalStorageSetter("wallet", listWallet);
        let connectedWallet;

        //actualisation des transfers actif et de la balance active
        let wallets = LocalStorageGetter("wallet");
        wallets.map((wallet) => {
            if (wallet.user_id == LocalStorageGetter("connectedUser").id) {
                connectedWallet = wallet;
            }
        });
        var connectedTransfIn = new Array();
        let transIns = LocalStorageGetter("transfer");
        transIns.map((transIn) => {
            if (transIn.credited_wallet_id == LocalStorageGetter("connectedWallet").id) {
                connectedTransfIn.push(transIn);
            }
        });
        var connectedTransfOut = new Array();
        let transOuts = LocalStorageGetter("transfer");
        transOuts.map((transOut) => {
            if (transOut.debited_wallet_id == LocalStorageGetter("connectedWallet").id) {
                connectedTransfOut.push(transOut);
            }
        });

        LocalStorageSetter("connectedWallet", connectedWallet);
        LocalStorageSetter("connectedTransfIn", connectedTransfIn);
        LocalStorageSetter("connectedTransfOut", connectedTransfOut);
        alert("Transfert annul�e");
        this.setState({ idTransfer: '' });
    }

    render() {
        return (
            <div className="container">
                <header ><img src={icoManagerTransfer} className="ico" /><span id="admin-text-color">TRANSFER MANAGER</span></header>
                <section>
                    <div className='section-header'><img src={icoTransfer} className="ico" /><span >All Transfers</span></div>
                    {LocalStorageGetter("transfer").length != 0 && <div>
                        {LocalStorageGetter("transfer").map(function (object, i) {
                            return (
                                <div className="transfer-choice">
                                    {(!this.getUser(object.credited_wallet_id).is_admin && !this.getUser(object.debited_wallet_id).is_admin) ? <div>
                                        {object.id != this.state.idTransfer &&
                                            <div className="element" name={object.id} onClick={((e) => this.setTransfer(e, object))}>
                                                <div className="item"> <img src={icoEuro} className="ico" /> <span className="display-value" id="amount">{object.amount}</span></div>
                                                <div className="item" id="list"><img src={icoTransferOut} id="ico-stable" className="ico_non_reverse" /> <span className="display-value"> {this.getName(object.debited_wallet_id)}</span></div>
                                                <div className="item" id="list"> <img src={icoTransferIn} id="ico-stable" className="ico_non_reverse" /> <span className="display-value"> {this.getName(object.credited_wallet_id)}</span></div>
                                            </div>
                                        }
                                        {object.id == this.state.idTransfer &&
                                            <div className="element" id="admin-selected" name={object.id} onClick={((e) => this.setTransfer(e, object))}>
                                                <div className="item"> <img src={icoEuro} className="ico" /> <span className="display-value" id="amount">{object.amount}</span></div>
                                                <div className="item" id="list"><img src={icoTransferOut} id="ico-stable" className="ico_non_reverse" /> <span className="display-value"> {this.getName(object.debited_wallet_id)}</span></div>
                                                <div className="item" id="list"> <img src={icoTransferIn} id="ico-stable" className="ico_non_reverse" /> <span className="display-value"> {this.getName(object.credited_wallet_id)}</span></div>
                                            </div>
                                        }
                                    </div> : null}
                                </div>
                            );
                        }, this)}
                    </div>}
                    {!this.state.boolTransfer &&
                        <div className="element">
                            <span className="display-none">No user transfer has been recorded yet</span>
                        </div>
                    }
                </section>
                {this.state.idTransfer != '' &&
                    <section>
                        <div className='section-header'><img src={icoOperation} className="ico" /><span >Operation</span></div>
                        <div className="operation"><img src={icoTrashOption} className="ico_non_reverse" id="ico-margin" onClick={this.deleteTransfer} /><p>Delete the selected transfer</p></div>
                    </section>}
            </div>
        );
    }
}

export default TransferManagerMenu;