import React from 'react';
import { Link } from 'react-router-dom';


const Todo = props => {


    return (
        <tr>
            <td className={props.todo.todo_completed ? 'completed' : null}>
                {props.todo.todo_description}
            </td>
            <td className={props.todo.todo_completed ? 'completed' : null}>
                {props.todo.todo_responsible}
            </td>
            <td className={props.todo.todo_completed ? 'completed' : null}>
                {props.todo.todo_priority}
            </td>

            <td>
                <button className="btn btn-success">
                    <Link style={{ color: "white", textDecoration: "none" }} to={'/edit/' + props.todo._id}>Edit</Link>
                </button>
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => { props.removeTodo(props.todo._id) }}
                >Delete</button>
            </td>
        </tr>
    )
}
export default Todo;
