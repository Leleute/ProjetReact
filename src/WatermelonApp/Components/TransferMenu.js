import React, { Component } from 'react';

import icoTransfer from '../img/ico_exchange.png';
import icoTransferReceiver from '../img/ico_transfer_receiver.png';
import icoUsername from "../img/username.png";
import icoEmail from "../img/name.png";
import { LocalStorageGetter } from '../Shortcut';

class TransferMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="container">
                <header><img src={icoTransfer} className="ico" />TRANSFER</header>
                <section>
                    <div className='section-header'><img src={icoTransferReceiver} className="ico" /><span >Choose a Transfer receiver</span></div>
                    {LocalStorageGetter('users').map(function (object, i) {
                        return (
                            <div className="user-choice">
                                {object.id != LocalStorageGetter('connectedUser').id &&
                                    <div className="item">
                                        <li><img src={icoUsername} className="ico" /> <p className="display-value">{object.last_name.toUpperCase()} {object.first_name}</p></li>
                                        <li><img src={icoEmail} className="ico" /><p className="display-value"> {object.email}</p></li>
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

export default TransferMenu;