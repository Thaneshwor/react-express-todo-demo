import React, { Component } from 'react';
import '../createuser/createuser.css'

class CreateUser extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        console.log('handling event')
    }

    render() {
        return (
            <div className='form-container-out'>
                <div className='form-container-in'>
                    <form onSubmit={this.handleSubmit}>
                        <label>Email</label>
                        <input type='text' placeholder='Email' name='username' />
                        <label>First Name</label>
                        <input type='text' placeholder='First name' name='username' />
                        <label>Last Name</label>
                        <input type='text' placeholder='Last name' name='username' />
                        <label>Password</label>
                        <input type='password' placeholder='Password' name='password' />
                        <button type='submit' className='btn-submit'>Create Account</button>
                    </form>
                </div >
            </div>

        )
    }
}

export default CreateUser;
