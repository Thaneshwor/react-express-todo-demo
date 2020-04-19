import React, { Component } from 'react';
import './tasklist.css';
class TaskList extends Component {

    render() {
        return (
            <div className='task-desc'>
                <div className='task-desc-title'>
                    <h2>Todo</h2>
                </div>
                <div className='task-desc-body'>
                    <ul>
                        <li><a href='#'>Need to eat</a></li>
                        <li><a href='#'>Need to go market</a></li>
                        <li><a href='#'>Need to wash clothes</a></li>
                    </ul>
                </div>
                <div className='task-desc-footer'>
                    <button>Add New Task</button>
                </div>
            </div>
        );
    }
}

export default TaskList;