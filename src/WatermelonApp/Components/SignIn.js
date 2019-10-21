import React, { Component } from 'react';

import Connection from "./Connection"
import signin from "../style/signin.css";

import username from "../img/username.png";
import psw from "../img/psw.png";

class SignIn extends Component {

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
                    <div className="signin-form">
                        <div className="option-section">
                            Please provide your information to sign-in
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
                            <button>Sign-in</button>
                            <button onClick={this.handleClick.bind(this, 'back')}>Back</button>
                        </div>
                    </div>}
                {this._renderSubComp()}
            </div>
        );
    }
}

export default SignIn;