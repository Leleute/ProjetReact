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
import { LocalStorageGetter, LocalStorageSetter } from '../Shortcut';


class WalletMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            copyCards: '',
            emptyCard: {
                last_4: '',
                brand: '',
                expired_at: '',
            },
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
        this.editCard = this.editCard.bind(this);

        this.updateCardData = this.updateCardData.bind(this);
        this.confirmEdit = this.confirmEdit.bind(this);

        this.confirmCreation = this.confirmCreation.bind(this);
        this.abordCreation = this.abordCreation.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);

        this.editCardsLocalStorage = this.editCardsLocalStorage.bind(this);
        this.deleteCardsLocalStorage = this.deleteCardsLocalStorage.bind(this);
    }

    editCardsLocalStorage(idCard) {
        let connectedCards = LocalStorageGetter("connectedCard");
        connectedCards.map((card) => {
            if (card.id == idCard) {
                card.brand = this.state.copyCards.brand;
                card.expired_at = this.state.copyCards.expired_at;
                card.last_4 = this.state.copyCards.last_4;
                LocalStorageSetter("connectedCard", connectedCards);
            }
        });

        let cards = LocalStorageGetter("cards");
        cards.map((card) => {
            if (card.id == idCard) {
                card.brand = this.state.copyCards.brand;
                card.expired_at = this.state.copyCards.expired_at;
                card.last_4 = this.state.copyCards.last_4;
                LocalStorageSetter("cards", cards);
            }
        });
        console.log("AFTER MODIF");
        console.log(LocalStorageGetter("cards"));
    }

    deleteCardsLocalStorage(event) {
        let connectedCards = LocalStorageGetter("connectedCard");
        if (connectedCards.length > 1) {
            let postDelete = new Array();
            connectedCards.map((card) => {
                if (card.id != event.target.name) {
                    postDelete.push(card);
                }

            });
            LocalStorageSetter("connectedCard", postDelete);

            let allCards = LocalStorageGetter("cards");
            postDelete = new Array();
            allCards.map((card) => {
                if (card.id != event.target.name) {
                    postDelete.push(card);
                }

            });
            LocalStorageSetter("cards", postDelete);
            this.forceUpdate();
        } else {
            alert("You must have at least one credit card registered");
        }
    }

    confirmCreation(event) {
        let cards = LocalStorageGetter("cards");
        let idcard = 0;
        cards.map((card) => {
            if (card.id > idcard) idcard = card.id;
        });
        idcard++;
        let newCard = {
            id: idcard,
            last_4: this.state.emptyCard.last_4,
            brand: this.state.emptyCard.brand,
            expired_at: this.state.emptyCard.expired_at,
            user_id: LocalStorageGetter("connectedUser").id
        }
        let allCards = LocalStorageGetter("cards");
        allCards.push(newCard);
        LocalStorageSetter("cards", allCards);

        let connectedCard = LocalStorageGetter('connectedCard');
        connectedCard.push(newCard);
        LocalStorageSetter('connectedCard', connectedCard);


        console.log(LocalStorageGetter('connectedCard', connectedCard));
        this.forceUpdate();

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
        //Modifier local storage pour le user (à partir de la valeur copyUser) puis reload user dans state avec celui modifier dans localStorage
        this.editCardsLocalStorage(event.target.name);
        this.setState({ boolEdit: false, idEdit: '', copyCards: '', card: LocalStorageGetter('connectedCard') });
    }

    updateInputValue(event) {
        if (event.target.name == 'brand') {
            this.state.emptyCard.brand = event.target.value;
        } else if (event.target.name == 'expired_at') {
            this.state.emptyCard.expired_at = event.target.value;
        } else if (event.target.name == 'last_four') {
            this.state.emptyCard.last_4 = event.target.value;
        }
    }

    updateCardData(event) {
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

    editCard(event) {
        LocalStorageGetter("connectedCard").map((card) => {
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
            let newWallet = LocalStorageGetter("connectedWallet");
            newWallet.balance = parseInt(newWallet.balance) + (parseInt(this.state.valuePayIn)) * 100;
            LocalStorageSetter("connectedWallet", newWallet);
            console.log(newWallet);
            let newWallets = LocalStorageGetter("wallet");
            newWallets.map((w) => {
                if (w.id == newWallet.id) {
                    w.balance = newWallet.balance;
                    LocalStorageSetter("wallet", newWallets);
                    console.log(LocalStorageGetter("wallet"));
                }

            });
            let payins = LocalStorageGetter("payin");
            let idpayin = 0;
            payins.map((payin) => {
                if (payin.id > idpayin) idpayin = payin.id;
            });
            idpayin++;
            let newPayin = {
                id: idpayin,
                wallet_id: LocalStorageGetter("connectedWallet").id,
                amount: parseInt(this.state.valuePayIn)
            }
            let allPayins = LocalStorageGetter("payin");
            allPayins.push(newPayin);
            LocalStorageSetter("payin", allPayins);
            console.log(LocalStorageGetter("payin"));
            //do payIn into wallet corresponding to credit card selected
            //cardCCPI
            var connectedPayin = new Array();
            payins = LocalStorageGetter("payin");
            payins.map((payin) => {
                if (payin.wallet_id == LocalStorageGetter("connectedWallet").id) {
                    connectedPayin.push(payin);
                }
            });
            LocalStorageSetter("connectedPayin", connectedPayin);
            console.log(LocalStorageGetter("connectedPayin"));

            this.setState({ valuePayIn: '', selectedCCPI: '', displayPI: false })
        } else {
            alert("Please choose a card and/or select an amount")
        }

    }

    proceedPayOut(event) {
        console.log(this.state.valuePayOut);
        console.log(this.state.selectedCCPI);
        if (this.state.selectedCCPO != '' && this.state.valuePayOut != '') {
            let newWallet = LocalStorageGetter("connectedWallet");
            newWallet.balance = parseInt(newWallet.balance) - (parseInt(this.state.valuePayOut)) * 100;
            LocalStorageSetter("connectedWallet", newWallet);
            console.log(newWallet);
            let newWallets = LocalStorageGetter("wallet");
            newWallets.map((w) => {
                if (w.id == newWallet.id) {
                    w.balance = newWallet.balance;
                    LocalStorageSetter("wallet", newWallets);
                    console.log(LocalStorageGetter("wallet"));
                }

            });
            let payouts = LocalStorageGetter("payout");
            let idpayout = 0;
            payouts.map((payout) => {
                if (payout.id > idpayout) idpayout = payout.id;
            });
            idpayout++;
            let newPayout = {
                id: idpayout,
                wallet_id: LocalStorageGetter("connectedWallet").id,
                amount: parseInt(this.state.valuePayOut)
            }
            let allPayouts = LocalStorageGetter("payout");
            allPayouts.push(newPayout);
            LocalStorageSetter("payout", allPayouts);
            console.log(LocalStorageGetter("payout"));
            //do payIn into wallet corresponding to credit card selected
            //cardCCPI
            var connectedPayout = new Array();
            payouts = LocalStorageGetter("payout");
            payouts.map((payout) => {
                if (payout.wallet_id == LocalStorageGetter("connectedWallet").id) {
                    connectedPayout.push(payout);
                }
            });
            LocalStorageSetter("connectedPayout", connectedPayout);
            console.log(LocalStorageGetter("connectedPayout"));

            this.setState({ valuePayOut: '', selectedCCPO: '', displayPO: false })
        } else {
            alert("Please choose a card and/or select an amount")
        }


    }

    updateInputPayIn(event) {
        if (isNaN(event.target.value)) {
            alert(event.target.value + " is not a number");
        } else if (Number(event.target.value) < Number(0)) {
            alert(event.target.value + " must be greater than 0");
        } else {
            this.setState({ valuePayIn: event.target.value });
        }
    }
    updateInputPayOut(event) {
        if (isNaN(event.target.value)) {
            alert(event.target.value + " is not a number");
        } else if (Number(event.target.value) < Number(0)) {
            alert(event.target.value + " must be greater than 0");
        } else if (Number(event.target.value) > Number(Math.trunc(LocalStorageGetter("connectedWallet").balance / 100))) {
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
                <section className="section-action" id="min-width">
                    <div className='section-header' onClick={this.display.bind(this, 'card')}><img src={icoCard} className="ico" /><span >My Cards</span></div>
                    {LocalStorageGetter('connectedCard').length != 0 && <div>
                        {this.state.displayC && LocalStorageGetter('connectedCard').map(function (object, i) {
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
                                    {!this.state.boolEdit && <img src={icoCardTrashOption} className="ico_non_reverse" name={object.id} onClick={this.deleteCardsLocalStorage} />}
                                </div>
                            );
                        }, this)}
                    </div>}
                    {!this.state.boolEdit && !this.state.boolAdd && this.state.displayC && <img src={icoCardAddOption} className="ico_non_reverse" onClick={this.createCard} />}
                    {this.state.boolAdd && <form>
                        <li><img src={icoCardBrand} className="ico" /><span>Brand</span><input type="text" name="brand" onChange={this.updateInputValue} /></li>
                        <li><img src={icoCardDate} className="ico" /><span>Expiration date</span><input type="date" name="expired_at" onChange={this.updateInputValue} /></li>
                        <li><img src={icoCardL4} className="ico" /><span>Last four digit</span><input type="number" name="last_four" onChange={this.updateInputValue} /></li>
                        <img src={icoCardTickOption} className="ico_non_reverse" onClick={this.confirmCreation} />
                        <img src={icoCardCrossption} className="ico_non_reverse" onClick={this.abordCreation} />
                    </form>}
                </section>


                <section className="section-action" id="min-width">
                    <div className='section-header' onClick={this.display.bind(this, 'payin')}><img src={icoPayIn} className="ico" /><span >Pay-In</span></div>
                    {LocalStorageGetter('connectedCard').length != 0 && <div>
                        {this.state.displayPI && <div className='payin-description'>
                            <img src={ico1} className="ico_number" /> <p>Select a credit card</p>
                            <div className="card-description">
                                {LocalStorageGetter('connectedCard').map(function (object, i) {
                                    return (
                                        <div onChange={this.setSelectedCardPayIn.bind(this)}>
                                            <li> <input type="radio" name="card_selected_payin" value={object.id} /><img src={icoCardBrand} className="ico" /> <p className="display-value">{object.brand.toUpperCase()} **** **** **** {object.last_4}</p></li>
                                        </div>
                                    );
                                }, this)}
                            </div>
                            <img src={ico2} className="ico_number" /> <p>Select an amount of money</p>
                            <div className="section-element">
                                <img src={icoEuro} className="ico" /><span>Amount</span><input name='amount' type="text" value={this.state.valuePayIn} onChange={this.updateInputPayIn} />
                            </div>
                            <div className="submit" onClick={this.proceedPayIn}>Confirm</div>
                        </div>}
                    </div>}
                    {this.state.displayPI && LocalStorageGetter('connectedCard').length == 0 &&
                        <div className="element">
                            <span className="display-none">You need at least one credit card registered to pay-in</span>
                        </div>}
                </section>


                <section className="section-action" id="min-width">
                    <div className='section-header' onClick={this.display.bind(this, 'payout')}><img src={icoPayOut} className="ico" /><span >Pay-Out</span></div>
                    {LocalStorageGetter('connectedCard').length != 0 && <div>
                        {this.state.displayPO && <div className='payout-description'>
                            <img src={ico1} className="ico_number" /> <p>Select a credit card</p>
                            <div className="card-description">
                                {LocalStorageGetter('connectedCard').map(function (object, i) {
                                    return (
                                        <div onChange={this.setSelectedCardPayOut.bind(this)}>
                                            <li> <input type="radio" name="card_selected_payin" value={object.id} /><img src={icoCardBrand} className="ico" /> <p className="display-value">{object.brand.toUpperCase()} **** **** **** {object.last_4}</p></li>
                                        </div>
                                    );
                                }, this)}
                            </div>
                            <img src={ico2} className="ico_number" /> <p>Select an amount of money</p>
                            <div className="section-element">
                                <img src={icoEuro} className="ico" /><span>Amount</span><input name='amount' type="text" value={this.state.valuePayOut} onChange={this.updateInputPayOut} />
                            </div>
                            <div className="submit" onClick={this.proceedPayOut}>Confirm</div>
                        </div>}
                    </div>}
                    {this.state.displayPO && LocalStorageGetter('connectedCard').length == 0 &&
                        <div className="element">
                            <span className="display-none">You need at least one credit card registered to pay-out</span>
                        </div>}

                </section>

            </div >
        );
    }
}

export default WalletMenu;