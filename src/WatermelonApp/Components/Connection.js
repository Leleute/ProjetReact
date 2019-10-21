import React, { Component } from 'react';

import SignIn from './SignIn';
import SignUp from './SignUp'

import '../style/connection.css';
import signIn from '../img/sign_in.png';
import signUp from '../img/sign_up.png';
import about from '../img/about.png';




class Connection extends Component {

    constructor(){
        super();
        this.state = {
            render:'',
            showMe : true
        }
    }

    handleClick(compName, e){
        console.log(compName);
        this.setState({render:compName});   
            this.setState({showMe:!this.state.showMe})     
    }

    _renderSubComp(){
        switch(this.state.render){
            case 'signin': return <SignIn/>
            case 'signup': return <SignUp/>
        }
    }

    render() {
        return (
            <div>
                {this.state.showMe &&
                <div className="connection-header">
                    <div className="option-section" onClick={this.handleClick.bind(this, 'signin')}>
                        <img src={signIn} className="logo"/>Sign in
                    </div>
                    <div className="option-section" onClick={this.handleClick.bind(this, 'signup')}>
                        <img src={signUp} className="logo"/>Sign up
                    </div>
                    <div className="option-section" onClick={this.handleClick.bind(this, 'about')}>
                        <img src={about} className="logo"/>About Watermelon
                    </div>
                </div>
                }
                {this._renderSubComp()}
            </div>
           
        );

    }
}

export default Connection;


