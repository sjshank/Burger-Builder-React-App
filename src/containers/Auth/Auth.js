import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from "axios";
import Spinner from "../../components/UI/Spinner/Spinner";
import ErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";
import * as authAction from "../../store/actions/index";
import Modal from '../../components/UI/Modal/Modal';
import classes from "./Auth.css";
import { Redirect } from 'react-router';


class AuthComponent extends Component {

    constructor(props) {
        super(props);
        this.emailElement = React.createRef();
        this.passwordElement = React.createRef();
        this.loginHandler = this.loginHandler.bind(this);
        this.signUpHandler = this.signUpHandler.bind(this);
    }

    loginHandler() {
        this.props.onAuthenticateUser(this.emailElement.current.value, this.passwordElement.current.value, true);
    }
    signUpHandler() {
        this.props.onAuthenticateUser(this.emailElement.current.value, this.passwordElement.current.value, false);
    }

    render() {
        let authRedirect = null;
        if (this.props.finalPrice > 0 && this.props.tokenData != null) {
            authRedirect = <Redirect to="/checkout" />;
        } else if (this.props.tokenData != null) {
            authRedirect = <Redirect to="/" />;
        }

        return (
            <>
                {this.props.showLoading &&
                    <Modal><Spinner /></Modal>}
                <div className={classes.formDiv}>
                    {authRedirect}
                    {this.props.error.message &&
                        <p className="text-danger text-center m-2">You have entered invalid Email or Password.</p>}
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email </label>
                        <input type="email" className="form-control pl-2" id="exampleInputEmail1" ref={this.emailElement} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password </label>
                        <input type="password" className="form-control pl-2" id="exampleInputPassword1" ref={this.passwordElement} />
                    </div>
                    <button type="button" onClick={this.loginHandler} className="btn btn-primary">Login</button>
                    <button type="button" onClick={this.signUpHandler} className="btn btn-primary ml-2">Sign Up</button>
                </div>
            </>
        );
    }
}
const mapStateToProps = state => {
    return {
        tokenData: state.auth.tokenData,
        showLoading: state.auth.loading,
        error: state.auth.error,
        finalPrice: state.burgerBuilder.totalPrice,
    }
}

const dispatchToPropsMapping = dispatch => {
    return {
        onAuthenticateUser: (email, password, isLoginAction) => {
            dispatch(authAction.authenticateUser({ email: email, password: password, isLoginAction: isLoginAction }));
        },
    }
}

export default connect(mapStateToProps, dispatchToPropsMapping)(ErrorHandler(AuthComponent, axios));