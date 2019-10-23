import React, { Component } from 'react';

import '../style/settingsmenu.css';

import icoSettings from '../img/ico_settings.png';
import username from "../img/username.png";
import psw from "../img/psw.png";
import name from "../img/name.png";
import admin from '../img/admin.png';
import icoEdit from '../img/ico_edit.png';

import { LocalStorageGetter, LocalStorageSetter } from '../Shortcut';



class SettingsMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.userMenu,
            copyUser: this.props.userMenu
        }
    }

    updateInputValue = (e) => {
        if (e.target.name == 'last_name') {
            this.state.copyUser.last_name = e.target.value;
        } else if (e.target.name == 'first_name') {
            this.state.copyUser.first_name = e.target.value;
        } else if (e.target.name == 'email') {
            this.state.copyUser.email = e.target.value;
        } else if (e.target.name == 'password') {
            this.state.copyUser.password = e.target.value;
        } else {
            this.state.copyUser.is_admin = e.target.value;
        }
    }

    saveChanges(data, e) {
        let allUsers = LocalStorageGetter("users");
        allUsers.map((it) => {
            if (it.id == this.state.user.id)
                if (data == 'last_name') {
                    //Modifier local storage pour le user (à partir de la valeur copyUser) puis reload user dans state avec celui modifier dans localStorage
                } else if (data == 'first_name') {
                    //Modifier local storage pour le user (à partir de la valeur copyUser) puis reload user dans state avec celui modifier dans localStorage
                } else if (data == 'email') {
                    //Modifier local storage pour le user (à partir de la valeur copyUser) puis reload user dans state avec celui modifier dans localStorage
                } else if (data == 'password') {
                    //Modifier local storage pour le user (à partir de la valeur copyUser) puis reload user dans state avec celui modifier dans localStorage
                } else {
                    //Modifier local storage pour le user (à partir de la valeur copyUser) puis reload user dans state avec celui modifier dans localStorage
                }
        });     
    }

    render() {
        console.log(this);
        return (
            <div className="container">
                <section><img src={icoSettings} className="logo" />MY ACCOUNT INFORMATION</section>
                <section>
                    <li><img src={username} className="logo" /><span>Last Name</span><input name='last_name' type="text" defaultValue={this.state.user.last_name} onChange={e => this.updateInputValue(e)} /><img src={icoEdit} onClick={this.saveChanges.bind(this, 'last_name')} className="ico-edit" /></li>
                    <li><img src={username} className="logo" /><span>First Name</span><input name='first_name' type="text" defaultValue={this.state.user.first_name} onChange={e => this.updateInputValue(e)} /><img src={icoEdit} onClick={this.saveChanges.bind(this, 'first_name')} className="ico-edit" /></li>
                    <li><img src={name} className="logo" /><span>Email</span><input name='email' type="text" defaultValue={this.state.user.email} onChange={e => this.updateInputValue(e)} /><img src={icoEdit} onClick={this.saveChanges.bind(this, 'email')} className="ico-edit" /></li>
                    <li><img src={psw} className="logo" /><span>Password</span><input name='password' type="password" defaultValue={this.state.user.password} onChange={e => this.updateInputValue(e)} /><img src={icoEdit} onClick={this.saveChanges.bind(this, 'password')} className="ico-edit" /></li>
                    <li><img src={admin} className="logo" /><span>Admin rights</span><input name='is_admin' type="text" defaultValue={this.state.user.is_admin} onChange={e => this.updateInputValue(e)} /><img src={icoEdit} onClick={this.saveChanges.bind(this, 'is_admin')} className="ico-edit" /></li>
                </section>
            </div>
        );
    }
}

export default SettingsMenu;