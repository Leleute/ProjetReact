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
            data: this.props.data,
            copyUser: this.props.data['user']
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
            if (it.id == this.state.data['user'].id)
                if (data == 'last_name') {
                    //Modifier local storage pour le user (à partir de la valeur copyUser) puis reload user dans state avec celui modifier dans localStorage
                    let users = LocalStorageGetter("users");
                    users.map((u) => {
                        if (u.id == this.state.data['user'].id) {
                            u.last_name = this.state.copyUser.last_name;
                            console.log(u);
                            LocalStorageSetter("users", users);
                            this.state.data['user'] = u;
                        }
                    })
                } else if (data == 'first_name') {
                    //Modifier local storage pour le user (à partir de la valeur copyUser) puis reload user dans state avec celui modifier dans localStorage
                    let users = LocalStorageGetter("users");
                    users.map((u) => {
                        if (u.id == this.state.data['user'].id) {
                            u.first_name = this.state.copyUser.first_name;
                            console.log(u);
                            LocalStorageSetter("users", users);
                            this.state.data['user'] = u;

                        }
                    })
                } else if (data == 'email') {
                    //Modifier local storage pour le user (à partir de la valeur copyUser) puis reload user dans state avec celui modifier dans localStorage
                    let users = LocalStorageGetter("users");
                    users.map((u) => {
                        if (u.id == this.state.data['user'].id) {
                            u.email = this.state.copyUser.email;
                            console.log(u);
                            LocalStorageSetter("users", users);
                            this.state.data['user'] = u;
                        }
                    })
                } else if (data == 'password') {
                    //Modifier local storage pour le user (à partir de la valeur copyUser) puis reload user dans state avec celui modifier dans localStorage
                    let users = LocalStorageGetter("users");
                    users.map((u) => {
                        if (u.id == this.state.data['user'].id) {
                            u.password = this.state.copyUser.password;
                            console.log(u);
                            LocalStorageSetter("users", users);
                            this.state.data['user'] = u;
                        }
                    })
                } else {
                    //Modifier local storage pour le user (à partir de la valeur copyUser) puis reload user dans state avec celui modifier dans localStorage
                }
        });
    }

    render() {
        console.log(this.state.data);
        return (
            <div className="container">
                <header><img src={icoSettings} className="ico" />MY ACCOUNT</header>
                <section>
                    <li><img src={username} className="ico" /><span>Last Name</span><input name='last_name' type="text" defaultValue={this.state.data['user'].last_name} onChange={e => this.updateInputValue(e)} /><img src={icoEdit} onClick={this.saveChanges.bind(this, 'last_name')} className="ico-edit" /></li>
                    <li><img src={username} className="ico" /><span>First Name</span><input name='first_name' type="text" defaultValue={this.state.data['user'].first_name} onChange={e => this.updateInputValue(e)} /><img src={icoEdit} onClick={this.saveChanges.bind(this, 'first_name')} className="ico-edit" /></li>
                    <li><img src={name} className="ico" /><span>Email</span><input name='email' type="text" defaultValue={this.state.data['user'].email} onChange={e => this.updateInputValue(e)} /><img src={icoEdit} onClick={this.saveChanges.bind(this, 'email')} className="ico-edit" /></li>
                    <li><img src={psw} className="ico" /><span>Password</span><input name='password' type="password" defaultValue={this.state.data['user'].password} onChange={e => this.updateInputValue(e)} /><img src={icoEdit} onClick={this.saveChanges.bind(this, 'password')} className="ico-edit" /></li>
                    <li><img src={admin} className="ico" /><span>Admin rights</span><input name='is_admin' type="text" value={this.state.data['user'].is_admin} /></li>
                </section>
            </div>
        );
    }
}

export default SettingsMenu;