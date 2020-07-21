import React, { Component } from 'react';
import { connect } from "react-redux";
import * as authAction from "../../store/actions/index";
import { Redirect } from 'react-router';


class LogoutComponent extends Component {

    componentDidMount() {
        this.props.onLogoutHandler();
    }

    render() {
        return (
            <Redirect to="/auth" />
        );
    }
}


const dispatchToPropsMapping = dispatch => {
    return {
        onLogoutHandler: () => {
            dispatch(authAction.logoutUser());
        },
    }
}

export default connect(null, dispatchToPropsMapping)(LogoutComponent);