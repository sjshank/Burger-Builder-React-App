import React from 'react';
import classes from './NavigationItem.css';
import { Link, NavLink } from "react-router-dom";

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        {/*<a href={props.link}
        className={props.active ? classes.active : ''}>{props.children}</a>*/}
        <NavLink className="nav-item nav-link font-weight-bold text-white"
            to={props.link}
            exact
            activeClassName="active">{props.children}</NavLink>
    </li>
)

export default navigationItem;
