import React, { Component } from 'react';

import '../style/walletmenu.css';

import icoWallet from '../img/ico_wallet.png';
import icoCard from '../img/ico_card.png';
import icoCardBrand from '../img/ico_card_brand.png';
import icoCardDate from '../img/ico_card_date.png';
import icoCardL4 from '../img/ico_card_l4.png';
import icoPayIn from '../img/ico_payin.png';
import icoPayOut from '../img/ico_payout.png';
import icoEuro from '../img/ico_euro.png';
import ico1 from '../img/ico_1.png';
import ico2 from '../img/ico_2.png';
import icoCardTrashOption from '../img/ico_trash.png';
import icoCardEditOption from '../img/ico_edit.png';
import icoCardAddOption from '../img/ico_add.png';
import icoCardTickOption from '../img/ico_tick.png';
import icoCardCrossption from '../img/ico_cross.png';


class WalletMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cards: this.props.data['cards'],
            copyCards: '',
            emptyCard: {
                brand: '',
                expired_at: '',
                last_4: ''
            },
            payin: this.props.data['payin'],
            payout: this.props.data['payout'],
            displayC: false,
            displayPI: false,
            displayPO: false,
            selectedCCPI: '',
            selectedCCPO: '',
            valuePayIn: '',
            valuePayOut: '',
            boolEdit: false,
            boolAdd: false,
            idEdit: ''
        }

        this.updateInputPayIn = this.updateInputPayIn.bind(this);
        this.proceedPayIn = this.proceedPayIn.bind(this);
        this.setSelectedCardPayIn = this.setSelectedCardPayIn.bind(this);

        this.updateInputPayOut = this.updateInputPayOut.bind(this);
        this.proceedPayOut = this.proceedPayOut.bind(this);
        this.setSelectedCardPayOut = this.setSelectedCardPayOut.bind(this);

        this.createCard = this.createCard.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this.editCard = this.editCard.bind(this);

        this.updateCardData = this.updateCardData.bind(this);
        this.confirmEdit = this.confirmEdit.bind(this);

        this.confirmCreation = this.confirmCreation.bind(this);
        this.abordCreation = this.abordCreation.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
    }

    confirmCreation(event) {
        console.log("brand : " + this.state.emptyCard.brand);
        console.log("date : " + this.state.emptyCard.expired_at);
        console.log("4 : " + this.state.emptyCard.last_4);

        //Check if input are as asked
        //Save data in LocalStorage incremented id
        //For each data brand, expired_at, last_4 + reload in cards (pour afficher à l'écran après modif)

        this.setState({ boolAdd: !this.state.boolAdd });
        this.state.emptyCard.brand = '';
        this.state.emptyCard.expired_at = '';
        this.state.emptyCard.last_4 = '';
    }

    abordCreation(event) {
        this.setState({ boolAdd: !this.state.boolAdd });
        this.state.emptyCard.brand = '';
        this.state.emptyCard.expired_at = '';
        this.state.emptyCard.last_4 = '';
    }

    confirmEdit(event) {
        alert("save changes for " + event.target.name);
        console.log("brand : " + this.state.copyCards.brand);
        console.log("date : " + this.state.copyCards.expired_at);
        console.log("4 : " + this.state.copyCards.last_4);

        //Check if input are as asked
        //Save data in LocalStorage for id=event.target.name 
        //For each data brand, expired_at, last_4 + reload in cards (pour afficher à l'écran après modif)

        this.setState({ boolEdit: false, idEdit: '', copyCards: '' });

    }

    updateInputValue(event) {
        console.log("updateInputValue")
        console.log(this.state);
        if (event.target.name == 'brand') {
            this.state.emptyCard.brand = event.target.value;
        } else if (event.target.name == 'expired_at') {
            this.state.emptyCard.expired_at = event.target.value;
        } else if (event.target.name == 'last_four') {
            this.state.emptyCard.last_4 = event.target.value;
        }
    }

    updateCardData(event) {
        console.log("updateCardData");
        console.log(this.state);
        if (event.target.name == 'brand') {
            this.state.copyCards.brand = event.target.value;
        } else if (event.target.name == 'expired_at') {
            this.state.copyCards.expired_at = event.target.value;
        } else if (event.target.name == 'last_four') {
            this.state.copyCards.last_4 = event.target.value;
        }
    }

    createCard(event) {
        this.setState({ boolAdd: !this.state.boolAdd });
    }

    deleteCard(event) {
        console.log(event.target.name);
        //delete card with id event.target.name in LocalStorage + reload cards
    }

    editCard(event) {
        this.state.cards.map((card) => {
            if (card.id == event.target.name) {
                this.setState({ copyCards: card });
            }
        });
        this.setState({ boolEdit: !this.state.boolEdit, idEdit: event.target.name })
    }

    proceedPayIn(event) {
        if (this.state.selectedCCPI != '' && this.state.valuePayIn != '') {
            console.log(this.state.valuePayIn);
            console.log(this.state.selectedCCPI);
            //do payIn into wallet corresponding to credit card selected
            //cardCCPI
        } else {
            alert("Please choose a card and/or select an amount")
        }

    }

    proceedPayOut(event) {
        if (this.state.selectedCCPO != '' && this.state.valuePayOut != '') {
            console.log(this.state.valuePayOut);
            console.log(this.state.selectedCCPO);
            //do payOut into wallet corresponding to credit card selected
            //cardCCPO
        } else {
            alert("Please choose a card and/or select an amount")
        }

    }

    updateInputPayIn(event) {
        console.log(Number(event.target.value));
        console.log(Number(0));
        if (isNaN(event.target.value)) {
            alert(event.target.value + " is not a number");
        } else if (Number(event.target.value) < Number(0)) {
            alert(event.target.value + " must be greater than 0");
        } else if (Number(event.target.value) > Number(((this.props.data['wallet'].balance) / 100).toFixed(2))) {
            alert(event.target.value + " must not exceed wallet's balance");
        }
        else {
            this.setState({ valuePayIn: event.target.value });
        }
    }
    updateInputPayOut(event) {
        console.log(event.target.value);
        console.log((this.props.data['wallet'].balance / 100).toFixed(2));
        if (isNaN(event.target.value)) {
            alert(event.target.value + " is not a number");
        } else if (Number(event.target.value) < Number(0)) {
            alert(event.target.value + " must be greater than 0");
        } else if (Number(event.target.value) > Number((this.props.data['wallet'].balance / 100).toFixed(2))) {
            alert(event.target.value + " must not exceed wallet's balance");
        } else {
            this.setState({ valuePayOut: event.target.value });
        }
    }

    setSelectedCardPayIn(event) {
        this.setState({ selectedCCPI: event.target.value });
    }

    setSelectedCardPayOut(event) {
        this.setState({ selectedCCPO: event.target.value });
    }

    display(compName, e) {
        if (compName == 'card') {
            this.setState({ displayC: !this.state.displayC })
        } else if (compName == 'payin') {
            this.setState({ displayPI: !this.state.displayPI })
        } else {
            this.setState({ displayPO: !this.state.displayPO })
        }
    }

    render() {
        return (
            <div className="container">
                <header><img src={icoWallet} className="ico" />MY WALLET</header>
                <section className="section-action">
                    <div className='section-header' onClick={this.display.bind(this, 'card')}><img src={icoCard} className="ico" /><span >My Cards</span></div>
                    {this.state.displayC && this.state.cards.map(function (object, i) {
                        return (
                            <div className='card-description'>
                                {!this.state.boolEdit && <li><img src={icoCardBrand} className="ico" /> <p className="display-value">{object.brand.toUpperCase()}</p></li>}
                                {this.state.boolEdit && this.state.idEdit != object.id && <li><img src={icoCardBrand} className="ico" /> <p className="display-value">{object.brand.toUpperCase()}</p></li>}
                                {this.state.boolEdit && this.state.idEdit == object.id && <li><img src={icoCardBrand} className="ico" /> <input type="text" name="brand" defaultValue={object.brand.toUpperCase()} onChange={this.updateCardData} /></li>}
                                {!this.state.boolEdit && <li><img src={icoCardDate} className="ico" /> <p className="display-value">{object.expired_at.slice(0, 10)}</p></li>}
                                {this.state.boolEdit && this.state.idEdit != object.id && <li><img src={icoCardDate} className="ico" /> <p className="display-value">{object.expired_at.slice(0, 10)}</p></li>}
                                {this.state.boolEdit && this.state.idEdit == object.id && <li><img src={icoCardDate} className="ico" /> <input type="date" name="expired_at" defaultValue={object.expired_at.slice(0, 10)} onChange={this.updateCardData} /></li>}
                                {!this.state.boolEdit && <li><img src={icoCardL4} className="ico" /> <p className="display-value">**** **** **** {object.last_4}</p></li>}
                                {this.state.boolEdit && this.state.idEdit != object.id && <li><img src={icoCardL4} className="ico" /> <p className="display-value">**** **** **** {object.last_4}</p></li>}
                                {this.state.boolEdit && this.state.idEdit == object.id && <li><img src={icoCardL4} className="ico" /> <input type="text" name="last_four" defaultValue={object.last_4} onChange={this.updateCardData} /></li>}
                                {!this.state.boolEdit && <img src={icoCardEditOption} className="ico_non_reverse" name={object.id} onClick={this.editCard} />}
                                {this.state.boolEdit && this.state.idEdit == object.id && <img src={icoCardEditOption} className="ico_non_reverse" name={object.id} onClick={this.confirmEdit} />}
                                {!this.state.boolEdit && <img src={icoCardTrashOption} className="ico_non_reverse" name={object.id} onClick={this.deleteCard} />}
                            </div>
                        );
                    }, this)}
                    {!this.state.boolEdit && !this.state.boolAdd && this.state.displayC && <img src={icoCardAddOption} className="ico_non_reverse" onClick={this.createCard} />}
                    {this.state.boolAdd && <form>
                        <li><img src={icoCardBrand} className="ico" /><span>Brand</span><input type="text" name="brand" onChange={this.updateInputValue} /></li>
                        <li><img src={icoCardDate} className="ico" /><span>Expiration date</span><input type="date" name="expired_at" onChange={this.updateInputValue} /></li>
                        <li><img src={icoCardL4} className="ico" /><span>Last four digit</span><input type="number" name="last_four" onChange={this.updateInputValue} /></li>
                        <img src={icoCardTickOption} className="ico_non_reverse" onClick={this.confirmCreation} />
                        <img src={icoCardCrossption} className="ico_non_reverse" onClick={this.abordCreation} />
                    </form>}
                </section>
                <section className="section-action">
                    <div className='section-header' onClick={this.display.bind(this, 'payin')}><img src={icoPayIn} className="ico" /><span >Pay-In</span></div>
                    {this.state.displayPI && <div className='payin-description'>
                        <img src={ico1} className="ico_number" /> <p>Select a credit card</p>
                        <div className="card-description">
                            {this.state.cards.map(function (object, i) {
                                return (
                                    <div onChange={this.setSelectedCardPayIn.bind(this)}>
                                        {object.brand == 'visa' && <li> <input type="radio" name="card_selected_payin" value={object.id} /><img src={icoCardBrand} className="ico" /> <p className="display-value">VISA **** **** **** {object.last_4}</p></li>}
                                        {object.brand == 'master_card' && <li> <input type="radio" name="card_selected_payin" value={object.id} /><img src={icoCardBrand} className="ico" /> <p className="display-value">MASTER CARD **** **** **** {object.last_4}</p></li>}
                                    </div>
                                );
                            }, this)}
                        </div>
                        <img src={ico2} className="ico_number" /> <p>Select an amout to pay-in</p>
                        <div className="section-element">
                            <img src={icoEuro} className="ico" /><span>Amount</span><input name='amount' type="text" value={this.state.valuePayIn} onChange={this.updateInputPayIn} />
                        </div>
                        <div className="submit" onClick={this.proceedPayIn}>Confirm</div>
                    </div>}
                </section>
                <section className="section-action">
                    <div className='section-header' onClick={this.display.bind(this, 'payout')}><img src={icoPayOut} className="ico" /><span >Pay-Out</span></div>
                    {this.state.displayPO && <div className='payout-description'>
                        <img src={ico1} className="ico_number" /> <p>Select a credit card</p>
                        <div className="card-description">
                            {this.state.cards.map(function (object, i) {
                                return (
                                    <div onChange={this.setSelectedCardPayOut.bind(this)}>
                                        {object.brand == 'visa' && <li> <input type="radio" name="card_selected_payout" value={object.id} /><img src={icoCardBrand} className="ico" /> <p className="display-value">VISA **** **** **** {object.last_4}</p></li>}
                                        {object.brand == 'master_card' && <li> <input type="radio" name="card_selected_payout" value={object.id} /><img src={icoCardBrand} className="ico" /> <p className="display-value">MASTER CARD **** **** **** {object.last_4}</p></li>}
                                    </div>
                                );
                            }, this)}
                        </div>
                        <img src={ico2} className="ico_number" /> <p>Select an amout to pay-out</p>
                        <div className="section-element">
                            <img src={icoEuro} className="ico" /><span>Amount</span><input name='amount' type="text" value={this.state.valuePayOut} onChange={this.updateInputPayOut} />
                        </div>
                        <div className="submit" onClick={this.proceedPayOut}>Confirm</div>
                    </div>}
                </section>

            </div>
        );
    }
}

export default WalletMenu;