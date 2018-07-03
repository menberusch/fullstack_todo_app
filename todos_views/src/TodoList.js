import React, { Component } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import './TodoList.css'

const API_URL = '/api/todos/';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    }
    
    this.addTodo = this.addTodo.bind(this);
  }

  componentDidMount() {
    this.fetchAPI(API_URL)
    .then(todos => this.setState({todos}));
  }

  fetchAPI(api_url, obj) {
    return fetch(api_url, obj)
    .then(resp => {
      if(!resp.ok) {
        if(resp.status >= 400 && resp.status < 500) {
          return resp.json().then(data => {
            let err = {errorMessage: data.message};
            throw err;
          });
        } else {
          let err = {errorMessage: "Please try again later, server is not responding."};
          throw err;
        }
      }
      return resp.json();
    });
  }

  addTodo(val) {
    this.fetchAPI(API_URL, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({name: val})
    })
    .then(newTodo => {
      this.setState({todos: [...this.state.todos, newTodo]})
    });
  }

  deleteTodo(id) {
    const deleteURL = API_URL + id;
    this.fetchAPI(deleteURL, {method: 'DELETE'})
    .then(() => {
      const todos = this.state.todos.filter(todo => todo._id !== id);
      this.setState({todos});
    });
  }

  render() {
    const todos = this.state.todos.map((todo, i) => (
      <TodoItem
        key={todo._id} 
        {...todo}
        deleteTodo={this.deleteTodo.bind(this, todo._id)}
      />
    ));
    return (
      <div>
        <h1>Todo List!</h1>
        <TodoForm addTodo={this.addTodo}/>
        <ul>
          {todos}
        </ul>
      </div>
    )
  }
}

export default TodoList;