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
		newTask: {
			title: '',
			isComplete: false
		},
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
	}

	handleChange(e){
		let task = this.state.newTask;
		task.title = e.target.value;
		this.setState({newTask: task});
	}

	handleCreateTask(){
		const tasks = [...this.state.tasks];
		let newTask = {...this.state.newTask};
		if(!newTask.title.trim().length){
			return;
		}
		// note: sperad operator operates from reverse order
		// it will take on map() results 
		// and make it 1, 2, 3, 4, 5 form [1, 2, 3, 4, 5]
		newTask.id = Math.max(...tasks.map(task => task.id)) + 1;
		tasks.unshift(newTask);		
		this.setState({tasks:tasks});

		// reset new task
		this.setState({newTask: {
			id: undefined,
			title: '',
			isComplete: false
		}})		
	}

	handleDelete(task){
		const tasks = this.state.tasks.filter(item => task.id !== item.id);
		this.setState({tasks: tasks});
	}

	hanldeToggleComplete(task){
		const tasks = [...this.state.tasks];
		let taskToUpdate = tasks.find(item => item.id === task.id);
		
		taskToUpdate.isComplete = !taskToUpdate.isComplete;
		this.setState({ tasks: tasks });
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
							   	<div className="col-5">
							   		<h3>Todos <small>(On Queue)</small></h3>
							   	</div>	
							   	<div className="col-7">
							   		<div className="form-group form-inline">
							   			<input 
							   				type="text" 
							   				name="todo" 
							   				className="form-control input-sm"
							   				value={this.state.newTask.title}
							   				onChange={(e) => this.handleChange(e)} 
							   			/>
								   		<button 
								   			className="btn btn-info float-right"
								   			onClick={()=> this.handleCreateTask()}
								   		>
								   			Create
								   		</button>
								   	</div>	
							   	</div>	
						   </div>
						   <hr />			   		
					   </div>
					   	<div className="col-12">
							<ul className="list-group">
								{
									this.state.tasks.filter( task => !task.isComplete).map((task) => <Todo 
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
									this.state.tasks.filter(task => task.isComplete).map((task) => <Todo 
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
