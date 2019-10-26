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
        alert(this.state.idTransfer);

        //delete transfer with id=idTransfer

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