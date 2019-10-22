import React, { Component } from 'react';

import Connection from "./Connection"
import signin from "../style/signin.css";

import username from "../img/username.png";
import psw from "../img/psw.png";

import { LocalStorageGetter, LocalStorageSetter } from './raccourci';

class SignIn extends Component {

    constructor() {
        super();
        this.state = {
            render: '',
            back: true,
            email: '',
            password: ''
        }
    }

    dismiss() {
        this.props.unmountMe();
    }

    handleClick(compName, e) {
        console.log(compName);
        this.setState({ render: compName, back: false });
    }

    _renderSubComp() {
        switch (this.state.render) {
            case 'back': return <Connection />
        }
    }

    connection = () => {
        var connexionfonctionne = false;
        let users = LocalStorageGetter("users");
        let connectedUser;
        console.log(this.state)
        users.map((user) => {
            if (this.state.email == user.email && this.state.password == user.password)
            {
                connexionfonctionne = true;
                connectedUser = user;
            }
            
        });
        if (connexionfonctionne == false) {
            alert("Those infomations do not correspond to an account, please try again");
        }
        if (connexionfonctionne == true) {
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
    return (
        <div>
            {this.state.back &&
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
                        <input className="input-entry" name="password" onChange={this.saveData} type="text"></input>
                    </div>
                    <div className="button-list">
                        <button onClick={this.connection}>Sign-in</button>
                    <button onClick={this.handleClick.bind(this, 'back')}>Back</button>
                    <button onClick={this.testConnexion}>Test</button>
                    </div>
                </div>}
            {this._renderSubComp()}
        </div>
    );
}
}

export default SignIn;