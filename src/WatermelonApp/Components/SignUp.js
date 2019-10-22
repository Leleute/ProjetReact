import React, { Component } from 'react';

import Connection from "./Connection"
import signup from "../style/signup.css";
import { Redirect, Link } from 'react-router-dom';

import username from "../img/username.png";
import psw from "../img/psw.png";
import name from "../img/name.png"
import { LocalStorageGetter, LocalStorageSetter } from './raccourci';


class SignUp extends Component {

    constructor() {
        super();
        this.state = {
            render: '',
            back: true,
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

    saveData = (data) => {
        this.setState({
            [data.target.name]: data.target.value
        });
    }

    handleClick(compName, e) {
        console.log(compName);
        this.setState({ render: compName, back:false });
    }

    _renderSubComp() {
        switch (this.state.render) {
            case 'back': return <Connection />
        }
    }

    AccountCreation = () => {

        let users = LocalStorageGetter("users");
        var creavalide = true;
        users.map((user) => {
            //Verification que l'email n'est pas deja inscrite
            if (user.email == this.state.email) { creavalide = false }
        });
        //Mise en place de l'ID
        users.map((user) => {
            this.state.id++;
        });
        if (creavalide == true) {
            let newUser = {id: this.state.id, last_name: this.state.last_name, first_name: this.state.first_name, email: this.state.email, password: this.state.password, is_admin: this.state.is_admin };
            LocalStorageSetter("last_name", newUser.last_name);
            LocalStorageSetter("first_name", newUser.first_name);
            LocalStorageSetter("email", newUser.email);
            LocalStorageSetter("password", newUser.password);
            let allUsers = LocalStorageGetter("users");
            allUsers.push(newUser);
            console.log(newUser);
            LocalStorageSetter("users", allUsers);
            alert("Creation validée !");
        }
    }

    testBDD = () => {
        let users = LocalStorageGetter("users");
        console.log(users)
    }

    render() {
        return (
            <div>
                {this.state.back &&
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
                        <input className="input-entry" name="password" onChange={this.saveData} type="text"></input>
                        </div>
                        <div className="button-list">
                        <button onClick={this.AccountCreation}>Sign-up</button>
                        <button onClick={this.handleClick.bind(this, 'back')}>Back</button>
                        <button onClick={this.testBDD}>Test BDD</button>
                        </div>
                    </div>}
                {this._renderSubComp()}
            </div>
        );
    }
}

export default SignUp;