import React, { Component } from 'react';

import Connection from "./Connection"
import signup from "../style/signup.css";

import username from "../img/username.png";
import psw from "../img/psw.png";
import name from "../img/name.png"

class SignUp extends Component {

    constructor() {
        super();
        this.state = {
            render: '',
            back: true
        }
    }

    dismiss() {
        this.props.unmountMe();
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
                            <input className="input-entry" type="text"></input>
                        </div>
                        <div className="option-section">
                            <img src={name} className="logo" /><span>First name</span>
                            <input className="input-entry" type="text"></input>
                        </div>
                        <div className="option-section">
                            <img src={username} className="logo" /><span>Email</span>
                            <input className="input-entry" type="text"></input>
                        </div>
                        <div className="option-section">
                            <img src={psw} className="logo" /><span>Password</span>
                            <input className="input-entry" type="text"></input>
                        </div>
                        <div className="button-list">
                            <button>Sign-up</button>
                            <button onClick={this.handleClick.bind(this, 'back')}>Back</button>
                        </div>
                    </div>}
                {this._renderSubComp()}
            </div>
        );
    }
}

export default SignUp;