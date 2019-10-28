import React, { Component } from 'react';

import '../style/settingsmenu.css';

import icoSettings from '../img/ico_settings.png';
import username from "../img/username.png";
import psw from "../img/psw.png";
import name from "../img/name.png";
import admin from '../img/admin.png';
import icoEdit from '../img/ico_edit.png';
import icoModify from '../img/ico_modify.png';
import icoDelete from '../img/ico_delete.png';

import { localStorageGetter, localStorageSetter } from '../shortcut';



class SettingsMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            boolEdit: false,
            copyUser: localStorageGetter("connectedUser")
        }
    }

    deleteAccount = (e) => {
        let allUsers = localStorageGetter("users");
        let postDelete = [];
        allUsers.forEach((u) => {
            if (u.id != localStorageGetter("connectedUser").id) {
                postDelete.push(u);
            }
        });
        localStorageSetter("users", postDelete);
        this.setState({ idUser: '' });

        this.props.isDeleted(true);
    }


    display = (e) => {
        this.setState({ boolEdit: !this.state.boolEdit })
    }

    updateInputValue = (e) => {
        if (e.target.name === 'last_name') {           
            this.state.copyUser.last_name = e.target.value;
        } else if (e.target.name === 'first_name') {
            this.state.copyUser.first_name = e.target.value;
        } else if (e.target.name === 'email') {
            this.state.copyUser.email = e.target.value;
        } else if (e.target.name === 'password') {
            this.state.copyUser.password = e.target.value;
        } else {
            this.state.copyUser.is_admin = e.target.value;
        }
    }

    saveChanges(data, e) {
        let allUsers = localStorageGetter("users");
        allUsers.forEach((it) => {
            if (it.id == localStorageGetter("connectedUser").id)
                if (data == 'last_name') {
                    //Modifier local storage pour le user (à partir de la valeur copyUser) puis reload user dans state avec celui modifier dans localStorage
                    let users = localStorageGetter("users");
                    users.forEach((u) => {
                        if (u.id == localStorageGetter("connectedUser").id) {
                            u.last_name = this.state.copyUser.last_name;
                            console.log(u);
                            localStorageSetter("users", users);
                            localStorageSetter("connectedUser", u);
                        }
                    })
                } else if (data === 'first_name') {
                    //Modifier local storage pour le user (à partir de la valeur copyUser) puis reload user dans state avec celui modifier dans localStorage
                    let users = localStorageGetter("users");
                    users.forEach((u) => {
                        if (u.id == localStorageGetter("connectedUser").id) {
                            u.first_name = this.state.copyUser.first_name;
                            console.log(u);
                            localStorageSetter("users", users);
                            localStorageSetter("connectedUser", u);

                        }
                    })
                } else if (data === 'email') {
                    //Modifier local storage pour le user (à partir de la valeur copyUser) puis reload user dans state avec celui modifier dans localStorage
                    let users = localStorageGetter("users");
                    users.forEach((u) => {
                        if (u.id == localStorageGetter("connectedUser").id) {
                            u.email = this.state.copyUser.email;
                            console.log(u);
                            localStorageSetter("users", users);
                            localStorageSetter("connectedUser", u);
                        }
                    })
                } else if (data === 'password') {
                    //Modifier local storage pour le user (à partir de la valeur copyUser) puis reload user dans state avec celui modifier dans localStorage
                    let users = localStorageGetter("users");
                    users.forEach((u) => {
                        if (u.id == localStorageGetter("connectedUser").id) {
                            u.password = this.state.copyUser.password;
                            console.log(u);
                            localStorageSetter("users", users);
                            localStorageSetter("connectedUser", u);
                        }
                    })
                } else {
                    //Modifier local storage pour le user (à partir de la valeur copyUser) puis reload user dans state avec celui modifier dans localStorage
                }

        });

    }

    render() {
        return (
            <div className="container">
                <header><img alt="img"src={icoSettings} className="ico" /><span>MY ACCOUNT</span></header>
                <section className="section-action" id="min-width">
                    <div className='section-header' onClick={this.display}><img alt="img" src={icoModify} className="ico" /><span >Edit my account</span></div>
                    {this.state.boolEdit && <div className='settings-container'>
                        <li><img alt="img"src={username} className="ico" /><span>Last Name</span><input name='last_name' type="text" defaultValue={localStorageGetter("connectedUser").last_name} onChange={e => this.updateInputValue(e)} /><img alt="img"src={icoEdit} onClick={this.saveChanges.bind(this, 'last_name')} className="ico-edit" /></li>
                        <li><img alt="img"src={username} className="ico" /><span>First Name</span><input name='first_name' type="text" defaultValue={localStorageGetter("connectedUser").first_name} onChange={e => this.updateInputValue(e)} /><img alt="img"src={icoEdit} onClick={this.saveChanges.bind(this, 'first_name')} className="ico-edit" /></li>
                        <li><img alt="img"src={name} className="ico" /><span>Email</span><input name='email' type="text" defaultValue={localStorageGetter("connectedUser").email} onChange={e => this.updateInputValue(e)} /><img alt="img"src={icoEdit} onClick={this.saveChanges.bind(this, 'email')} className="ico-edit" /></li>
                        <li><img alt="img"src={psw} className="ico" /><span>Password</span><input name='password' type="password" defaultValue={localStorageGetter("connectedUser").password} onChange={e => this.updateInputValue(e)} /><img alt="img"src={icoEdit} onClick={this.saveChanges.bind(this, 'password')} className="ico-edit" /></li>
                        {localStorageGetter("connectedUser").is_admin && <li><img alt="img"src={admin} className="ico" /><span>Admin rights</span><input name='is_admin' type="text" value="Yes" /></li>}
                        {!localStorageGetter("connectedUser").is_admin && <li><img alt="img"src={admin} className="ico" /><span>Admin rights</span><input name='is_admin' type="text" value="No" /></li>}
                    </div>}
                </section>
                <section className="section-action" onClick={this.deleteAccount} id="delete-account">
                    <div className='section-header'><img src={icoDelete} alt="img" className="ico" /><span>Delete my account</span></div>
                </section>
            </div>
        );
    }
}

export default SettingsMenu;