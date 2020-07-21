import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import classes from "./BurgerBuilder.css";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import ErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";
import { connect } from "react-redux";
// import * as actionTypes from "../../store/actions";
import * as burgerBuilderActions from "../../store/actions/index";

const INCREDIENTS_PRICE = {
    'salad': 2,
    'meat': 10,
    'cheese': 0.5,
    'bacon': 3.5
}

class BurgerBuilder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            incredients: null,
            totalPrice: 0,
            showOrderSummary: false,
            loading: true
        }
    }

    componentDidMount() {
        //this.loadIngredients();
        this.props.onInitIngredients();
    }

    // loadIngredients = () => {
    //     axios.get("/ingredients.json")
    //         .then(response => {
    //             this.setState({
    //                 incredients: response.data,
    //                 loading: false
    //             });
    //         })
    //         .catch(error => {
    //             this.setState({
    //                 loading: false
    //             });
    //             console.log(error);
    //         });
    // }

    //We dont need below methods as state manages by reducers
    /*addingIncredients = (type) => {
        this.setState((prevState, props) => {
            let oldIncredients = { ...prevState.incredients };
            oldIncredients[type] = oldIncredients[type] + 1;
            let oldTotalPrice = prevState.totalPrice;
            oldTotalPrice = oldTotalPrice + INCREDIENTS_PRICE[type];
            return {
                incredients: oldIncredients,
                totalPrice: oldTotalPrice
            }
        });
    }

    removingIncredients = (type) => {
        this.setState((prevState, props) => {
            if (prevState.incredients[type] === 0) {
                return;
            }
            let oldIncredients = { ...prevState.incredients };
            oldIncredients[type] = oldIncredients[type] - 1;
            let oldTotalPrice = prevState.totalPrice;
            oldTotalPrice = oldTotalPrice - INCREDIENTS_PRICE[type];
            return {
                incredients: oldIncredients,
                totalPrice: oldTotalPrice
            }
        });
    }*/

    orderNowHandler = () => {
        if (this.props.isAuth) {
            this.setState({
                showOrderSummary: !this.state.showOrderSummary
            })
        } else {
            this.props.history.push("/auth");
        }
    }

    purchaseCancelled = () => {
        this.setState({
            showOrderSummary: !this.state.showOrderSummary
        })
    }

    purchaseBurger = () => {
        let queryParams = [];
        //for (const i in this.state.incredients) {
        //using redux based state managment
        for (const i in this.props.ings) {
            queryParams.push(i + "=" + this.props.ings[i]);
        }
        queryParams.push('price' + "=" + this.props.finalPrice);
        //params.push(this.id + "='" + this.value + "'");
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryParams.join('&')
        });
        /*this.setState({
            showOrderSummary: !this.state.showOrderSummary
        });
        const requestParam = {
            ingredients: this.state.incredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Saurabh',
                email: 'abc@example.com',
                address: '521, new shukrawari, Nagpur 440032'
            },
            paymentType: 'COD',
            deliveryType: 'Prime'
        };
        this.setState({
            loading: true
        });
        axios.post("/orders", requestParam)
            .then(response => {
                this.setState({
                    loading: false,
                    totalPrice: 0
                });
                this.loadIngredients();
            })
            .catch(error => {
                this.setState({
                    loading: false
                })
                console.log(error);
            });*/
    }

    render() {

        let orderSummary = null;
        let burger = null;
        if (this.props.showLoading) {
            orderSummary = <Spinner></Spinner>;
            burger = <Modal><Spinner /></Modal>;
        }
        //using redux based state managment
        if (this.props.ings) {
            burger = <React.Fragment>
                {/*using redux based state managment*/}
                <div><Burger incredients={this.props.ings}></Burger></div>
                <div>
                    <ul className={classes.CheckoutSection}>
                        <li>
                            <p>Current Price : <strong>{this.props.finalPrice} INR</strong></p>
                        </li>
                        <li>
                            <button disabled={this.props.isAuth && this.props.finalPrice === 0}
                                className={classes.OrderButton}
                                onClick={this.orderNowHandler}>
                                {this.props.isAuth ? 'ORDER NOW' : 'LOGIN'}
                            </button>
                        </li>
                    </ul>
                    {/*using redux based state managment*/}
                    <BuildControls
                        incredientsAdded={this.props.onIncredientAdded}
                        incredientsRemoved={this.props.onIncredientRemoved}
                    ></BuildControls>
                </div>
            </React.Fragment>;

            if (this.state.showOrderSummary) {
                orderSummary = <OrderSummary incredients={this.props.ings}
                    totalPrice={this.props.finalPrice}
                    purchaseBurger={this.purchaseBurger}
                    purchaseCancelled={this.purchaseCancelled}></OrderSummary>;
            } else if (this.props.showLoading) {
                orderSummary = <Spinner></Spinner>
            }
        }
        const showModal = this.state.showOrderSummary || this.props.showLoading;

        return (
            <Auxiliary>
                {showModal && <Modal>
                    {orderSummary}
                </Modal>}
                {burger}
            </Auxiliary >
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        finalPrice: state.burgerBuilder.totalPrice,
        showLoading: state.burgerBuilder.loading,
        isAuth: state.auth.tokenData != null
    }
}

const dispatchToPropsMapping = dispatch => {
    return {
        onIncredientAdded: (ingName) => {
            dispatch(burgerBuilderActions.addIngredient(ingName))
        },
        onIncredientRemoved: (ingName) => {
            dispatch(burgerBuilderActions.removeIngredient(ingName))
        },
        onInitIngredients: () => {
            dispatch(burgerBuilderActions.initIngredient())
        }
    }
}

export default connect(mapStateToProps, dispatchToPropsMapping)(ErrorHandler(BurgerBuilder, axios));