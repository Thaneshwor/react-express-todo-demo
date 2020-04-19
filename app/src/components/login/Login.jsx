import React, { Component } from 'react';
import './login.css';

class Login extends Component {

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('handling event')
    }
    render() {
        return (
            <div className='form-container-out'>
                <div className='form-container-in'>
                    <form onSubmit={this.handleSubmit}>
                        <label>Username</label>
                        <input type='text' placeholder='Username' name='username' />
                        <label>Password</label>
                        <input type='password' placeholder='Password' name='password' />
                        <button type='submit' className='btn-submit'>Login</button>
                    </form>
                </div >
            </div>
        )
    }
}

export default Login;
