import React from 'react';

const TodoItem = ({name, completed, deleteTodo}) => (
  <li 
    style={{
      textDecoration: completed ? 'line-through': 'none'
    }}>
    {name}
    <button type="button" onClick={() => deleteTodo()}>
      X
    </button>
  </li> 
)

export default TodoItem;