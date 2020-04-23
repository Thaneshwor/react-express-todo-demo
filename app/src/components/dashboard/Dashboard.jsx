import React, { Component } from 'react';
import TaskList from '../tasklist/TaskList';
import { updateTaskGroup } from '../../actions/taskAction';
import './dashboard.css';
import { connect } from 'react-redux';
class Dashboard extends Component {

    changeStatue = (e) => {
        this.props.updateTaskGroup(e.target.value);
    }

    render() {
        return (
            <div className='dash-board'>
                <div className='task-body'>
                    <div className='task-left'>
                        <div className='task-aside'>
                            <ul>
                                <li><span className='square' /><button onClick={this.changeStatue} value='To Do'>To Do</button></li>
                                <li><span className='square' /><button onClick={this.changeStatue} value='Doing'>Doing</button></li>
                                <li><span className='square' /><button onClick={this.changeStatue} value='Done'>Done</button></li>
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

const mapStateToProps = (state) => {

    let task_status = state.task_status;
    return {
        task_status
    }
};

export default connect(mapStateToProps, { updateTaskGroup })(Dashboard);
