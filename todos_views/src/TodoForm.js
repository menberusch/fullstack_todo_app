import React, { Component } from 'react';

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {inputValue: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addTodo(this.state.inputValue);
    this.setState({inputValue: ''});
  }
  
  render() {
    return(
      <form onSubmit={this.handleSubmit} >
        <input 
          type="text"
          onChange={this.handleChange}
          value={this.state.inputValue}
        />
        <button type="submit">Add Todo</button>
      </form>
    )
  }
}

export default TodoForm;