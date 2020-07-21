import React, { Component } from 'react';
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "../ContactData/ContactData";
import { connect } from 'react-redux';


class Checkout extends Component {
    state = {
        ingredients: [],
        price: 0
    }

    componentDidMount() {
        //No more needed. Params can be utilized by using redux state managment
        /*let outArr = [];
        let price = 0;
        const params = this.getParams(window.location.href);
        Object.keys(params).forEach((key) => {
            if (key === 'price') {
                price = params[key];
            }
            const val = params[key];
            outArr.push({
                label: key,
                value: val
            });
        });
        this.setState({
            ingredients: outArr,
            price: price
        });*/
    }

    getParams = (url) => {
        var params = {};
        var parser = document.createElement('a');
        parser.href = url;
        var query = parser.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            params[pair[0]] = decodeURIComponent(pair[1]);
        }
        return params;
    };
    purchaseCancelled = () => {
        this.props.history.goBack();
    }
    purchaseBurgerConfirmation = () => {
        this.props.history.replace("/checkout/contact-details");
    }
    render() {
        let cSummary = <Redirect to="/" />;
        console.log(this.props.ings)
        if (this.props.ings.length > 0) {
            cSummary = <div>
                <CheckoutSummary purchaseCancelled={this.purchaseCancelled}
                    purchaseBurgerConfirmation={this.purchaseBurgerConfirmation}
                    ingredients={this.props.ings}
                    price={this.props.finalPrice}></CheckoutSummary>
                <Route path={this.props.match.path + '/contact-details'}
                    component={ContactData}></Route>
            </div>
        }
        return (
            <React.Fragment>
                {cSummary}
                {/*<Route path={this.props.match.path + '/contact-details'}
                    render={() => (<ContactData ingredients={this.state.ingredients} price={this.state.price} />)}></Route>*/}
                {/**  Using redux state managment */}

            </React.Fragment>
        )
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
        finalPrice: state.burgerBuilder.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);