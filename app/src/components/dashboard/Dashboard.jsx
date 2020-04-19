import React, { Component } from 'react';
import TaskList from '../tasklist/TaskList';
import './dashboard.css';
class Dashboard extends Component {

    render() {
        return (
            <div className='dash-board'>
                <div className='task-body'>
                    <div className='task-left'>
                        <div className='task-aside'>
                            <ul>
                                <li><a href='#'><span className='square' />To Do</a></li>
                                <li><span className='square' />Doing</li>
                                <li><span className='square' />Done</li>
                            </ul>
                        </div>
                    </div>
                    <div className='task-right'>
                        <TaskList />
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;