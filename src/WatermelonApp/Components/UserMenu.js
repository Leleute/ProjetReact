import React, { Component } from 'react';

import '../style/usermenu.css';

import icoUserManager from '../img/ico_users_manager.png'
import icoUser from '../img/ico_users.png'
import icoUsername from "../img/username.png";
import icoEmail from "../img/name.png"; 
import icoTrashOption from '../img/ico_trash.png';
import icoOperation from '../img/ico_operation.png';

import { LocalStorageGetter, LocalStorageSetter } from '../Shortcut';

class UserMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idUser : ''
        }
        this.setUser = this.setUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    deleteUser(event) {
        //delete User with idUser 
        this.setState({idUser:''});
        alert("deleted");
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
                <header><img src={icoUserManager} className="ico" />USERS MANAGER</header>
                <section>
                    <div className='section-header'><img src={icoUser} className="ico" /><span >All Users</span></div>
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
                                        <div className="selected" id="admin-selected" name={object.id} onClick={((e) => this.setUser(e, object))}>
                                            <div className="item"><img src={icoUsername} className="ico" /> <p className="display-value">{object.last_name.toUpperCase()} {object.first_name}</p></div>
                                            <div className="item"><img src={icoEmail} className="ico" /><p className="display-value"> {object.email}</p></div>
                                        </div>
                                }
                            </div>
                        );
                    }, this)}
                </section>
                {this.state.idUser != '' &&
                    <section>
                        <div className='section-header'><img src={icoOperation} className="ico" /><span >Operation</span></div>
                        <img src={icoTrashOption} className="ico_non_reverse" onClick={this.deleteUser} />
                     </section>}
            </div>
        );
    }
}

export default UserMenu;