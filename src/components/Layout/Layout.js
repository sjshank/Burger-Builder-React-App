import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";
import classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import { connect } from "react-redux";

class Layout extends Component {
    render() {
        return (
            <Auxiliary>
                <Toolbar isAuth={this.props.isAuth}></Toolbar>
                <main className={classes.content}>{this.props.children}</main>
            </Auxiliary>
        )
    }
}
const mapStateToProps = state => {
    return {
        isAuth: state.auth.tokenData !== null
    }
}


export default connect(mapStateToProps)(Layout);