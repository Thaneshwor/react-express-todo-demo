import React, { Component } from 'react';
import './navbar.css';
class Navbar extends Component {

    render() {
        return (
            <div className='nav-bar-container'>
                <div className='nav-bar'>
                    <div className='nav-bar-in'>
                        <div className='nav-bar-left'>
                            <h1>TASK MANAGER</h1>
                        </div>
                        <div className='nav-bar-right'>
                            <ul>
                                <li>Sign In</li>
                                <li>Sign Up</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar;