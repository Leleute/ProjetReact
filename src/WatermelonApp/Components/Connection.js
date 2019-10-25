import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

import SignIn from './SignIn';
import SignUp from './SignUp'

import '../style/connection.css';
import signIn from '../img/sign_in.png';
import signUp from '../img/sign_up.png';
import about from '../img/about.png';
import { isTSTypeAliasDeclaration } from '@babel/types';




class Connection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            render: '',
            connected: false,
            data: '',
            showMe: true
        }
        this.handleChangeValue = this.handleChangeValue.bind(this);
    }

    handleChangeValue = (connected) => {
        if (connected == true) {
            this.props.value(true);
        } else {
            this.setState({ showMe: true })
        }
    }

    setData = (myData) => {
        if (myData != '') {
            this.setState({
                data: myData
            });
            this.props.data(myData);
        }
    }


    handleClick(compName, e) {
        console.log(compName);
        this.setState({ render: compName });
        this.setState({ showMe: !this.state.showMe })
    }

    _renderSubComp() {
        switch (this.state.render) {
            case 'signin': return <SignIn connected={this.handleChangeValue} display={true} data={this.setData} showMe={this.state.showMe} />
            case 'signup': return <SignUp connected={this.handleChangeValue} display={true} data={this.setData} showMe={this.state.showMe} />
        }
    }

    render() {
        return (
            <div>
                {this.state.showMe &&
                    <div className="connection-header">
                        <div className="option-section" onClick={this.handleClick.bind(this, 'signin')}>
                            <img src={signIn} className="logo" />Sign in
                    </div>
                        <div className="option-section" onClick={this.handleClick.bind(this, 'signup')}>
                            <img src={signUp} className="logo" />Sign up
                    </div>
                        <div className="option-section" onClick={this.handleClick.bind(this, 'about')}>
                            <img src={about} className="logo" />About Watermelon
                    </div>
                    </div>
                }
                {this._renderSubComp()}
            </div>

        );

    }
}

export default Connection;


