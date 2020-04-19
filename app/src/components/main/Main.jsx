import React, { Component } from 'react';
import '../../assets/css/common.css';
import Login from '../login/Login';
import Navbar from '../header/Navbar';

class Main extends Component {

    render() {
        return (
            <div className='container-max-width'>
                <Navbar />
                <Login />
            </div >
        );
    };
}

export default Main;
