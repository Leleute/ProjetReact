import React, { Component } from 'react';

import SignIn from './SignIn';
import SignUp from './SignUp'

import '../style/connection.css';
import signIn from '../img/sign_in.png';
import signUp from '../img/sign_up.png';

class Connection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            render: '',
            connected: false,
            showMe: true
        }
        this.handleChangeValue = this.handleChangeValue.bind(this);
    }

    handleChangeValue = (connected) => {
        if (connected === true) {
            this.props.value(true);
        } else {
            this.setState({ showMe: true })
        }
    }

    handleClick(compName, e) {
        console.log(compName);
        this.setState({ render: compName });
        this.setState({ showMe: !this.state.showMe })
    }

    renderSubComp() {
        switch (this.state.render) {
            case 'signin': return <SignIn connected={this.handleChangeValue} display={true} showMe={this.state.showMe} />
            case 'signup': return <SignUp connected={this.handleChangeValue} display={true} showMe={this.state.showMe} />
            default : return null;
        }
    }

    render() {
        return (
            <div>
                {this.state.showMe &&
                    <div className="connection-header">
                        <div className="option-section" onClick={this.handleClick.bind(this, 'signin')}>
                            <img src={signIn} alt="img" className="logo" />Sign in
                    </div>
                        <div className="option-section" onClick={this.handleClick.bind(this, 'signup')}>
                            <img src={signUp} alt="img" className="logo" />Sign up
                    </div>
                    </div>
                }
                {this.renderSubComp()}
            </div>

        );

    }
}

export default Connection;


