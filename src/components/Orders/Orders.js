import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from "../../axios-order";
import ErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";
import classes from './Orders.css';
import { connect } from 'react-redux';
import * as orderBurgerAction from "../../store/actions/index";


class Orders extends Component {
    state = {
        orders: [],
        loading: false
    }
    componentDidMount() {
        // this.setState({ loading: true });

        // axios.get("/orders.json")
        //     .then(response => {
        //         let transfData = [];
        //         const keys = Object.keys(response.data);
        //         for (const key of keys) {
        //             transfData.push({
        //                 id: key,
        //                 ...response.data[key]
        //             });
        //         }
        //         this.setState({ orders: transfData, loading: false });
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         this.setState({ loading: false });
        //     })
        this.props.onLoadOrders(this.props.tokenData);

    }

    render() {
        return (
            <div>
                {this.props.showLoading && <Modal><Spinner></Spinner></Modal>}
                {this.props.orderList.length > 0 && <div className="row">
                    <h4>Thank you for placing order with us !</h4>
                    {this.props.orderList.map((order) => {
                        return <React.Fragment key={order.id}>
                            <div className="col-2"></div>
                            <div className="col-8" >
                                <div className={classes.orderSection}>
                                    <ul>
                                        <li>
                                            Order Id : <strong>{order.id}</strong>
                                        </li>
                                        <li>
                                            Price : <strong>INR {order.price}</strong>
                                        </li>
                                        <li>
                                            Status : <strong>{order.status}</strong>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-2"></div>
                        </React.Fragment>
                    })}
                </div>}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        orderList: state.order.orders,
        showLoading: state.order.loading,
        tokenData: state.auth.tokenData
    }
}

const dispatchToPropsMapping = dispatch => {
    return {
        onLoadOrders: (tokenData) => {
            dispatch(orderBurgerAction.fetchOrders(tokenData));
        }
    }
}

export default connect(mapStateToProps, dispatchToPropsMapping)(ErrorHandler(Orders, axios));