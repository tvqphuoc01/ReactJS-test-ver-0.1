import React, {Component} from 'react';
import './header.css';
class header extends Component {
    render() {
        return (
            <div>
                <h1> TODO LIST </h1> 
                <input class="newTodo" type="text" value={this.props.newItem} placeholder='What needs to be done?' onKeyUp={this.props.onKeyUp} onChange={this.props.onChange}/>
            </div>
        )
    }
}

export default header