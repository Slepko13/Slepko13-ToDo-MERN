import React, { Component } from 'react'
import axios from 'axios';

export default class EditTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        }

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get(`http://localhost:4000/todos/${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    todo_description: res.data.todo_description,
                    todo_responsible: res.data.todo_responsible,
                    todo_priority: res.data.todo_priority,
                    todo_completed: res.data.todo_completed
                })
            })
            .catch(error => console.log(error));

    }

    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }
    onChangeTodoResponsible(e) {
        this.setState({
            todo_responsible: e.target.value
        });
    }
    onChangeTodoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        });
    }
    onChangeTodoCompleted(e) {
        this.setState({
            todo_completed: !this.state.todo_completed
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const newTodo = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed,
        }
        axios.post(`http://localhost:4000/todos/update/${this.props.match.params.id}`, newTodo)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3>Update Todo</h3>
                <form action="" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="">Description:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.todo_description}
                            onChange={this.onChangeTodoDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Responsible:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.todo_responsible}
                            onChange={this.onChangeTodoResponsible}
                        />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input
                                type="radio"
                                className="form-check-input"
                                name="priorityOptions"
                                id="priorityLow"
                                value="Low"
                                checked={this.state.todo_priority === "Low"}
                                onChange={this.onChangeTodoPriority}
                            />
                            <label htmlFor="" className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                type="radio"
                                className="form-check-input"
                                name="priorityOptions"
                                id="priorityMedium"
                                value="Medium"
                                checked={this.state.todo_priority === "Medium"}
                                onChange={this.onChangeTodoPriority}
                            />
                            <label htmlFor="" className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                type="radio"
                                className="form-check-input"
                                name="priorityOptions"
                                id="priorityHigh"
                                value="High"
                                checked={this.state.todo_priority === "High"}
                                onChange={this.onChangeTodoPriority}
                            />
                            <label htmlFor="" className="form-check-label">High</label>
                        </div>
                        <div class="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="completedCheckbox"
                                name="completedCheckbox"
                                onChange={this.onChangeTodoCompleted}
                                checked={this.state.todo_completed}
                                value={this.state.todo_completed}
                            />
                            <label htmlFor="completedCheckbox" className="form-check-label">Completed</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            className="btn btn-primary"
                            type="submit"
                            value="Update Todo"
                        />
                    </div>
                </form>
            </div>
        )
    }
}
