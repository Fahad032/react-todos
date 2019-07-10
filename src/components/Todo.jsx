import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Todo extends Component
{
	state = {}

	render(){
		const task = this.props.task;
		return (
			<li className="list-group-item">
				<button 
					className={this.getCompleteClassMark(task)}
					onClick={()=> this.props.onToggleComplete(task)}
				>
					<FontAwesomeIcon icon="check" size="xs" />
				</button>
				<span>
					#{task.id} {task.title}
				</span>
				<button 
					className="btn btn-danger btn-sm float-right"
					onClick={() => this.props.onDelete(task)}
				>
					<FontAwesomeIcon icon="trash" size="xs" />
				</button>			
			</li>
		)
	}

	getCompleteClassMark(task){
		let classes = 'btn btn-sm mr-2 btn-';
		classes += task.isComplete ? 'primary' : 'secondary' 
		return classes;
	}


}