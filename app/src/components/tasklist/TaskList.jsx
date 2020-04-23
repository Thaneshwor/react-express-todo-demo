import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTasks, deleteTask, createNewTask } from '../../actions/taskAction';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { history } from './../../store/history';
import './tasklist.css';

class TaskList extends Component {

    componentWillMount() {
        this.props.getTasks();
    }

    onDeleteClick = (id) => {
        this.props.deleteTask(id);
    }

    createNewTask = () => {
        this.props.createNewTask();
    }

    componentDidUpdate = (prevState, prevProps) => {
        history.push('/dashboard');
    }

    render() {
        const { tasks } = this.props.task;
        const filteredTask = tasks.filter((task) => {
            if (task.task_group === this.props.taskState) {
                return task
            }
        })

        return (
            <div className='task-desc'>
                <div className='task-desc-title'>
                    <h2>{this.props.taskState}</h2>
                </div>
                <div className='task-desc-body'>
                    <ul>
                        {filteredTask.map((task) => (
                            <li key={task.id}><button className='btn-delete' onClick={() => this.onDeleteClick(task.id)}>Delete</button> <Link to={'/task/' + task.id}>{task.description}</Link></li>
                        ))}
                    </ul>
                </div>
                <div className='task-desc-footer'>
                    <Link to={'/task/0'}><button className='btn-add-task'>Add New Task</button> </Link>
                </div>
            </div>
        );
    }
}

TaskList.propTypes = {
    getTasks: PropTypes.func.isRequired,
    task: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    task: state.task,
    taskState: state.task.task_status,
});

export default connect(mapStateToProps, { getTasks, deleteTask, createNewTask })(TaskList);
