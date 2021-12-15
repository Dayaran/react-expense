import React, { Component } from 'react';
import './Materials.css';
import fire from '../../config/Fire';
import Transaction from './Transaction/Supplier';
class Material extends Component {

    state = {
        material: [],
        dated: '',
        SupplierName: '',
        MeasureUnit: '',
        mateType : '',
        qty: '',
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
        const {dated, SupplierName, MeasureUnit, mateType, qty, currentUID} = this.state;

        // validation
        if(dated && SupplierName && MeasureUnit && mateType && qty){

            const BackUpState = this.state.material;
            BackUpState.push({
                id: BackUpState.length + 1,
                date: dated,
                name: SupplierName,
                type: MeasureUnit,
                method: mateType,
                qty: qty,
                user_id: currentUID
            });
            
            fire.database().ref('Materials/' + currentUID).push({
                id: BackUpState.length,
                date: dated,
                name: SupplierName,
                type: MeasureUnit,
                method: mateType,
                qty: qty,
                user_id: currentUID
            }).then((data) => {
                //success callback
                console.log('success callback');
                this.setState({
                    material: BackUpState,
                    dated: '',
                    SupplierName: '',
                    MeasureUnit: '',
                    mateType: '',
                    qty: ''
                })
            }).catch((error)=>{
                //error callback
                console.log('error ' , error)
            });

        }
    }

    componentWillMount(){
        const {currentUID} = this.state;
        const BackUpState = this.state.material;
        fire.database().ref('Materials/' + currentUID).once('value',
        (snapshot) => {
            // console.log(snapshot);
            snapshot.forEach((childSnapshot) => {

                BackUpState.push({
                    id: childSnapshot.val().id,
                    date: childSnapshot.val().date,
                    name: childSnapshot.val().name,
                    type: childSnapshot.val().type,
                    method: childSnapshot.val().method,
                    qty: childSnapshot.val().qty,
                    user_id: childSnapshot.val().user_id
                });
                // console.log(childSnapshot.val().name);
            });
            this.setState({
                material: BackUpState
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
                <div className="totalMoney">Quantity Defined</div>

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
                                onChange={this.handleChange('SupplierName')}
                                value={this.state.SupplierName}
                                placeholder="Enter Supplier Name"
                                type="text"
                                name="SupplierName"
                            />
                            <div className="inputGroup">
                                <select name="method"
                                    onChange={this.handleChange('mateType')}
                                    value={this.state.mateType}>
                                    <option value="0">Select</option>
                                    <option value="Cement">Cement</option>
                                    <option value="SBlocks">SolidBlocks</option>
                                    <option value="MSand">MSand</option>
                                    <option value="Jelly20M">Jelly20MM</option>
                                    <option value="Jelly40M">Jelly40MM</option>
                                    <option value="Steel">Steel</option>
                                    <option value="BindWire">BindingWire</option>
                                    <option value="Dindu">DinduStone</option>
                                    <option value="Waste">Waste</option>
                                </select>
                                
                            </div>
                            <div className="inputGroup">
                                <select name="type"
                                    onChange={this.handleChange('MeasureUnit')}
                                    value={this.state.MeasureUnit}>
                                    <option value="0">Measure</option>
                                    <option value="Bags">Bags</option>
                                    <option value="number">Numbers</option>
                                    <option value="Kgs">Kgs</option>
                                    <option value="TLoad">TractorLoad</option>
                                    <option value="6Whlr">6Wheeler</option>
                                    <option value="8Whlr">8Wheeler</option>
                                    <option value="10Whlr">10Wheeler</option>
                                    <option value="12Whlr">12Wheeler</option>
                                </select>
                                <input
                                    onChange={this.handleChange('qty')}
                                    value={this.state.qty}
                                    placeholder="Quantity"
                                    type="text"
                                    name="qty"
                                />
                            </div>
                            
                        </form>
                        <button onClick={() => this.addNewTransaction()} className="addTransaction">+ Add Transaction</button>
                    </div>
                </div>


                <div className="latestTransactions">
                    <p>Materials Supplied Inventory</p>
                    <ul>
                        {
                            Object.keys(this.state.material).map((id) => (
                                <Transaction key={id}
                                    date={this.state.material[id].date}
                                    type={this.state.material[id].type}
                                    method={this.state.material[id].method}
                                    name={this.state.material[id].name}
                                    qty={this.state.material[id].qty}
                                />
                            ))
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default Material;