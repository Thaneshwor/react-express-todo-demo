import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import './taskdetail.css';
require('react-datepicker/dist/react-datepicker.css')


class TaskDetail extends Component {
    render() {
        return (
            <div className='task-detail'>
                <div className='title'>
                    <h2>Please Insert Task Details</h2>
                </div>

                <div className='task-card'>
                    <div className='task-input'>
                        <input placeholder='Please update/add task information' />
                    </div>
                    <div className='task-group-input'>
                        <select>
                            <option value="grapefruit">To Do</option>
                            <option value="grapefruit">Doing</option>
                            <option value="grapefruit">Done</option>
                        </select>
                    </div>
                    <div className='task-due-date-input'>
                        <DatePicker selected={new Date()} />
                    </div>
                    <div>
                        <button className='btn-done'>Done</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default TaskDetail
