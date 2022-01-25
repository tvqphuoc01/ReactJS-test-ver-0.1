import './App.css';
import './component/todoList.css';
import ToDoList from '../src/component/todoList';
import Header from './component/header';
import { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    if(localStorage.getItem('todoList') === null) {
      this.state = {
        newItem: '',
        todoList: []
      }
    } else {
      this.state = {
        newItem: '',
        todoList: [...JSON.parse(localStorage.getItem('todoList'))]
      }
    }
    
    this.onItemClick = this.onItemClick.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onItemClick(item) {
    return((event) => {
      const itemCurrentState = item.isCompleted;
      const itemIndex = this.state.todoList.indexOf(item);
      this.setState({
        todoList: [
          // insert all elements of todoList from slice ( 0 -> index)
          ...this.state.todoList.slice(0, itemIndex),
          // index element
          {
            ...item,
            isCompleted: !itemCurrentState
          },
          //insert all element from index + 1 to end
          ...this.state.todoList.slice(itemIndex+1),
        ]
      })
      let resetLocalStorage = [...JSON.parse(localStorage.getItem('todoList'))];
      resetLocalStorage[itemIndex].isCompleted = !itemCurrentState;
      localStorage.setItem('todoList', JSON.stringify(resetLocalStorage));
    })
  }

  // onKeyUp check input keyboard
  onKeyUp(event) {
    //event.keyCode -> check key position
    if(event.keyCode === 13) { // KeyCode === 13 -> Enter key
      //event.target -> check current HTML element
      //event.target.value -> check value of current HTML element
      let text = event.target.value;
      if(!text) {
        return;
      }

      text = text.trim();
      if(!text) {
        return;
      }

      let localTodoList;
      if(localStorage.getItem('todoList') === null) {
        localTodoList = [];
      } else {
        localTodoList = [...JSON.parse(localStorage.getItem('todoList'))];
      }
      localTodoList.push({todo: text, isCompleted: false});
      localStorage.setItem('todoList', JSON.stringify(localTodoList));

      this.setState({
        newItem: '',
        todoList: [
          {
            todo: text,
            isCompleted: false,
          },
          ...this.state.todoList
        ]
      });
    }
  }

  // onChange function check input change
  onChange(event) {
    let text = event.target.value;
    this.setState({
      newItem: text,
    })
  }
  
  onClickDestroy(item) {
    return((event) => {
      const itemIndex = this.state.todoList.indexOf(item);
      this.setState({
        todoList: [
          // insert all elements of todoList from slice ( 0 -> index)
          ...this.state.todoList.slice(0, itemIndex),
          //insert all element from index + 1 to end
          ...this.state.todoList.slice(itemIndex+1),
        ]
      })
      let resetLocalStorage = [...JSON.parse(localStorage.getItem('todoList'))];
      resetLocalStorage.splice(itemIndex, 1);
      localStorage.setItem('todoList', JSON.stringify(resetLocalStorage));
    })
  }

  render() {
    return (
      <div className='todoApp'>
        <div className='todoHeader'>
          <Header onKeyUp={this.onKeyUp} onChange={this.onChange} newItem={this.state.newItem}/>
        </div>
        <div className='main'>
          <ul className='TodoList'>
            {
              this.state.todoList.map((todo) => 
                <ToDoList todo={todo} onClick={this.onItemClick(todo)} onClickDestroy={this.onClickDestroy(todo)}/>
              )
            }
          </ul>
        </div>
          <div className='footer'>
        </div>
      </div>
    );
  }
}

export default App;
