import React, { Component } from 'react';

import '../style/signin.css';

import username from "../img/username.png";
import psw from "../img/psw.png";

import { localStorageGetter, localStorageSetter } from '../shortcut';

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render: '',
            email: '',
            password: ''
        }
    }

    dismiss() {
        this.props.unmountMe();
    }

    back = () => {
        this.setState({ back: true });
        this.props.connected(false);
    }

    connection = () => {
        var connexionfonctionne = false;
        let users = localStorageGetter("users");

        let connectedUser;
        //Get user
        users.forEach((user) => {
            if (this.state.email !== '' && this.state.password !== '' && this.state.email === user.email && this.state.password === user.password) {
                connexionfonctionne = true;
                connectedUser = user;
                this.setState({ back: true });
                this.props.connected(true);
            }

        });

        if (connexionfonctionne == false) {
            alert("Those infomations do not correspond to an account, please try again");
        } else {

            let connectedWallet;
            let wallets = localStorageGetter("wallet");
            wallets.forEach((wallet) => {
                if (wallet.user_id == connectedUser.id) {
                    connectedWallet = wallet;
                }
            });
            var connectedPayin = [];
            let payins = localStorageGetter("payin");
            payins.forEach((payin) => {
                if (payin.wallet_id == connectedWallet.id) {
                    connectedPayin.push(payin);
                }
            });
            var connectedPayout = [];
            let payouts = localStorageGetter("payout");
            payouts.forEach((payout) => {
                if (payout.wallet_id == connectedWallet.id) {
                    connectedPayout.push(payout);
                }
            });
            var connectedCard = [];
            let cards = localStorageGetter("cards");
            cards.forEach((card) => {
                if (card.user_id == connectedUser.id) {
                    connectedCard.push(card);
                }
            });
            var connectedTransfIn = [];
            let transIns = localStorageGetter("transfer");
            transIns.forEach((transIn) => {
                if (transIn.credited_wallet_id == connectedWallet.id) {
                    connectedTransfIn.push(transIn);
                }
            });
            var connectedTransfOut = [];
            let transOuts = localStorageGetter("transfer");
            transOuts.forEach((transOut) => {
                if (transOut.debited_wallet_id == connectedWallet.id) {
                    connectedTransfOut.push(transOut);
                }
            });
            console.log(connectedUser);
            console.log(connectedCard);
            console.log(localStorageGetter("cards"));
            localStorageSetter("connectedUser", connectedUser);
            localStorageSetter("connectedWallet", connectedWallet);
            localStorageSetter("connectedPayin", connectedPayin);
            localStorageSetter("connectedPayout", connectedPayout);
            localStorageSetter("connectedCard", connectedCard);
            localStorageSetter("connectedTransfIn", connectedTransfIn);
            localStorageSetter("connectedTransfOut", connectedTransfOut);

        }
    }

    saveData = (data) => {
        this.setState({
            [data.target.name]: data.target.value
        });
    }


    render() {
        console.log(this);
        return (
            <div>
                {this.props.display && !this.props.showMe &&
                    <div className="signin-form">
                        <div className="option-section">
                            <header>Please provide your information to sign-in</header>
                        </div>
                        <div className="option-section">
                            <img src={username} alt="img" className="logo" /><span>Email</span>
                            <input className="input-entry" name="email" onChange={this.saveData} type="text"></input>
                        </div>
                        <div className="option-section">
                            <img src={psw} alt="img" className="logo" /><span>Password</span>
                            <input className="input-entry" name="password" onChange={this.saveData} type="password"></input>
                        </div>
                        <div className="button-list">
                            <button onClick={this.connection}>Sign-in</button>
                            <button onClick={this.back}>Back</button>
                        </div>
                    </div>}
            </div>
        );
    }
}

export default SignIn;