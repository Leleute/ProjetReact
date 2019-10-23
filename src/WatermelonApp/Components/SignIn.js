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
        this.setState({back:true});
        this.props.connected(false);
    }

    connection = () => {
        var connexionfonctionne = false;
        let users = LocalStorageGetter("users");
        let connectedUser;
        users.map((user) => {
            if (this.state.email != '' && this.state.password != '' && this.state.email == user.email && this.state.password == user.password) {
                connexionfonctionne = true;
                connectedUser = user;
                this.setState({back:true});
                this.props.connected(true);
                this.props.connectedUser(connectedUser);
            }
        });

        if (connexionfonctionne == false) {
            alert("Those infomations do not correspond to an account, please try again");
        } else {
            LocalStorageSetter("connectedUser", connectedUser);
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