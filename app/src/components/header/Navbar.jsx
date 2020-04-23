import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/authAction';
import { history } from './../../store/history';
import './navbar.css';
class Navbar extends Component {

    userLogout = () => {
        this.props.logout();
        history.push('/signin');
    }

    render() {
        const { isAuthenticated, data } = this.props.auth;
        const authLink = (
            <Fragment>
                <li><Link to='/signin'>Sign In</Link></li>
                <li><Link to='/signup'>Sign Up</Link></li>
            </Fragment>
        );

        const guestLink = (
            <Fragment>
                <li><Link to='/logout' onMouseDown={this.userLogout}>Log Out</Link></li>
            </Fragment>
        );

        return (
            <div className='nav-bar-container'>
                <div className='nav-bar'>
                    <div className='nav-bar-in'>
                        <div className='nav-bar-left'>
                            <h1>TASK MANAGER</h1>
                        </div>
                        <div className='nav-bar-right'>
                            <ul>
                                {isAuthenticated ? guestLink : authLink}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: state.auth.data,
        auth: state.auth
    }
}

export default connect(mapStateToProps, { logout })(Navbar);
