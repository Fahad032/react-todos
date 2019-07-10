import React, {Component} from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
//import { fab } from '@fortawesome/free-brands-svg-icons'
import { faTrash, faCoffee, faCheck } from '@fortawesome/free-solid-svg-icons'
import Todo from './components/Todo';

import 'bootstrap/dist/css/bootstrap.css';
import './components/Todos.css';
 
library.add(faTrash, faCoffee, faCheck)


class Todos extends Component
{
	state = {
		tasks: [
			{ 
				id: 1,
				title: 'Learn React Basics',
				isComplete: false
			},
			{ 
				id: 2,
				title: 'Create Todo App',
				isComplete: false
			},
			{ 
				id: 3,
				title: 'Debug Todo App',
				isComplete: false
			},
			{ 
				id: 4,
				title: 'Refactor Todo App Code',
				isComplete: false
			},
			{ 
				id: 5,
				title: 'Push To GitHub',
				isComplete: false
			}
		],
		completed: [],
		//incomplete: []
	}

	handleCreateTask(){
		const tasks = [...this.state.tasks];
		//console.log('handleCreateTask called', tasks);
		
		tasks.unshift({
			id: tasks.length + 1,
			title: 'New Task Added',
			isComplete: false
		});
		this.setState({tasks:tasks});		
	}

	handleDelete(task){
		const tasks = this.state.tasks.filter(item => task.id !== item.id);
		this.setState({tasks: tasks});
	}

	hanldeToggleComplete(task){
		const tasks = [...this.state.tasks];
		const completed = [...this.state.completed];
		
		// TODO: find a better way to refactor
		if(!task.isComplete){
			let taskToUpdate = tasks.find(item => item.id === task.id);
				taskToUpdate.isComplete = !taskToUpdate.isComplete; // true

			tasks.splice(tasks.indexOf(taskToUpdate) , 1);
			completed.push(taskToUpdate);

		}else{
			let taskToUpdate = completed.find(item => item.id === task.id);
				taskToUpdate.isComplete = !taskToUpdate.isComplete; // false

			completed.splice(completed.indexOf(taskToUpdate) , 1);
			tasks.push(taskToUpdate);
		}

		this.setState({ tasks: tasks });
		this.setState({ completed: completed });
	}

	handleClearCompleated(){
		var completed = [];
		this.setState({ completed: completed });
	}

	render(){
		return (
			<div className="container">
			   <div className="row">
			   {/* Queued TODOS */}
			   	<div className="col-md-6">
			   	   <div className="row">
					   <div className="col-12">
						   <hr />
						   <div className="row">
							   	<div className="col-8">
							   		<h3>Todos <small>(On Queue)</small></h3>
							   	</div>	
							   	<div className="col-4">
							   		<button 
							   			className="btn btn-info float-right"
							   			onClick={()=> this.handleCreateTask()}
							   		>
							   			Create
							   		</button>
							   	</div>	
						   </div>
						   <hr />			   		
					   </div>
					   	<div className="col-12">
							<ul className="list-group">
								{
									this.state.tasks.map((task) => <Todo 
										key={task.id} 
										task={task} 
										onDelete={
											(task) => this.handleDelete(task)
										} 
										onToggleComplete={
											(task) => this.hanldeToggleComplete(task)
										}
									/>)
								}
							</ul>
					   	</div>
			   	   </div>
			   	</div>

			   	{/* Completed TODOS */} 
			   	
			   	<div className="col-md-6">
			   	   <div className="row">
					   <div className="col-12">
						   <hr />
						   <div className="row">
							   	<div className="col-8">
							   		<h3>Todos <small>(Completed)</small></h3>
							   	</div>	
							   	<div className="col-4">
							   		<button 
							   			className="btn btn-info float-right"
							   			onClick={()=> this.handleClearCompleated()}
							   		>
							   			Clear
							   		</button>
							   	</div>	
						   </div>
						   <hr />			   		
					   </div>
					   	<div className="col-12">
							<ul className="list-group">
								{
									this.state.completed.map((task) => <Todo 
										key={task.id} 
										task={task} 
										onDelete={
											(task) => this.handleDelete(task)
										} 
										onToggleComplete={
											(task) => this.hanldeToggleComplete(task)
										}
									/>)
								}
							</ul>
					   	</div>
			   	   </div>
			   	</div>

			   </div>
			</div>
		);
	}
}

export default Todos;
