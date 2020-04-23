import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import { createNewTask, updateDescription } from '../../actions/taskAction';
import PropTypes from 'prop-types';
import { getEmptyTask } from '../../helpers/helperTask';
import { Link } from 'react-router-dom';
import { history } from './../../store/history';
import './taskdetail.css';
require('react-datepicker/dist/react-datepicker.css');

class TaskDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.task.id,
            description: this.props.task.description,
            task_group: this.props.task.task_group || 'To Do',
            due_date: new Date(this.props.task.due_date),
        }
    }

    componentWillMount = () => {
        if (!this.props.isAuthenticated) {
            history.push('/signin');
        }
    }


    createNewTask = () => {
        this.props.createNewTask(this.state);
    }

    updateTask = () => {
        this.props.updateDescription(this.state);
        history.push('/dashboard');
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {

        return (
            <div className='task-detail'>
                <div className='title'>
                    <h2>Please Insert Task Details</h2>
                </div>

                <div className='task-card'>
                    <div className='task-input'>
                        <input placeholder='Please update/add task information' onChange={this.onChangeHandler} name='description' value={this.state.description} />
                    </div>
                    <div className='task-group-input'>
                        <select value={this.state.task_group} onChange={this.onChangeHandler} name='task_group'>
                            <option value="To Do">To Do</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                    <div className='task-due-date-input'>
                        <DatePicker selected={this.state.due_date} onChange={this.onChangeHandler} name='due_date' />
                    </div>
                    <div>
                        <Link to={'/dashboard'}>
                            <button className='btn-done' onClick={this.props.id == 0 ? this.createNewTask : this.updateTask}>${this.props.id == 0 ? 'Create' : 'Update'}</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

TaskDetail.propTypes = {
    createNewTask: PropTypes.func.isRequired,
    task: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id;
    const { tasks } = state.task;
    let isAuthenticated = state.auth.isAuthenticated;
    let task = getEmptyTask();
    if (id != 0) {
        task = tasks.find(task => task.id == id);
    } else {
        task = getEmptyTask();
    }

    return {
        id,
        task,
        state,
        task_group: state.task_group,
        isAuthenticated
    }
};

export default connect(mapStateToProps, { createNewTask, updateDescription })(TaskDetail);
