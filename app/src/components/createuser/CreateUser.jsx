import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as helpers from '../../helpers/validation';
import { register } from '../../actions/authAction';
import { history } from './../../store/history';
class CreateUser extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            password: ''
        }

        this.showErrorMsg = false
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (helpers.validatePassword(this.state.password) && helpers.isValidEmail(this.state.email) && !helpers.isEmpty(this.state.firstName) && !helpers.isEmpty(this.state.lastName)) {
            this.props.register(this.state);
            history.push('/signin');
        } else {
            this.showErrorMsg = true
        }
    }

    render() {
        return (
            <div className='form-container-out'>
                <div className='form-container-in'>
                    <form onSubmit={this.handleSubmit}>
                        <label>Email</label>
                        <input type='text' placeholder='Email' name='email' onChange={this.onChange} />
                        <label>First Name</label>
                        <input type='text' placeholder='First name' name='firstName' onChange={this.onChange} />
                        <label>Last Name</label>
                        <input type='text' placeholder='Last name' name='lastName' onChange={this.onChange} />
                        <label>Password</label>
                        <input type='password' placeholder='Password' name='password' onChange={this.onChange} />
                        <button type='submit' className='btn-submit'>Create Account</button>
                    </form>
                </div >
                {this.showErrorMsg && <div>Please provide valid inputs</div>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { register })(CreateUser);
