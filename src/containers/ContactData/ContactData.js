import React, { Component } from 'react';
import { withRouter, Redirect } from "react-router-dom";
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from "../../axios-order";
import ErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";
import { connect } from 'react-redux';
import * as orderBurgerAction from "../../store/actions/index";

class ContactData extends Component {

    nameInputRef = React.createRef();
    addressInputRef = React.createRef();
    mobileInputRef = React.createRef();
    paymentInputRef = React.createRef();
    emailInputRef = React.createRef();

    state = {
        loading: false
    };

    orderHandler = () => {
        this.setState({
            loading: true
        });

        const requestParam = {
            ingredients: this.props.ings,
            price: this.props.finalPrice,
            customer: {
                name: this.nameInputRef.current.value,
                email: this.emailInputRef.current.value,
                address: this.addressInputRef.current.value,
                mobile: this.mobileInputRef.current.value,
            },
            userId: this.props.tokenData.userId,
            paymentType: this.paymentInputRef.current.value,
            status: "In Progress"
        };

        this.props.onOrderBurger(requestParam, this.props.tokenData.tokenId);


        // axios.post("/orders.json", requestParam)
        //     .then(response => {
        //         this.setState({
        //             loading: false,
        //         });
        //         this.props.history.push({
        //             pathname: '/orders'
        //         });
        //     })
        //     .catch(error => {
        //         this.setState({
        //             loading: false
        //         })
        //         console.log(error);
        //     });

    }

    render() {
        let contactSection = <Redirect to="/" />;
        if (this.props.ings.length > 0) {
            if (this.props.purchased === true) {
                contactSection = <Redirect to="/orders" />;
            } else {
                contactSection = <div className="m-4" style={{ display: 'inline-grid' }}>
                    <label>Name :</label>
                    <input className="mb-2" type="text" ref={this.nameInputRef} />
                    <label>Email :</label>
                    <input className="mb-2" type="text" ref={this.emailInputRef} />
                    <label>Mobile Number :</label>
                    <input className="mb-2" type="text" ref={this.mobileInputRef} />
                    <label>Address :</label>
                    <textarea className="mb-2" ref={this.addressInputRef} />
                    <label>Payment Type :</label>
                    <input className="mb-2" type="text" ref={this.paymentInputRef} />
                    <br />
                    <button onClick={this.orderHandler}>Submit & Pay</button>
                    {/* {this.state.loading ? <Modal><Spinner></Spinner></Modal> : null} */}
                    {this.props.loading ? <Modal><Spinner></Spinner></Modal> : null}
                </div>
            }
        }
        return (contactSection)
    }
}

const getIngredientArray = (_ingredientObject) => {
    let outArr = [];
    if (_ingredientObject) {
        Object.keys(_ingredientObject).forEach((key) => {
            const val = _ingredientObject[key];
            outArr.push({
                label: key,
                value: val
            });
        });
    }
    return outArr;
}

const mapStateToProps = state => {
    return {
        ings: getIngredientArray(state.burgerBuilder.ingredients),
        finalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        purchased: state.order.purchased,
        tokenData: state.auth.tokenData
    }
}

const dispatchToPropsMapping = dispatch => {
    return {
        onOrderBurger: (orderData, tokenId) => {
            dispatch(orderBurgerAction.purchaseBurgerAction(orderData, tokenId))
        }
    }
}

export default connect(mapStateToProps, dispatchToPropsMapping)(ErrorHandler(withRouter(ContactData), axios));