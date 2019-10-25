import React, { Component } from 'react';

import Connection from "./Connection"

import signin from "../style/signin.css";

import username from "../img/username.png";
import psw from "../img/psw.png";

import { LocalStorageGetter, LocalStorageSetter } from '../Shortcut';

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
        let users = LocalStorageGetter("users");

        let connectedUser;
        let myData = new Object();
        //Get user
        users.map((user) => {
            if (this.state.email != '' && this.state.password != '' && this.state.email == user.email && this.state.password == user.password) {
                connexionfonctionne = true;
                connectedUser = user;
                this.setState({ back: true });
                this.props.connected(true);
                myData['user'] = connectedUser;

                //Get all data
                let cardsTab = LocalStorageGetter('cards');
                let payinTab = LocalStorageGetter('payin');
                let payoutTab = LocalStorageGetter('payout');
                let walletTab = LocalStorageGetter('wallet');

                let myCards = []
                cardsTab.map((card) => {
                    if (connectedUser.id == card.user_id) {
                        myCards.push(card);
                    }
                });
                myData['cards'] = myCards;
                walletTab.map((wallet) => {
                    if (connectedUser.id == wallet.user_id) {
                        myData['wallet'] = wallet;
                    }
                });
                let myPayIn = []
                payinTab.map((payin) => {
                    if (myData['wallet'].id == payin.wallet_id) {
                        myPayIn.push(payin);
                    }
                });
                myData['payin'] = myPayIn;
                let myPayOut = []
                payoutTab.map((payout) => {
                    if (myData['wallet'].id == payout.wallet_id) {
                        myPayOut.push(payout);
                    }
                });
                myData['payout'] = myPayOut;

                this.props.data(myData);
            }

        });

        if (connexionfonctionne == false) {
            alert("Those infomations do not correspond to an account, please try again");
        } else {
            let connectedWallet;
            let wallets = LocalStorageGetter("wallet");
            wallets.map((wallet) => {
                if (wallet.user_id == connectedUser.id) {
                    connectedWallet = wallet;
                }
            });
            var connectedPayin = new Array();
            let payins = LocalStorageGetter("payin");
            payins.map((payin) => {
                if (payin.wallet_id == connectedWallet.id) {
                    connectedPayin.push(payin);
                }
            });
            var connectedPayout = new Array();
            let payouts = LocalStorageGetter("payout");
            payouts.map((payout) => {
                if (payout.wallet_id == connectedWallet.id) {
                    connectedPayout.push(payout);
                }
            });
            var connectedCards = new Array();
            let cards = LocalStorageGetter("cards");
            cards.map((card) => {
                //alert(card.user_id + " " + connectedUser.id)
                if (card.user_id == connectedUser.id) {
                    alert("aaa")
                    connectedCards.push(card);
                }
            });
            LocalStorageSetter("connectedUser", connectedUser);
            LocalStorageSetter("connectedWallet", connectedWallet);
            LocalStorageSetter("connectedPayin", connectedPayin);
            LocalStorageSetter("connectedPayout", connectedPayout);
            LocalStorageSetter("connectedCard", connectedCards);
            alert(LocalStorageGetter("connectedCard"));
        }
    }

    saveData = (data) => {
        this.setState({
            [data.target.name]: data.target.value
        });
    }

    testConnexion = () => {
        console.log(LocalStorageGetter("connectedUser"));
    }

    render() {
        console.log(this);
        return (
            <div>
                {this.props.display && !this.props.showMe &&
                    <div className="signin-form">
                        <div className="option-section">
                            Please provide your information to sign-in
                        </div>
                        <div className="option-section">
                            <img src={username} className="logo" /><span>Email</span>
                            <input className="input-entry" name="email" onChange={this.saveData} type="text"></input>
                        </div>
                        <div className="option-section">
                            <img src={psw} className="logo" /><span>Password</span>
                            <input className="input-entry" name="password" onChange={this.saveData} type="password"></input>
                        </div>
                        <div className="button-list">
                            <button onClick={this.connection}>Sign-in</button>
                            <button onClick={this.back}>Back</button>
                            <button onClick={this.testConnexion}>Test</button>
                        </div>
                    </div>}
            </div>
        );
    }
}

export default SignIn;