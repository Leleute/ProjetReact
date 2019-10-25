import React, { Component } from 'react';

import icoTransfer from '../img/ico_exchange.png';

import { LocalStorageGetter } from '../Shortcut';

class TransferMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        console.log("wallet")

        return (
            <div className="container">
                <header><img src={icoTransfer} className="ico" />TRANSFER</header>
            </div>
        );
    }
}

export default TransferMenu;