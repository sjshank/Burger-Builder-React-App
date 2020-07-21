import React, { Component } from 'react';
import Auxiliary from '../Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

const ErrorHandler = (WrapperComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        };

        successHandler = (response) => {
            return response;
        };
        errorHandler = (error) => {
            if (error) {
                this.setState({ error: error });
                console.log(error.message);
            }
            return Promise.reject({ ...error });
        };

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(
                request => this.successHandler(request),
                error => this.errorHandler(error)
            );
            this.responseInterceptor = axios.interceptors.response.use(
                response => this.successHandler(response),
                error => this.errorHandler(error)
            );
        };

        componentWillUnmount() {
            if (axios && axios.interceptors && axios.interceptors.reject) {
                axios.interceptors.reject.eject(this.reqInterceptor);
                axios.interceptors.response.eject(this.responseInterceptor);
            }
        }

        render() {
            return (
                <Auxiliary>
                    {this.state.error &&
                        <Modal>
                            {this.state.error.message}
                        </Modal>}
                    <WrapperComponent {...this.props} />
                </Auxiliary>
            )
        }
    }
}

export default ErrorHandler;