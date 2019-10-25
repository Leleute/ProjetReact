import React, { Component } from 'react';

import Connection from "./Connection"

import signup from "../style/signup.css";
import { Redirect, Link } from 'react-router-dom';

import username from "../img/username.png";
import psw from "../img/psw.png";
import name from "../img/name.png"
import { LocalStorageGetter, LocalStorageSetter } from '../Shortcut';


class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render: '',
            id: 1,
            lastname: "",
            firstname: "",
            email: "",
            password: "",
            is_admin: false
        }
    }

    dismiss() {
        this.props.unmountMe();
    }

    back = () => {
        this.setState({back:true});
        this.props.connected(false);
    }

    saveData = (data) => {
        this.setState({
            [data.target.name]: data.target.value
        });
    }

    AccountCreation = () => {

        let users = LocalStorageGetter("users");
        var creavalide = true;
        users.map((user) => {
            //Verification que l'email n'est pas deja inscrite
            if (user.email == this.state.email) { creavalide = false }
        });
        //Mise en place de l'ID
        var newId = 0;
        users.map((user) => {
            if (user.id > newId) {
                newId = user.id;
            }
        });
        newId++;
        this.state.id = newId;
        if (creavalide == true) {
            //Creation du compte
            let newUser = { id: this.state.id, last_name: this.state.last_name, first_name: this.state.first_name, email: this.state.email, password: this.state.password, is_admin: this.state.is_admin };

            let allUsers = LocalStorageGetter("users");
            allUsers.push(newUser);
            console.log(newUser);
            LocalStorageSetter("users", allUsers);
            alert("Creation valide !");
            this.setState({ connected: true });
            this.setState({ back: true });
            this.props.connected(true);
            LocalStorageSetter("connectedUser", newUser);
            //Creation du wallet
            let newWallet = {id: this.state.id, balance: 0, user_id: this.state.id};
            let allwallets = LocalStorageGetter("wallet");
            allwallets.push(newWallet);
            LocalStorageSetter("wallet", allwallets);
            LocalStorageSetter("connectedWallet", newWallet);


            LocalStorageSetter("connectedPayin", new Array());
            LocalStorageSetter("connectedPayout", new Array());
            LocalStorageSetter("connectedCard", new Array());
            LocalStorageSetter("connectedTransfIn", new Array());
            LocalStorageSetter("connectedTransfOut", new Array());

        }
        else {
            alert("Un compte utilise deja cette adresse email");
        }
    }
    testBDD = () => {
        let users = LocalStorageGetter("users");
        console.log(users)
    }

    render() {
        console.log(this.props)
        return (
            <div>
                {this.props.display && !this.props.showMe &&
                    <div className="signup-form">
                        <div className="option-section">
                            Please provide your information to sign-up
                        </div>
                        <div className="option-section">
                            <img src={name} className="logo" /><span>Last name</span>
                            <input className="input-entry" name="last_name" onChange={this.saveData} type="text"></input>
                        </div>
                        <div className="option-section">
                            <img src={name} className="logo" /><span>First name</span>
                            <input className="input-entry" name="first_name" onChange={this.saveData} type="text"></input>
                        </div>
                        <div className="option-section">
                            <img src={username} className="logo" /><span>Email</span>
                            <input className="input-entry" name="email" onChange={this.saveData} type="email"></input>
                        </div>
                        <div className="option-section">
                            <img src={psw} className="logo" /><span>Password</span>
                            <input className="input-entry" name="password" onChange={this.saveData} type="password"></input>
                        </div>
                        <div className="button-list">
                            <button onClick={this.AccountCreation}>Sign-up</button>
                            <button onClick={this.back}>Back</button>
                            <button onClick={this.testBDD}>Test BDD</button>
                        </div>
                    </div>}
            </div>
        );
    }
}

export default SignUp;