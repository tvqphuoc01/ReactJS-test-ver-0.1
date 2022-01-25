import React, { Component } from "react"; 
import ClassNames from "classnames";
import './todoList.css';

class ToDoList extends Component {
    render() {
        var imgClass = ClassNames({
            toggle: true,
            'toggle-checked': this.props.todo.isCompleted
        });
        var textClass = ClassNames({
            'text-checked': this.props.todo.isCompleted
        })
        return (
            <li>
                <div>
                    <img className={imgClass} alt='' onClick={this.props.onClick}/>
                    <label className={textClass}>{this.props.todo.todo}</label>
                    <button className="destroy" onClick={this.props.onClickDestroy}></button>
                </div>
            </li>
        )
    }
}

export default ToDoList