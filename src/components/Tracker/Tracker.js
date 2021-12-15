import React, { Component } from 'react';
import './Tracker.css';
import fire from '../../config/Fire';
import Transaction from './Transaction/Transaction';
class Tracker extends Component {

    state = {
        transactions: [],
        money: 0,
        dated: '',
        transactionName: '',
        transactionType: '',
        paymentType : '',
        price: '',
        currentUID: fire.auth().currentUser.uid
    }

    // logout function
    logout = () => {
        fire.auth().signOut();
    }

    handleChange = input => e => {
        this.setState({
            [input]: e.target.value !=="0" ? e.target.value : ""
        });
    }

    
    addNewTransaction = () => {
        const {dated, transactionName, transactionType, paymentType, price, currentUID, money} = this.state;

        // validation
        if(dated && transactionName && transactionType && paymentType && price){

            const BackUpState = this.state.transactions;
            BackUpState.push({
                id: BackUpState.length + 1,
                date: dated,
                name: transactionName,
                type: transactionType,
                method: paymentType,
                price: price,
                user_id: currentUID
            });
            
            fire.database().ref('Transactions/' + currentUID).push({
                id: BackUpState.length,
                date: dated,
                name: transactionName,
                type: transactionType,
                method: paymentType,
                price: price,
                user_id: currentUID
            }).then((data) => {
                //success callback
                console.log('success callback');
                this.setState({
                    transactions: BackUpState,
                    money: transactionType === 'deposit' ? money + parseFloat(price) : money - parseFloat(price),
                    dated: '',
                    transactionName: '',
                    transactionType: '',
                    paymentType: '',
                    price: ''
                })
            }).catch((error)=>{
                //error callback
                console.log('error ' , error)
            });

        }
    }

    componentWillMount(){
        const {currentUID, money} = this.state;
        let totalMoney = money;
        const BackUpState = this.state.transactions;
        fire.database().ref('Transactions/' + currentUID).once('value',
        (snapshot) => {
            // console.log(snapshot);
            snapshot.forEach((childSnapshot) => {

                totalMoney = 
                    childSnapshot.val().type === 'deposit' ? 
                    parseFloat(childSnapshot.val().price) + totalMoney
                    : totalMoney - parseFloat(childSnapshot.val().price);
                
                BackUpState.push({
                    id: childSnapshot.val().id,
                    date: childSnapshot.val().date,
                    name: childSnapshot.val().name,
                    type: childSnapshot.val().type,
                    method: childSnapshot.val().method,
                    price: childSnapshot.val().price,
                    user_id: childSnapshot.val().user_id
                });
                // console.log(childSnapshot.val().name);
            });
            this.setState({
                transactions: BackUpState,
                money: totalMoney
            });
        });
    }

    render(){
        var currentUser = fire.auth().currentUser;
        return(
            <div className="trackerBlock">
                <div className="welcome">
                    <span>Hi, {currentUser.displayName}!</span>
                    <button className="exit" onClick={this.logout}>Logout</button>
                </div>
                <div className="totalMoney">Rs.{this.state.money}</div>

                <div className="newTransactionBlock">
                    <div className="newTransaction">
                        <form>
                        <input
                                onChange={this.handleChange('dated')}
                                value={this.state.dated}
                                placeholder="Date"
                                type="date"
                                name="dated"
                            />
                            <input
                                onChange={this.handleChange('transactionName')}
                                value={this.state.transactionName}
                                placeholder="Transaction Name"
                                type="text"
                                name="transactionName"
                            />
                            <div className="inputGroup">
                                <select name="type"
                                    onChange={this.handleChange('transactionType')}
                                    value={this.state.transactionType}>
                                    <option value="0">Type</option>
                                    <option value="expense">Expense</option>
                                    <option value="deposit">Deposit</option>
                                </select>
                                <input
                                    onChange={this.handleChange('price')}
                                    value={this.state.price}
                                    placeholder="Price"
                                    type="text"
                                    name="price"
                                />
                            </div>
                            <div className="inputGroup">
                                <select name="method"
                                    onChange={this.handleChange('paymentType')}
                                    value={this.state.paymentType}>
                                    <option value="0">Method</option>
                                    <option value="GPpay">GPay</option>
                                    <option value="PhonePe">PhonePe</option>
                                    <option value="PayTM">PayTM</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Online">Online</option>
                                </select>
                                
                            </div>
                        </form>
                        <button onClick={() => this.addNewTransaction()} className="addTransaction">+ Add Transaction</button>
                    </div>
                </div>


                <div className="latestTransactions">
                    <p>All Finance Transactions</p>
                    <ul>
                        {
                            Object.keys(this.state.transactions).map((id) => (
                                <Transaction key={id}
                                    date={this.state.transactions[id].date}
                                    type={this.state.transactions[id].type}
                                    method={this.state.transactions[id].method}
                                    name={this.state.transactions[id].name}
                                    price={this.state.transactions[id].price}
                                />
                            ))
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default Tracker;