import React, { Component } from 'react';
import '../../assets/css/common.css';
import Login from '../login/Login';
import Navbar from '../header/Navbar';
import Dashboard from '../dashboard/Dashboard';
import TaskDetail from '../taskdetail/TaskDetail';

class Main extends Component {

    render() {
        return (
            <div className='container-max-width'>
                <Navbar />
                {/* <Login /> */}
                {/* <Dashboard></Dashboard> */}
                <TaskDetail />
            </div >
        );
    };
}

export default Main;
