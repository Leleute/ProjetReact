import React, { Component } from 'react';

import '../style/usermanagermenu.css';

import icoManagerUser from '../img/ico_manager_users.png';
import icoUsers from '../img/ico_users.png';
import icoUsername from "../img/username.png";
import icoEmail from "../img/name.png";
import icoTrashOption from '../img/ico_trash.png';
import icoOperation from '../img/ico_operation.png';

import { localStorageGetter, localStorageSetter } from '../shortcut';

/*
    UserManager component is managing all the users that are registered in Watermelon application - it's an option menu of the wallet only available for the administrators
    An administrator can delete any user account (but no administrator account)
*/
class UserManagerMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
        }
        this.setUser = this.setUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    deleteUser(event) {
        let allUsers = localStorageGetter("users");
        let postDelete = [];
        allUsers.forEach((u) => {
            if (u.id != this.state.user.id) {
                postDelete.push(u);
            }
        });
        localStorageSetter("users", postDelete);
        this.setState({ user: '' });
    }

    setUser = (e, object) => {
        if (object.id !== this.state.user.id) {
            this.setState({ user: object });
        } else {
            this.setState({ user: '' });
        }
    }
    render() {
        return (
            <div className="container">
                <header id="admin-background"><img alt="img" src={icoManagerUser} className="ico" /><span id="admin-text-color">USER MANAGER</span></header>
                <section>
                    <div className='section-header'><img alt="img" src={icoUsers} className="ico" /><span >Users & Administrators</span></div>
                    {localStorageGetter('users').map(function (object, i) {
                        return (
                            <div className="user-choice">
                                {!object.is_admin && object.id !== this.state.user.id &&
                                    <div className="element" name={object.id} onClick={((e) => this.setUser(e, object))}>
                                        <div className="item"><img alt="img" src={icoUsername} className="ico" /> <p className="display-value">{object.last_name.toUpperCase()} {object.first_name}</p></div>
                                        <div className="item"><img alt="img" src={icoEmail} className="ico" /><p className="display-value"> {object.email}</p></div>
                                    </div>
                                }
                                {!object.is_admin && object.id == this.state.user.id &&
                                    <div className="element" id="element-selected" name={object.id} onClick={((e) => this.setUser(e, object))}>
                                        <div className="item"><img alt="img" src={icoUsername} className="ico" /> <p className="display-value">{object.last_name.toUpperCase()} {object.first_name}</p></div>
                                        <div className="item"><img alt="img" src={icoEmail} className="ico" /><p className="display-value"> {object.email}</p></div>
                                    </div>
                                }
                                {object.is_admin &&
                                    <div className="element" id="admin-selected" name={object.id} onClick={((e) => this.setUser(e, object))}>
                                        <div className="item"><img alt="img" src={icoUsername} className="ico" /> <p className="display-value">{object.last_name.toUpperCase()} {object.first_name}</p></div>
                                        <div className="item"><img alt="img" src={icoEmail} className="ico" /><p className="display-value"> {object.email}</p></div>
                                    </div>
                                }
                            </div>
                        );
                    }, this)}
                </section>
                {this.state.user !== '' && !this.state.user.is_admin &&
                    <section>
                        <div className='section-header'><img alt="img" src={icoOperation} className="ico" /><span >Operation</span></div>
                        <div className="operation"><img alt="img" src={icoTrashOption} className="ico-non-reverse" onClick={this.deleteUser} id="ico-margin" /><p>Delete the selected user</p></div>
                    </section>}
                {this.state.user !== '' && this.state.user.is_admin &&
                    <section>
                        <div className='section-header'><img alt="img" src={icoOperation} className="ico" /><span >Operation</span></div>
                        <div className="operation"><p id="red">Impossible to delete an administrator</p></div>
                    </section>}
            </div>
        );
    }
}

export default UserManagerMenu;