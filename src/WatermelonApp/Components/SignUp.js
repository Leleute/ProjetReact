import React, { Component } from 'react';

import '../style/signup.css';

import username from "../img/username.png";
import psw from "../img/psw.png";
import name from "../img/name.png"
import { localStorageGetter, localStorageSetter } from '../shortcut';

/*
    Sign up component is managing the new registration of a user - entry point of the application
*/
class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render: '',
            lastname: "",
            firstname: "",
            email: "",
            password: "",
            isAdmin: false
        }
    }

    dismiss() {
        this.props.unmountMe();
    }

    back = () => {
        this.setState({ back: true });
        this.props.connected(false);
    }

    saveData = (data) => {
        this.setState({
            [data.target.name]: data.target.value
        });
    }

    accountCreation = () => {

        let users = localStorageGetter("users");
        var creavalide = true;
        users.forEach((user) => {
            //Verification que l'email n'est pas deja inscrite
            if (user.email == this.state.email) { creavalide = false }
        });
        //Mise en place de l'ID
        var newId = 0;
        users.forEach((user) => {
            if (user.id > newId) {
                newId = user.id;
            }
        });
        newId++;
        this.setState({id : newId});
        if (creavalide == true) {
            //Creation du compte
            let newUser = { id: newId, last_name: this.state.last_name, first_name: this.state.first_name, email: this.state.email, password: this.state.password, is_admin: this.state.isAdmin };

            let allUsers = localStorageGetter("users");
            allUsers.push(newUser);
            localStorageSetter("users", allUsers);
            this.setState({ connected: true });
            this.setState({ back: true });
            this.props.connected(true);
            localStorageSetter("connectedUser", newUser);
            //Creation du wallet
            let newWallet = { id: newId, balance: 0, user_id: newId };
            let allwallets = localStorageGetter("wallet");
            allwallets.push(newWallet);

            localStorageSetter("wallet", allwallets);
            localStorageSetter("connectedWallet", newWallet);      
            localStorageSetter("connectedPayin", []);
            localStorageSetter("connectedPayout", []);
            localStorageSetter("connectedCard", []);
            localStorageSetter("connectedTransfIn", []);
            localStorageSetter("connectedTransfOut", []);

        }
        else {
            alert("An account is already using this email address");
        }
    }

    render() {
        return (
            <div>
                {this.props.display && !this.props.showMe &&
                    <div className="signup-form">
                        <div className="option-section">
                            <header>Please provide your information to sign-up</header>
                        </div>
                        <div className="option-section">
                            <img alt="img" src={name} className="logo" /><span>Last name</span>
                            <input className="input-entry" name="last_name" onChange={this.saveData} type="text"></input>
                        </div>
                        <div className="option-section">
                            <img src={name} alt="img" className="logo" /><span>First name</span>
                            <input className="input-entry" name="first_name" onChange={this.saveData} type="text"></input>
                        </div>
                        <div className="option-section">
                            <img src={username} alt="img" className="logo" /><span>Email</span>
                            <input className="input-entry" name="email" onChange={this.saveData} type="email"></input>
                        </div>
                        <div className="option-section">
                            <img src={psw} alt="img" className="logo" /><span>Password</span>
                            <input className="input-entry" name="password" onChange={this.saveData} type="password"></input>
                        </div>
                        <div className="button-list">
                            <button onClick={this.accountCreation}>Sign-up</button>
                            <button onClick={this.back}>Back</button>
                        </div>
                    </div>}
            </div>
        );
    }
}

export default SignUp;