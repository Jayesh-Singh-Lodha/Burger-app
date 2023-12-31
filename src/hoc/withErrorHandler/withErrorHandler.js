import React, { Component } from "react";
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {

    return class extends Component {

        state = {
            error: null
        };

        componentDidMount() {
            this.reqInterceptor = axios.interceptors.request.use((req) => {
                this.setState({ error: null });
                return req;
            });

            this.respInterceptor = axios.interceptors.response.use(
                (resp) => resp,
                (error) => {
                    this.setState({ error });
                }
            );
        }


        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.respInterceptorInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <>
                    <Modal
                        show={this.state.error}
                        click={this.errorConfirmedHandler}
                    >{this.state.error ? this.state.error.message : null}</Modal>
                    <WrappedComponent {...this.state.props} />
                </>
            );
        }
    }
}

export default withErrorHandler;