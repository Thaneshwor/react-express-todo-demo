import React, { Component } from 'react';
import * as mutations from './../../store/mutation';
import './login.css';
import { connect } from 'react-redux';
import { login } from '../../actions/authAction';
import { isValidEmail, validatePassword } from '../../helpers/validation';
import { Redirect } from 'react-router-dom';
import { AUTHENTICATED } from '../../store/mutation';
import { history } from './../../store/history';

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            showErrorMsg: false,
        }
    }

    componentDidUpdate(pervState) {
        const { error, isAuthenticated } = this.props;

        if (isAuthenticated) {
            history.push('/dashboard');
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (validatePassword(this.state.password) && isValidEmail(this.state.email)) {
            this.props.login(this.state);

        } else {
            this.setState({ showErrorMsg: true })
        }
    }

    render() {
        return (
            <div className='form-container-out'>
                <div className='form-container-in'>
                    <form onSubmit={this.handleSubmit}>
                        <label>Email</label>
                        <input type='email' placeholder='Email' name='email' onChange={this.onChange} />
                        <label>Password</label>
                        <input type='password' placeholder='Password' name='password' onChange={this.onChange} />
                        <button type='submit' className='btn-submit'>Login</button>
                    </form>
                    {this.state.showErrorMsg && <div> Login Error </div>}
                </div >
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { login })(Login);
