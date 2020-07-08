import React, { Component } from 'react';
import axios from 'axios';
import Todo from './todo.component';



export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            responsible_sort: true,
            description_sort: true,
            priority_sort: true
        }
        this.todoList = this.todoList.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.sortResponsible = this.sortResponsible.bind(this);
        this.sortPriority = this.sortPriority.bind(this);

    }
    async componentDidMount() {
        await axios.get('http://localhost:4000/todos')
            .then(res => {
                console.log('Mount');
                this.setState({
                    todos: res.data
                })
            })
            .catch(err => {
                console.log(err);
            });
    };


    async removeTodo(id) {
        await axios.delete(`http://localhost:4000/todos/${id}`);
        axios.get('http://localhost:4000/todos')
            .then(res => {
                console.log('Mount');
                this.setState({
                    todos: res.data
                })
            })
            .catch(err => {
                console.log(err);
            });
    }
    todoList() {
        return this.state.todos.map((item, index) => {
            return <Todo
                todo={item}
                key={index}
                removeTodo={this.removeTodo}
            />
        });
    };
    sortResponsible(sort) {
        console.log(this.state.todos);
        let x, y;
        this.setState({
            todos: [...this.state.todos.sort((a, b) => {
                sort ? x = a.todo_responsible.toLowerCase() : x = b.todo_responsible.toLowerCase();
                sort ? y = b.todo_responsible.toLowerCase() : y = a.todo_responsible.toLowerCase();
                if (x < y) { return -1; }
                if (x > y) { return 1; }
                return 0;
            })],
            responsible_sort: !this.state.responsible_sort
        })
    };
    sortPriority(order) {
        let id;
        id = order ? 1 : -1;
        axios.get(`http://localhost:4000/todos/sort/${id}`)
            .then(res => {
                console.log('Mount');
                this.setState({
                    todos: res.data,
                    priority_sort: !this.state.priority_sort
                })
            })
            .catch(err => {
                console.log(err);
            });

    }

    render() {
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th
                            >Description</th>
                            <th >
                                <button
                                    onClick={() => this.sortResponsible(this.state.responsible_sort)}
                                    className="btn btn-info">
                                    Responsible
                                </button>
                            </th>
                            <th>
                                <button
                                    onClick={() => { this.sortPriority(this.state.priority_sort) }}
                                    className="btn btn-secondary"
                                >
                                    Priority
                                </button>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.todoList()}
                    </tbody>
                </table>
            </div>
        )
    }
}
