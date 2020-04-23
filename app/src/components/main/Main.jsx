import React, { Component } from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import { history } from '../../store/history';
import Login from '../login/Login';
import Navbar from '../header/Navbar';
import Dashboard from '../dashboard/Dashboard';
import TaskDetail from '../taskdetail/TaskDetail';
import CreateUser from '../createuser/CreateUser';
import '../../assets/css/common.css';

class Main extends Component {

    render() {
        return (
            <Router history={history}>
                <div className='container-max-width'>
                    <Navbar />
                    <Route
                        exact
                        path='/signup' component={CreateUser}
                    />
                    <Route
                        exact
                        path='/signin' component={Login}
                    />

                    <Route
                        exact
                        path='/logout' component={Login}
                    />
                    <Route
                        exact
                        path={'/task/:id'}
                        component={TaskDetail}
                    />

                    <Route
                        exact
                        path={'/dashboard'}
                        component={Dashboard}
                    />
                </div >
            </Router>
        );
    };
}

export default Main;
