import React, { Component } from 'react';
import '../../assets/css/common.css';
import Login from '../login/Login';

class Main extends Component {

    render() {
        return (
            <div className='container-max-width'>
                <Login />
            </div >
        );
    };
}

export default Main;
