import React, { Component } from 'react';

import '../style/usermanagermenu.css';

import icoManagerUser from '../img/ico_manager_users.png';
import icoUsers from '../img/ico_users.png';
import icoUsername from "../img/username.png";
import icoEmail from "../img/name.png";
import icoTrashOption from '../img/ico_trash.png';
import icoOperation from '../img/ico_operation.png';

import { LocalStorageGetter, LocalStorageSetter } from '../Shortcut';

class UserManagerMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idUser: '',
            boolUser: false
        }
        this.setUser = this.setUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }
    componentDidMount() {
        LocalStorageGetter("users").map((user) => {
            if (!user.is_admin) {
                this.setState({ boolUser: true });
            }
        });
    }

    deleteUser(event) {
        let allUsers = LocalStorageGetter("users");
        let postDelete = new Array();
        allUsers.map((u) => {
            if (u.id != this.state.idUser) {
                postDelete.push(u);
            }
        });
        LocalStorageSetter("users", postDelete);
        this.setState({ idUser: '' });
    }

    setUser = (e, object) => {
        if (object.id != this.state.idUser) {
            this.setState({ idUser: object.id });
        } else {
            this.setState({ idUser: '' });
        }
    }
    render() {
        return (
            <div className="container">
                <header id="admin-background"><img src={icoManagerUser} className="ico" /><span id="admin-text-color">USER MANAGER</span></header>
                <section>
                    <div className='section-header'><img src={icoUsers} className="ico" /><span >All Users</span></div>
                    {LocalStorageGetter('users').map(function (object, i) {
                        return (
                            <div className="user-choice">
                                {!object.is_admin && object.id != this.state.idUser &&
                                    <div className="element" name={object.id} onClick={((e) => this.setUser(e, object))}>
                                        <div className="item"><img src={icoUsername} className="ico" /> <p className="display-value">{object.last_name.toUpperCase()} {object.first_name}</p></div>
                                        <div className="item"><img src={icoEmail} className="ico" /><p className="display-value"> {object.email}</p></div>
                                    </div>
                                }
                                {!object.is_admin && object.id == this.state.idUser &&
                                    <div className="element" id="admin-selected" name={object.id} onClick={((e) => this.setUser(e, object))}>
                                        <div className="item"><img src={icoUsername} className="ico" /> <p className="display-value">{object.last_name.toUpperCase()} {object.first_name}</p></div>
                                        <div className="item"><img src={icoEmail} className="ico" /><p className="display-value"> {object.email}</p></div>
                                    </div>
                                }
                            </div>
                        );
                    }, this)}
                    {!this.state.boolUser &&
                        <div className="element">
                            <span className="display-none">No user has been registered yet</span>
                        </div>
                    }
                </section>
                {this.state.idUser != '' &&
                    <section>
                        <div className='section-header'><img src={icoOperation} className="ico" /><span >Operation</span></div>
                        <div className="operation"><img src={icoTrashOption} className="ico_non_reverse" onClick={this.deleteUser} id="ico-margin"/><p>Delete the selected user</p></div>
                    </section>}
            </div>
        );
    }
}

export default UserManagerMenu;